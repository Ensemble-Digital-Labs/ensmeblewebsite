# Session log – 2026-05-13 (parallax phase-1 hover affordance)

## Summary
Added phase-1 affordance for fine-pointer users: `CardCurtainReveal` context now exposes `hoverCapable` with subtle hover styling (`cursor-pointer`, soft cyan shadow, slight lift when motion is allowed). `ParallaxPillarHoverHint` renders a small “Hover to reveal” pill at the bottom while the card is idle; it hides when revealed, on touch, or with reduced-motion forced reveal.

## Changes
- Edited `src/components/ui/CardCurtainReveal.jsx`
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`

## Next steps
- Optional: swap copy to “Peek inside” or add `title` on the card if you want a native tooltip as well.
