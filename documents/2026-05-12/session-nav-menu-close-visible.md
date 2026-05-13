# Session log – 2026-05-12 (nav open — visible close / X)

## Summary
When the fullscreen menu opened, the hamburger circle went fully transparent and the X arms stayed black, so the close control disappeared on the dark overlay. Open state now uses a dark glass fill, light X strokes (`#f4f4f5`), slightly thicker bars, and a soft shadow; closed state clears backdrop/shadow/height overrides. Decorative `an-cir*` layers are `pointer-events-none` so they never steal hits.

## Changes
- Edited `src/components/FullscreenNav.jsx`

## Next steps
- None.
