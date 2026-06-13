# Session log – 2026-06-13 (nav selected work rail)

## Summary
Fullscreen nav “Selected work” rail now fills the right column to the bottom on laptop+ instead of stopping at 72svh.

## Changes
- `src/components/FullscreenNav.jsx` — removed scroll height cap; aside stretches full column; slightly taller cards/images
- `src/index.css` — lg flex fill rule for `.fs-nav-showcase-scroll`

## Update (showcase links clickable)
- Pointer capture only after drag threshold so taps reach NavPixelLink; clicks blocked only after real drags
