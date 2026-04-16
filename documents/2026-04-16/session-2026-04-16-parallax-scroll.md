# Session log – 2026-04-16 (parallax scroll)

## Summary

Added GSAP ScrollTrigger–driven multi-layer parallax that uses the existing Locomotive/Lenis scroller (`#main`) only—no second Lenis instance. Wired a new Osmo-style image stack section after the hero, two-layer parallax on Page2 (“Selected Work”), and a small registry component mounted on Home when content loads.

## Changes

- Added `src/lib/parallaxLayerStacks.js` — `mountParallaxLayerStacks(#main)` for `[data-parallax-layers]` / `[data-parallax-layer]`, optional `data-parallax-y`.
- Added `src/components/HomeParallaxRegistry.jsx` — mounts stack registration when Home content is active.
- Added `src/components/sections/ParallaxLayerShowcase.jsx` — four-layer reference visuals + heading.
- Updated `src/pages/Home.jsx` — registry + showcase after `Hero`.
- Updated `src/components/sections/Page2.jsx` — parallax wrapper + layers; removed unused `Container` import.

## Notes

- Respects `prefersReducedMotion()` (skips parallax setup).
- Scroll reveal on `[data-scroll-section]` is unchanged; parallax triggers target inner `[data-parallax-layers]` nodes.

## Next steps

- Add `[data-parallax-layers]` to other sections if desired; tune `data-parallax-y` for lighter motion on small screens if needed.
