# Session log – 2026-05-13 (Parallax titles — fade + static compact)

## Summary
Replaced morphing pillar titles with two layers: a **large hero line** that **fades out** on reveal, and a **static compact header** (same copy) that **fades in** (glass) or sits **under split doors** at `z-[1]` and is uncovered when doors open, with the hero line fading out on `z-[3]`. No `fontSize` / layout transform on the headline.

## Changes
- Edited `src/components/sections/ParallaxLayerShowcase.jsx` — `ParallaxPillarHeaders`, split pillar stacking + JSDoc.

## Next steps
- None.
