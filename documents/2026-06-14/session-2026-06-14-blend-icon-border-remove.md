# Session log – 2026-06-14 (blend icon border remove)

## Summary
Removed visible white border and card chrome from homepage blend icons (section accents, process steps, PopArt overlays). Service capability icons unchanged.

## Changes
- `src/components/ui/ContextualIcon.jsx` — blend frames use `rounded-none overflow-visible` (no clipped card edge)
- `src/index.css` — removed `border` and `box-shadow` from `.ensemble-contextual-icon-frame--blend` and `.home-popart-visual-stack__card--blend`

## Notes
- Themed contextual frames (Services grid) still use lavender border + glow as before.
