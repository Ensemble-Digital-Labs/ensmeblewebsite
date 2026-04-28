# Session log – 2026-04-27 (ParallaxLayerShowcase cinematic reveal)

## Summary
Applied the same GSAP ScrollTrigger pin + scrub pattern as other home bands (`useCinematicSectionReveal`) to `ParallaxLayerShowcase`, with lead on the visual stack header and blocks for the copy + pillars.

## Changes
- `src/components/sections/ParallaxLayerShowcase.jsx` — `sectionRef`, `useCinematicSectionReveal`, `id="parallax-showcase"`, `data-scroll`, `data-cinematic-reveal` on header / copy wrapper / pillars list
- `src/index.css` — `#main .pin-spacer:has(#parallax-showcase)` background `#030712`

## Notes
- Parallax layer tweens target `[data-parallax-layer]` children only; cinematic transforms on `__header` and lower blocks should not fight `parallaxLayerStacks.js`.
