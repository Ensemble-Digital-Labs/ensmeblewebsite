# Session log – 2026-05-11

## Summary
Removed the custom cursor **click ripple** (no burst animation on click).

## Changes
- `src/components/MovingCircle.jsx` — dropped `clicks` state, click listener, timeout cleanup, and ripple DOM.
- `src/index.css` — removed `.cursor-click-ripple` and `@keyframes cursor-click-ripple`.
