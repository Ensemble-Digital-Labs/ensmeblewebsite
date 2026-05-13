# Session log – 2026-05-13 (Parallax pillar — no title/body overlap)

## Summary
Fixed phase-2 overlap: the title stays `absolute` at the top while body copy also started at the top of the flow. Wrapped copy in `ParallaxPillarDescription` with a **fixed** top padding lane (`pt-[4.85rem]` … `md:pt-[5.5rem]`) so paragraphs clear the compact title band. Padding is **always** applied so card height stays consistent between idle and hover.

## Changes
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`.

## Next steps
- If any pillar title wraps to three lines at narrow widths, bump the `pt-*` values slightly.
