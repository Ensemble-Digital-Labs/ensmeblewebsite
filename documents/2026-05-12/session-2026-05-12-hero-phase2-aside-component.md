# Session log – 2026-05-12 (hero phase-2 aside component + offset)

## Summary
Extracted the gold-bracket right column into a dedicated `HeroScrollExpandPhase2Aside` component (`<aside>`) and applied `lg:translate-y-10` / `xl:translate-y-12` so only that block shifts down; left headline + CTAs unchanged.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx`

## Notes
- `aria-label="What we do"` on the aside for landmark semantics.

## Next steps
- Adjust translate tokens if overlap appears against CTAs or the center card.
