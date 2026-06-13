# Session log – 2026-06-13 (cursor nav + mobile)

## Summary
Suppressed CLICK custom cursor in the top nav and fullscreen menu on laptop. Disabled custom cursor, menu ripple, and pixel nav wipe on mobile/tablet.

## Changes
- Updated `src/lib/cursorContext.js` — `shouldUseCustomCursor()`, nav/fullscreen suppress selectors
- Updated `src/components/MovingCircle.jsx` — desktop-only with responsive media listeners
- Updated `src/components/FullscreenNav.jsx` — `data-cursor-suppress` on `.nav` and `#fullscreen-nav`
- Updated `src/index.css` — menu ripple only on `(hover: hover) and (pointer: fine)`; nav keeps system cursor
- Updated `src/lib/pixelNav.js` — skip pixel wipe on mobile animation profile

## Notes
- Laptop: CLICK/DRAG ring still works on page content, not in nav bar or open menu
- Mobile: no custom cursor dot, no hamburger ripple on tap, instant route changes (no pixel drop)
