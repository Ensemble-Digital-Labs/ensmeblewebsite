# Session log – 2026-06-15 (nav spine corner overlap)

## Summary
Reduced visible corner overlap at the logo accordion spine using row z-index stacking and a wider opaque center seam—layout/tilt unchanged.

## Changes
- `src/styles/fullscreen-nav-menu.css` — row z-index (1→3 top to bottom); wider `--logo-spine-width` seam with dark backdrop + side shadow mask; `isolation: isolate` on accordion.

## Notes
- Upper rows paint over lower-row corner bleed; spine sits above tiles at z-index 5.
