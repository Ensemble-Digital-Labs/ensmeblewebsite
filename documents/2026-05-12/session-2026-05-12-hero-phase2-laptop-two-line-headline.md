# Session log – 2026-05-12 (hero phase-2 laptop 2-line headline)

## Summary
Phase-2 left lockup is now responsive: below `lg` it still reads as three lines (Not just a / marketing / agency) via stacked spans; from `lg` up it becomes two large lines (“Not just a” then “marketing agency”) with much larger clamps.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — merged lines 2–3 into one `<p>` with `block lg:inline` spans; responsive type scale.

## Notes
- `content.js` `heroScrollExpandPhase2Lockup` unchanged (same three strings).

## Next steps
- None.
