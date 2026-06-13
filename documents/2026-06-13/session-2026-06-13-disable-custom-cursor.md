# Session log – 2026-06-13 (disable custom CLICK/DRAG cursor)

## Summary
Disabled the MovingCircle contextual cursor (CLICK / DRAG ring) site-wide per user request. Component and markup hooks remain for easy re-enable later.

## Changes
- **`src/lib/cursorContext.js`** — added `ENSEMBLE_CUSTOM_CURSOR_ENABLED = false` kill switch.
- **`src/app/layout.jsx`** — removed `<MovingCircle />` mount.

## Re-enable later
1. Set `ENSEMBLE_CUSTOM_CURSOR_ENABLED = true` in `src/lib/cursorContext.js`.
2. Restore `<MovingCircle />` in `src/app/layout.jsx` (after nav overlay).

## Notes
- `data-cursor-intent` / `data-cursor-label` attributes left on carousels and nav — inactive until cursor is re-enabled.
