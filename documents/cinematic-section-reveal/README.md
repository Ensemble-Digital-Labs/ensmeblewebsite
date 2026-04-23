# Cinematic section reveal (pinned scroll takeover)

This folder documents how the **testimonials** and **share your experience** full-viewport sections get a **footer-like cinematic beat**: the section **pins** for about **one screen of scroll**, while a **scrubbed GSAP timeline** eases content up and in.

It is **separate from** date-based session logs under `documents/YYYY-MM-DD/` — treat this as the **reference guide** for the feature.

---

## Where the code lives

| Piece | Path |
|--------|------|
| Core logic | `src/lib/cinematicSectionReveal.js` |
| React hook | `useCinematicSectionReveal(sectionRef)` in the same file |
| Example usage | `src/components/sections/TestimonialsCollage.jsx`, `ShareExperienceSection.jsx`, **`Page4.jsx`** (`#page4`) |
| Layout scroller | `#main` (Lenis / Locomotive wrapper in `src/app/layout.jsx`) |
| Related: no competing parallax on those bands | `scrollLayerParallax={false}` on `ParallaxDepth` in those sections (`src/components/ui/ParallaxDepth.jsx`) |
| Footer (similar *feel*, different technique) | `src/components/CinematicFooter.jsx` — fixed footer + scrub on inner layers, not `pin` |

---

## What you feel when scrolling

1. The section scrolls until its **top** aligns with the **top** of `#main` (`start: 'top top'`).
2. **ScrollTrigger pins** that section: the page **stops moving the section away** and instead you “spend” scroll distance **while the section stays fixed** on screen.
3. The **`end`** of that pin is roughly **one viewport height** of scroll (`+=` pixels equal to `#main`’s `clientHeight`, with fallbacks).
4. During that pinned range, a **timeline** is **scrubbed** to scroll position: headline and blocks **move up** (`y`) and **fade in** (`opacity`), with a **stagger** on blocks.

So: **one dedicated scroll chapter per section**, like the cinematic footer’s “slot” in the scroll story, but implemented with **`pin`** so it works **in the middle of the page**, not only at the bottom.

---

## Markup contract (inside the pinned `<section>`)

The `trigger` passed to `setupCinematicSectionReveal` is usually the `<section>` ref.

- **`data-cinematic-reveal="lead"`** — Optional. One element (often a wrapper around eyebrow + title). First beat in the timeline.
- **`data-cinematic-reveal="block"`** — Any number of elements, **DOM order = stagger order** (subtitle, carousel wrapper, form, etc.).

If there is **no** `lead`, only `block` nodes are animated; the blocks tween starts at timeline position `0` instead of `0.12`.

---

## ScrollTrigger + timeline values (current)

These are the important literals in `cinematicSectionReveal.js` (tune here first).

### Pin range

| Option | Value | Notes |
|--------|--------|--------|
| `start` | `'top top'` | Pin begins when section top hits scroller top. |
| `end` | `+=<h>` | `h = Math.round(scroller.clientHeight \|\| window.innerHeight \|\| 720)` — **not a fixed number**; it tracks the real `#main` height. |
| `pin` | `true` | |
| `pinSpacing` | `true` | GSAP adds spacer so layout below doesn’t jump. |
| `scrub` | `1.1` | Higher = more “lag” / smoothing between scroll and animation. |
| `anticipatePin` | `1` | Helps pin feel stable on fast scroll / mobile. |
| `invalidateOnRefresh` | `true` | Recalculates on resize / refresh. |

### Timeline tweens (normalized “duration” is share of the pinned scroll)

| Segment | From | To | `duration` | Start position on timeline |
|---------|------|-----|------------|------------------------------|
| Lead | `y: '8vh'`, `scale: 0.92`, `opacity: 0` | `y: 0`, `scale: 1`, `opacity: 1` | `0.42` | `0` |
| Blocks | `y: 52`, `opacity: 0` | `y: 0`, `opacity: 1`, `stagger: { each: 0.07 }` | `0.52` | `0.12` if lead exists, else `0` |

Blocks use **`opacity` only** (not `autoAlpha`) so GSAP does not set `visibility: hidden` on wrappers that contain hover-driven UI (e.g. `#page4` `.reveal-image`).

Timeline `defaults.ease` is `'none'` so motion is **linear in timeline space**; perceived easing comes from **scrub** smoothing.

### `#page4` and `initScrollReveal`

Sections with **`data-scroll-section`** get `initScrollReveal` tweens on the **whole `<section>`** (`opacity` + `y`, `overwrite: 'auto'`), which **fights ScrollTrigger `pin` + transforms** on the same node. **`#page4` must not use `data-scroll-section`** while using this pin effect. Hover previews are bound by **`initImageReveal()`** in `popprAnimations.js`; `Page4` also calls it after mount so binding works if global init ran before the loader showed this section.

---

## Lifecycle / Lenis

`useCinematicSectionReveal` waits **200ms** after mount, then:

1. Runs `setupCinematicSectionReveal(section, #main)`.
2. Calls **Lenis `resize()`** if available (`window.locomotiveScroll`), then **`ScrollTrigger.refresh()`**.

That reduces wrong measurements when the smooth scroller hasn’t finished layout.

---

## Reduced motion

If `prefersReducedMotion()` is true, no pin and no tweens: elements are **`gsap.set`** to visible final state.

---

## How this differs from `CinematicFooter`

| | Pinned sections (this lib) | `CinematicFooter` |
|--|----------------------------|-------------------|
| Mechanism | **`pin: true`** on the section | **`position: fixed`** footer + **`min-h-[100svh]`** spacer in document flow |
| Where it works | Anywhere on the page | End of scroll content (in `layout.jsx`) |
| Scroller | `#main` | `#main` (same) |

Both use **scrub** so motion **follows scroll** instead of playing once on enter.

---

## Quick tuning ideas

- **Longer “takeover”**: multiply height in `pinScrollEnd`, e.g. `return \`+=${Math.round(h * 1.25)}\``.
- **Snappier scroll follow**: lower `scrub` (e.g. `0.6`).
- **Softer follow**: raise `scrub` (e.g. `1.6`).
- **More / less stagger**: change `stagger.each` or block `duration` / timeline start offset `0.12`.

---

## Version

Document reflects the implementation in **`src/lib/cinematicSectionReveal.js`** as of the project date when this note was added (see git history for exact commits).
