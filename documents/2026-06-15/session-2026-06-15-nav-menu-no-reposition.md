# Session log – 2026-06-15 (nav menu no reposition)

## Summary
Fixed nav menu content jumping/repositioning on open by clipping only the backdrop layer (not menu content) and removing the post-expand slide-up GSAP stagger.

## Changes
- `src/components/FullscreenNav.jsx` — `expandClipRef` + `navContentRef`; backdrop-only circle expand; content fades in at final position
- `src/styles/fullscreen-nav-menu.css` — moved clip-path from shell to `fs-nav-expand-clip-layer`

## Notes
- Matches contact orb pattern: expand animates background only; links/showcase stay fixed.
