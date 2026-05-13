# Session log – 2026-05-13 (Parallax pillar label idle vs reveal)

## Summary
Implemented two-phase pillar titles in `ParallaxLayerShowcase`: on hover-capable desktops, labels start large, bold, and centered; on hover/focus reveal they animate to the compact top-left style while the curtain opens. Added `detachUntilRevealed` on `CardCurtainRevealDescription` so hidden-phase copy is absolutely positioned and does not steal flex space from the centered label. Exported `useCardCurtainRevealContext` for the pillar label subcomponent.

## Changes
- Edited `src/components/ui/CardCurtainReveal.jsx` — `detachUntilRevealed` prop, export `useCardCurtainRevealContext`.
- Edited `src/components/sections/ParallaxLayerShowcase.jsx` — `ParallaxPillarLabel` + `motion` transitions.

## Notes
- Touch / `prefers-reduced-motion`: `isRevealed` stays true, so users see the compact header + full body copy (no hover-only content).

## Next steps
- None required.
