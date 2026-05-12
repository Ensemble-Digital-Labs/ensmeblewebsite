# Session log – 2026-05-11

## Summary
Cursor follow now uses **exponential easing** (`1 - exp(-λ·Δt)`) so motion eases as it nears the pointer and stays consistent across refresh rates. Replaced fixed linear lerp factor.

## Changes
- `src/components/MovingCircle.jsx` — `CURSOR_FOLLOW_LAMBDA` (5.25), `lastTsRef`, rAF `tick(ts)`.
