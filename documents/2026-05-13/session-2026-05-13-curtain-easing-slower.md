# Session log – 2026-05-13 (curtain timing)

## Summary
Slowed and smoothed clip-path curtain transitions in `CardCurtainReveal` (open ~0.75s ease-out, close ~0.55s gentler ease-in) and aligned `ParallaxPillarLabel` motion timing with the open curve.

## Changes
- Edited `src/components/ui/CardCurtainReveal.jsx` — `curtainVariants` durations + cubic-bezier eases.
- Edited `src/components/sections/ParallaxLayerShowcase.jsx` — `pillarLabelTransition`.

## Next steps
- None.
