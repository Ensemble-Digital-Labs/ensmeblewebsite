# Session log – 2026-05-11

## Summary
Custom cursor ring now **eases toward the pointer** via `requestAnimationFrame` + lerp (`CURSOR_SMOOTH = 0.2`) instead of snapping each `mousemove`. Hit-testing for labels still uses the real pointer position.

## Changes
- `src/components/MovingCircle.jsx` — `targetRef` / `currentRef`, continuous rAF tick, snap when delta &lt; 0.4px.
