# Session log – 2026-05-13

## Summary
Reduced the “old” default / third-party cursor flash on full reload by removing the legacy Firefly CDN stylesheet, bootstrapping `ensemble-custom-cursor` in `index.html` before the app bundle, and applying the same class in `MovingCircle` via `useLayoutEffect` with a synchronous mount decision.

## Changes
- Edited `index.html`: removed Cursors-4U Firefly link; added minimal inline `<style>` + `<script>` for early custom-cursor class when `(pointer: fine)` and not reduced motion.
- Edited `src/components/MovingCircle.jsx`: `useState(shouldMountCustomCursorRing)`, `useLayoutEffect` for `ensemble-custom-cursor` class (instead of `useEffect` after a delayed `setMounted(true)`).
- Edited `src/index.css`: dropped Firefly-specific comments in the reduced-motion / coarse-pointer `html` cursor overrides.

## Notes
- The Firefly stylesheet loaded in `<head>` before React and could read as the “old” cursor during load.
- Adding only the class before Vite injects `index.css` would not hide the cursor until CSS loaded; the inline `<style>` fixes that gap.

## Update — revert dev-only native scroll + fix native `#main` height

### Summary
Reverted `import.meta.env.DEV` forcing native scroll (it broke wheel scroll because `#main` used `min-h-screen` with `overflow-y-auto`, so the element grew with content and never became a scrollport). Native mode now uses `h-screen` like the Lenis branch. Optional `VITE_USE_NATIVE_MAIN_SCROLL=true` restores opt-in native scroll for DevTools-wide preview.

### Changes
- Edited `src/lib/utils.js`: removed unconditional `DEV` return; added `VITE_USE_NATIVE_MAIN_SCROLL === 'true'` gate + comment.
- Edited `src/app/layout.jsx`: native `#main` classes `min-h-screen` → `h-screen` for a bounded scroll container.
- Edited `.env.example`: documented optional `VITE_USE_NATIVE_MAIN_SCROLL`.

---

## Update — hero phase-2 right aside vertical nudge

### Summary
Lowered the phase-2 glass value-prop aside on desktop by increasing its own `translate-y` utilities (`lg` / `xl`) so the left lockup, media card, shutters, and CTAs are unchanged.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — phase-2 aside: `lg:translate-y-36 xl:translate-y-48` → `lg:translate-y-40 xl:translate-y-52`.

---

## Update — phase-2 aside glass more transparent

### Summary
Made the right-column value-prop glass panel more see-through: lighter fill, slightly softer blur, adjusted border/ring/shadow; strengthened paragraph text-shadow for contrast on busy background.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — `HeroScrollExpandPhase2Aside` inner panel classes.

---

## Update — phase-2 keywords use CTA gradient (`growth-gradient-text`)

### Summary
Right glass aside now renders `heroSubheadSegments` with `growth-gradient-text` on `emphasis` segments (same pink→coral as primary CTAs). Left lockup lines 2–3 (“marketing”, “agency”) use the same class.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — import `heroSubheadSegments`; `HeroScrollExpandPhase2Aside` takes `segments`; lockup spans for line2/line3.

---

## Update — phase-2 lockup title clipping (“agency” tops)

### Summary
Large italic `growth-gradient-text` used `lg:leading-[1.06]` + `items-baseline`, which often clips ascenders. Loosened desktop leading, switched to `items-start`, added small vertical padding on the line and gradient spans, `overflow-visible` on the lockup column / phase-2 wrapper, and slightly relaxed line1 leading on `lg`.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — phase-2 left lockup typography / layout classes.

---

## Update — phase-2 lockup italic clipping on the right (g, y)

### Summary
Italic + `growth-gradient-text` was still clipped on the right: tightened grid (`minmax(0,2fr)` + `min-w-0` + `max-w`) squeezed the paint box. Switched first grid track to `minmax(min-content,2fr)`, relaxed left column max-width on `lg`, added `lg:min-w-min`, extra column/line padding, and set gradient words to `inline-block` with asymmetric horizontal padding for italic overshoot.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — phase-2 grid + lockup spans.

---

## Update — restore phase-2 layout after clip experiments

### Summary
Reverted grid (`minmax(0,2fr)`), column max-width / padding / `min-w-min`, lockup leading (`lg:leading-[1.06]`), `items-baseline`, and `subRef` overflow to restore original composition. Kept `growth-gradient-text` on line2/line3 with **tiny** `[padding-inline-end]` / `[padding-inline-start]` on those spans only (minimal anti-clip, negligible layout shift).

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — phase-2 lockup block.

---

## Update — phase-2 gradient line descenders (g, y) bottom clip

### Summary
Tight `lg:leading-[1.06]` was cropping descenders on large italic `growth-gradient-text`. Bumped that line to `lg:leading-[1.18]`, added `lg:pb-[0.1em]` on the line, and `[padding-block-end]` on the two gradient spans so the clip region includes tails—no grid/column changes.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — second lockup `<p>` + gradient `<span>`s only.

---

## Update — glass aside “snaps opaque” during hero scroll (GSAP + backdrop-filter)

### Summary
`autoAlpha` on the phase-2 `subRef` set **opacity** on an ancestor of the glass panel; in Chrome that breaks compositing for **`backdrop-filter`**, so the card looked transparent then turned milky/solid mid-scrub. Fade is split: **`autoAlpha` only on lockup + CTA rows**; the aside sits in **`subAsideWrapRef`** shown with **`visibility`** (no opacity animation on backdrop ancestors); **`subRef`** only animates **`y`** + pointer-events.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — refs `subLockupRef`, `subAsideWrapRef`, `subCtasRef`; GSAP `set` / `tl` phase-2 tweens; JSX wrappers.

---

## Update — phase-2 glass: true see-through (no backdrop-blur)

### Summary
`backdrop-blur` on the hero pin reads as a solid frosted slab in many GPU/transform stacks. Removed it and lowered the panel tint (`bg-[#050816]/22`) with a slightly stronger border/ring so the card stays **actually transparent** end-to-end while text stays readable via existing shadows.

### Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — `HeroScrollExpandPhase2Aside` inner panel classes.
