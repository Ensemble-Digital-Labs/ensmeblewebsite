# Session log – 2026-06-13 (contextual cursor only)

## Summary
Removed the always-on following hollow ring cursor. Desktop now uses the **normal system pointer** by default; the circular **CLICK / DRAG / custom label** disc still appears on interactive hovers.

## Changes
- **`src/components/MovingCircle.jsx`** — ring mounts only when a label resolves; RAF runs only while active; `ensemble-custom-cursor-labeled` toggled on hover.
- **`src/index.css`** — replaced global `ensemble-custom-cursor` (cursor:none everywhere) with `ensemble-custom-cursor-labeled` (hide system cursor only during labeled hover).
- **`index.html`** — removed pre-React bootstrap that forced `cursor: none` on load.
- **`src/lib/cursorContext.js`** — comment update.

## Notes
- Touch / coarse pointer and `prefers-reduced-motion` unchanged (no custom cursor).
- `data-cursor-intent`, `data-cursor-label`, `data-cursor-suppress` still work as before.
