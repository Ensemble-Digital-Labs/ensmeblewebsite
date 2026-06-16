# Session log – 2026-06-15 (nav content reveals with expand)

## Summary
Menu links and showcase now clip with the circle expand so content appears progressively—not after a blank canvas pop-in.

## Changes
- `src/components/FullscreenNav.jsx` — moved content inside `fs-nav-expand-clip-layer`; removed delayed autoAlpha reveal
- `src/styles/fullscreen-nav-menu.css` — clip layer allows content stacking; added `fs-nav-expand-content`

## Notes
- No slide-up stagger; content position is fixed and revealed by the growing circle edge.
