# Session log – 2026-05-12 (hero phase-2 left width again)

## Summary
Left headline still read in a short box because `lg:max-w-[52rem]` capped width below the grid cell. Removed the desktop max-width cap (`lg:max-w-full` + `min-w-0`) and shifted the split to ~2fr / 0.92fr with slightly tighter column gap so the statement uses almost the full left column.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx`

## Notes
- Copy unchanged; only layout. Mobile/stacked uses `max-w-[min(100%,48rem)]` for comfortable measure.

## Next steps
- None.
