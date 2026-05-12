# Session log – 2026-05-11

## Summary
Fixed missing stat numbers in `HomeProblemSection`: values used gradient + `text-transparent` without guaranteed WebKit text-fill, so figures could render invisible while labels stayed visible.

## Changes
- `src/components/sections/HomeProblemSection.jsx` — stat values now use solid `text-white` with a soft growth-tinted `drop-shadow` instead of `bg-clip-text` gradient.
