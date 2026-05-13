# Session log – 2026-05-12 (custom cursor crossfade)

## Summary
Hovering interactive targets swapped the cursor between a hollow ring and a filled disc via conditional render, which read as an abrupt “puff.” Both layers stay mounted; CSS crossfades `opacity` + subtle `scale` with a shared easing curve. Removed the labeled-only `drop-shadow` filter snap.

## Changes
- Edited `src/components/MovingCircle.jsx`
- Edited `src/index.css` (`.cursor-brand`, `__idle`, `__disc`, labeled modifiers)

## Notes
- `prefers-reduced-motion`: `MovingCircle` still unmounts; global CSS reduce block does not target these classes specifically.

## Next steps
- None.
