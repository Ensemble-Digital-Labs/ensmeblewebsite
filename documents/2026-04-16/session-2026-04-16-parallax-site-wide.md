# Session log – 2026-04-16 (parallax site-wide)

## Summary

Extended scroll-linked layer parallax across the app: replaced Home-only `HomeParallaxRegistry` with `ParallaxLayerRegistry` mounted in `layout.jsx` (staggered re-init on route change so loader-gated Home content still registers). Added `ParallaxDepth` (two-layer background vs content) to major sections and list/detail pages. Kept Locomotive/Lenis + `#main` scroller only—no duplicate Lenis.

## Changes

- Added `src/components/ui/ParallaxDepth.jsx` — reusable `[data-parallax-layers]` wrapper with optional `layer1` and `variant` (`subtle` | `default`).
- Added `src/components/ParallaxLayerRegistry.jsx`; removed `HomeParallaxRegistry.jsx`.
- `src/app/layout.jsx` — render `<ParallaxLayerRegistry />` inside `[data-scroll-content]`.
- `src/pages/Home.jsx` — removed Home-only registry (handled globally).
- Parallax splits / `ParallaxDepth`: `Carousel3D`, `Page4`, `TestimonialsCollage`, `MissionValues`, `ServicesHero`, `ServicesGrid`, `Team`, `ServiceTiers`, `HowWeWork`, `FAQ`, `WhyChooseUs`, `ContactHero`, `CaseStudies`, `Insights`, `CaseStudyDetail` (multiple sections).
- `Carousel3D.jsx` — `ScrollTrigger` for `.carousel-3d-wrapper` now uses `scroller: #main`.

## Notes

- **Home `Hero`** intentionally not wrapped (globe + stacked backdrops are sensitive to extra transform layers).
- `prefersReducedMotion()` still skips parallax setup in `parallaxLayerStacks.js`.

## Next steps

- If Hero should get depth, add a very subtle two-layer split after visual QA at 320–1440px.
