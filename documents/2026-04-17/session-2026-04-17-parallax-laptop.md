# Session log – 2026-04-17 (Parallax laptop image height)

## Summary
Capped parallax layer image height on tablet/laptop breakpoints so stacked artwork no longer reads as overly tall on ~1024–1440px screens. Build verified.

## Changes
- `src/components/sections/ParallaxLayerShowcase.jsx` — Reduced `md`/`lg`/`xl` min-heights on header and layer stack; added `max-h` on layers container; per-layer `img` uses `max-h-[min(...)]` with `object-contain` / `object-center` at those breakpoints.

## Notes
- Parallax motion scaling remains in `src/lib/parallaxLayerStacks.js` (matchMedia + ScrollTrigger.refresh).

## Next steps (optional)
- Visual QA at 1024px and 1280px to confirm overlap and title alignment still match intent.

---

## Update — med-tech background theme
Replaced flat `#05080c` fill with shared `ParallaxThemedBackdrop` (`tone="dark"`) plus a light radial vignette; removed the old full-width black hairline; aligned stack bottom fade to `#030712`. Build verified.

---

## Update — carousel scroll + parallax backdrop
- **ParallaxLayerShowcase**: Removed extra absolute backdrop layers (`ParallaxThemedBackdrop` + vignette); kept solid `#030712` and `isolate` for stacking. Avoids competing layers above the scroll content.
- **CircularGallery**: Stopped driving rotation via React `useState` every `requestAnimationFrame` (was ~60 full re-renders/sec). Rotation and face opacity now update via refs / direct DOM writes so Lenis smooth scroll is not starved.
- **getLenisScrollY**: Normalizes Lenis `scroll` when it is a number vs `{ y }`.
