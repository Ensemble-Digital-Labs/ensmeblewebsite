# Session log – 2026-06-12 (hero rail tile spacing)

## Summary
Separated overlapping hero side-rail photo tiles so they stack vertically with clear gap instead of colliding.

## Changes
- `src/index.css` — rail primary/secondary use top-based positions (6% / 56%); slightly smaller widths; disabled float bob on rail tiles
- `HomeHeroSideRail.jsx` — taller rail column min-height

## Notes
- Mobile collage layout unchanged; overlap fix targets md+ flanking columns.
