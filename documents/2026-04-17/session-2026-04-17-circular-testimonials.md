# Session log – 2026-04-17

## Summary
Redesigned the home testimonials section (`TestimonialsCollage`) with a circular 3-card carousel inspired by the 21st.dev circular testimonials pattern: Framer Motion quote transitions, 3D-style photo stack, cyan/med-tech glass panel, and Lucide arrow controls. Preserved `ParallaxDepth`, data + localStorage user testimonials, and the “Share your experience” form.

## Changes
- Created `src/components/ui/CircularTestimonials.jsx` — carousel UI with responsive gap math, touch swipe, autoplay (disabled when `prefers-reduced-motion`), keyboard nav (skips when focus is in form fields), fallback stacked cards when fewer than three items.
- Updated `src/components/sections/TestimonialsCollage.jsx` — replaced photo grid + GSAP tile reveals with `CircularTestimonials`; updated subtitle copy for the new interaction model.

## Notes
- Uses existing `framer-motion` and `lucide-react` (no `react-icons` or styled-jsx).
- Build verified with `npm run build`.

## Next steps
- Optional: narrow arrow-key handling to when the carousel region is focused instead of window-wide.

---

## Update — testimonials carousel spread

Increased horizontal offset for left/right (“back”) images via higher `calculateGap` values, slightly stronger vertical arc (`maxStickUp`), side scale `0.82`, wider image column (`max-w-lg` + horizontal padding). Set the glass card to `overflow-visible` so wider offsets are not clipped.

## Changes
- `src/components/ui/CircularTestimonials.jsx`

---

## Update — Home `Carousel3D` (page3) circular gallery

Replaced the translateX/translateZ per-card carousel with a **rotateY + translateZ ring** (`CircularGallery`), matching the provided reference: scroll progress on `#main` / Lenis drives rotation; when scroll is idle, a slow auto-spin runs. Preserved section backdrop, parallax layers, and `StandardCTA`. Removed GSAP `ScrollTrigger` parallax on the old wrapper and prev/next/dot controls.

## Changes
- Added `src/components/ui/CircularGallery.jsx`
- Updated `src/components/sections/Carousel3D.jsx`

---

## Update — Carousel3D full viewport + scroll progress

`#page3` is now **one viewport tall** (`100svh`), gallery fills the area, hint + CTA sit as a **bottom overlay**. Scroll rotation uses **`[data-scroll-content]` scroll height vs `#main` viewport** (and Lenis `limit` when present), matching the pasted `scrollY / scrollableHeight → ×360°` behavior. `CircularGallery` uses **ResizeObserver** for **radius** and **card size** from the live box.

## Changes
- `src/components/ui/CircularGallery.jsx`
- `src/components/sections/Carousel3D.jsx`

---

## Fix — CircularGallery scroll rotation “way off”

Lenis exposes **`progress`** (`scroll / limit`) and **`limit`** as numbers on the instance. The previous math mixed DOM `scrollHeight - clientHeight` with Lenis `scroll`, while **`#main`’s native `scrollTop` stays 0** under smooth scroll—so progress was wrong. **`getMainScrollProgress()`** now prefers **`lenis.progress`**, then **`lenis.scroll / lenis.limit`**, with DOM fallback only when Lenis is absent. Rounded progress in the rAF tick reduces jitter vs idle spin.

## Changes
- `src/components/ui/CircularGallery.jsx`

---

## Fix — CircularGallery scroll sync (idle spin removed + `__ensembleLenis`)

A follow-up fix: **idle auto-rotation** still added degrees every frame when scroll delta looked stable, which broke scroll–rotation coupling after you stopped scrolling. Rotation is now driven only by **`lenis.progress * 360`** each frame. **`window.__ensembleLenis`** is set in `locomotive.js` when Lenis starts so the gallery always resolves the same instance.

## Changes
- `src/components/ui/CircularGallery.jsx`
- `src/lib/locomotive.js`
- `src/components/sections/Carousel3D.jsx`

---

## Update — Carousel3D sticky pin + section-local rotation

The carousel section now uses a **tall outer wrapper** (`#carousel-pin-scroll`, `min-h-[260svh]`) with a **`sticky top-0` `h-[100svh]`** inner so the full carousel **stays in the viewport** while the user scrolls through that zone. Rotation uses **scroll progress through the pin wrapper** (Lenis `scroll` vs pin offset and `height − viewport`), not global page progress. Removed `overflow-x-clip` from the outer `#page3` section so `position: sticky` is not blocked.

## Changes
- `src/components/ui/CircularGallery.jsx` — `pinRootId`, `getPinZoneProgress`
- `src/components/sections/Carousel3D.jsx` — pin + sticky structure

---

## Update — Merge Page2 + Carousel3D into one section

**Selected Work** (former `Page2`) and the **3D carousel** (former standalone `Carousel3D`) are now a **single** `<section id="page2">`. The hero blend gradient + copy sit at the **top** of the sticky `100svh` column; `CircularGallery` fills the space below. Anchor **`#page3`** is on the sticky viewport wrapper. Removed `Page2.jsx`; `Home` renders only `Carousel3D`.

## Changes
- `src/components/sections/Carousel3D.jsx`
- `src/pages/Home.jsx`
- Deleted `src/components/sections/Page2.jsx`
- `src/index.css` — comment tweak for carousel styles

---

## Update — ParallaxLayerShowcase copy (healthcare relevance)

Replaced placeholder “Story in layers” with **Ensemble-aligned messaging**: eyebrow “How we work”, headline **Your practice, visible at every layer**, supporting paragraph and **three pillars** (Brand & story / Web & experience / Discovery & demand). Content lives in `parallaxShowcaseContent` in `content.js`. Decorative Osmo icon moved above the body copy.

## Changes
- `src/lib/content.js` — `parallaxShowcaseContent`
- `src/components/sections/ParallaxLayerShowcase.jsx`

---

## Fix — Responsive parallax (`ParallaxLayerShowcase` + stacks)

Parallax used fixed **`yPercent`** values that feel too strong on small viewports and **`overflow-hidden`** clipped vertical motion. **`parallaxLayerStacks.js`** now uses **`gsap.matchMedia`** to scale motion (≈0.4 / 0.68 / 1.0 by breakpoint), plus **debounced `resize` / `orientationchange` → `ScrollTrigger.refresh()`**. Showcase section uses **`overflow-x-clip overflow-y-visible`**, **`svh`-based min-heights**, extra vertical padding in the layer stack, and responsive layer `top` / width classes.

## Changes
- `src/lib/parallaxLayerStacks.js`
- `src/components/sections/ParallaxLayerShowcase.jsx`
