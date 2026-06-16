# Session log – 2026-06-15 (uniform nav row profile)

## Summary
Aligned row 1→2 spacing/profile with row 2→3: removed row-1-only inset and extra padding; all rows now use the same shift and width step.

## Changes
- `src/styles/fullscreen-nav-menu.css` — dropped `--logo-row1-inset`; row 1 shift 0; `--logo-width-step: 8%` for rows 2–3; removed row-1 cell padding-top.
- `src/lib/navLogoTileMotion.js` — assemble uses uniform `(row - 1) * shiftStep` and `widthForRow()`.

## Notes
- Each row steps inward by 34px (lg) and narrows by 8%, matching row 2→3 rhythm for row 1→2.
