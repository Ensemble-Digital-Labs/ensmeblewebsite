# Ensemble Digital Labs — Motion & animation handoff (for Manus / builders)

This document describes how **animation, scroll, and canvas** work in this repo so external tools (e.g. **Manus**) can extend the site without breaking motion, accessibility, or layout.

---

## 1. Stack (relevant to motion)

| Layer | Technology | Role |
|--------|------------|------|
| App | **Vite + React 18** | SPA, React Router |
| Styling | **Tailwind CSS** | Layout, utilities, responsive |
| Timeline / tweens | **GSAP 3** | Loaders, page transitions, section entrances, scrubbed scroll |
| Scroll sync | **GSAP ScrollTrigger** | Scroll-linked animations; must use correct **scroller** |
| Smooth scroll | **Locomotive Scroll v5** (wraps **Lenis**) | Smooth wheel; instance stored on `window` |
| 3D / WebGL | **Three.js** | Hero globe (`HeroGlobePlexus`), post-processing (bloom) |
| Optional | **PixiJS / Theatre.js** | Present elsewhere per `README.md`; not all routes use them |

---

## 2. Scroll architecture (critical)

### Main scroll container

- The scrollable region is **`#main`** (see `src/app/layout.jsx`).
- Locomotive is initialized with:
  - **wrapper:** the `#main` element
  - **content:** `[data-scroll-content]` child, or first child
- **GSAP ScrollTrigger** does not use `window` as the scroller for most animations. It uses:

```text
scroller: "#main"
```

or the DOM element reference passed to `initScrollReveal(main)`.

### Global instance

- After init: **`window.locomotiveScroll`** holds the Locomotive instance.
- Lenis (smooth engine) is typically at:
  - `window.locomotiveScroll.lenisInstance` **or**
  - `window.locomotiveScroll.LenisInstance`  
  (code checks both; casing varies by build.)

### ScrollTrigger + Lenis

- `src/lib/locomotive.js` registers **`ScrollTrigger.scrollerProxy`** on `#main` and wires Lenis **`scroll`** events to **`ScrollTrigger.update()`**.
- **Any new scroll-driven GSAP** that should follow smooth scroll must:
  - use **`scroller: '#main'`** (or the same element ref), and
  - call **`ScrollTrigger.refresh()`** after DOM/route/layout changes.

### Route changes

- On pathname change, `layout.jsx` waits ~550ms, scrolls Lenis to **0**, refreshes ScrollTrigger, and runs **`initScrollReveal(main)`** again.
- **`PageTransition.jsx`** (route transitions) also scrolls to top via Lenis / fallback and calls **`lenis.resize()`** + **`ScrollTrigger.refresh()`** after transitions.

**Manus / implementation rule:** Do not move scroll to `document`/`window` for site-wide animations without updating the scroller proxy and all `ScrollTrigger` configs.

---

## 3. Global section reveal (`data-scroll-section`)

**File:** `src/lib/popprAnimations.js` → **`initScrollReveal(mainElement)`**

- Selects **`[data-scroll-section]`** elements.
- Animates **`opacity`** and **`y`** from a hidden initial state (see `src/index.css`: `[data-scroll-section]` starts translated/faded).
- Uses ScrollTrigger with **`scroller: #main`**, **`once: true`**, staggered delay per section.
- **Skipped entirely** if **`prefersReducedMotion()`** is true.

**Manus rule:** New full-width sections that should “fade up” on scroll should add **`data-scroll-section`** and rely on existing CSS + `initScrollReveal` unless a custom timeline is required.

---

## 4. Home page: loader then reveal

**Files:** `src/pages/Home.jsx`, `src/components/Loader.jsx`

- **`Loader`** runs a **GSAP timeline**: progress bar scale (if motion allowed), then fade/slide the overlay out, then **`onComplete`** sets app state so the rest of Home mounts.
- After loader completes, Home calls **`ScrollTrigger.refresh()`** and **`initScrollReveal(#main)`** so sections below the hero are not stuck invisible.

**Manus rule:** Do not remove the loader callback chain without re-running **`initScrollReveal`** when main content appears.

---

## 5. Page transitions (between routes)

**File:** `src/components/PageTransition.jsx`

- Uses **GSAP** timelines for overlay + loader mark on exit, then content on enter.
- Integrates with **`window.locomotiveScroll`** / Lenis: scroll to top before transition; **resize + ScrollTrigger.refresh** after.

**Manus rule:** New root wrappers should keep **`PageTransition`** children structure compatible, or replicate scroll-reset + **refresh** behavior.

---

## 6. Per-section GSAP (examples)

These use **`scroller: "#main"`** in ScrollTrigger:

| Area | File | Behavior (summary) |
|------|------|----------------------|
| About hero | `src/components/sections/AboutHero.jsx` | Mouse “torch” CSS vars (`--mouse-x/y`), GSAP timeline for badge/title/panel; ScrollTrigger scrub on background |
| Why Choose | `src/components/sections/WhyChooseUs.jsx` | Scroll-triggered heading/grid; image tilt on mousemove |
| Service tiers (“How our services help”) | `src/components/sections/ServiceTiers.jsx` | Heading + card stagger; 3D tilt on cards |
| Contact / others | Various | Same pattern: `gsap.context`, **`scroller: '#main'`** |

**Manus rule:** Clone patterns from these files instead of attaching ScrollTrigger to `window`.

---

## 7. Hero WebGL globe

**File:** `src/canvas/HeroGlobePlexus.jsx`

- **Three.js** scene: textured Earth, point dots, outer plexus lines, bloom via **EffectComposer** + **UnrealBloomPass**.
- **Interaction:** User rotates an **`earthSpinGroup`** (not the camera); inertia on release; no OrbitControls.
- **`prefersReducedMotion()`:** Renders a **static CSS gradient** fallback (no WebGL interaction).

**Manus rule:** Keep **`pointer-events`** on hero text vs canvas aligned with `Hero.jsx` (text often `pointer-events-none` except CTAs) so drag hits the canvas.

---

## 8. CSS-level motion

**File:** `src/index.css` (and some `style jsx` inside components)

- Utilities such as **`bg-tech-vignette`**, **`bg-tech-grid-faint`**, **`bg-pattern-dots`**, marquee/keyframe helpers.
- **`[data-scroll-section]`** base state for GSAP reveal.
- **`prefers-reduced-motion`** / **`.reduced-motion`** (class on `html` from `layout.jsx` when user prefers reduced motion).

---

## 9. Accessibility: reduced motion

**File:** `src/lib/utils.js` — **`prefersReducedMotion()`**

- When **true**: Locomotive may be skipped (`locomotive.js`), **`initScrollReveal`** no-ops, Loader uses shorter timings, globe uses static fallback, etc.

**Manus rule:** Any new animation should check **`prefersReducedMotion()`** and provide simpler or static output.

---

## 10. Files to treat as “motion source of truth”

| Path | Purpose |
|------|---------|
| `src/lib/locomotive.js` | Locomotive + Lenis + ScrollTrigger proxy |
| `src/lib/popprAnimations.js` | Scroll reveal, cursor, nav experiments, shared GSAP helpers |
| `src/app/layout.jsx` | `#main`, route-based `initScrollReveal` |
| `src/components/PageTransition.jsx` | Route transition GSAP + scroll refresh |
| `src/components/Loader.jsx` | Entry timeline |
| `src/canvas/HeroGlobePlexus.jsx` | Three.js hero |
| `src/index.css` | Global motion-related CSS |

---

## 11. Quick checklist for Manus / exports

1. Keep **`#main`** as the scroll root for ScrollTrigger unless you refactor `locomotive.js` and all `scroller: '#main'` usages.
2. After layout or content changes: **`ScrollTrigger.refresh()`** and Lenis **`resize()`** where applicable.
3. Add **`data-scroll-section`** to new sections for default reveal (unless intentionally excluded).
4. Respect **`prefers-reduced-motion`** for heavy or continuous motion.
5. Hero canvas: test **pointer-events** so CTAs remain clickable and globe receives drags.

---

## 12. Brand / visual direction (motion-adjacent)

- Premium agency + healthcare credibility; **dark sections** with **cyan/teal** accents and optional **gold** for key CTAs (see `src/index.css` CSS variables and `project-context` Cursor rules).
- Motion should feel **intentional**, not noisy: ease curves like **`expo.out`**, **`power2.out`**, short stagger.

---

*Generated for handoff to Manus or other build tools. Update this file if the scroll stack or hero implementation changes.*
