# Session log – 2026-06-13 (cursor logo + hide pointer)

## Summary
Fixed contextual CLICK circle: no longer appears on nav logo; system cursor hidden while the labeled ring is visible (including over `#overlay` nav).

## Changes
- **`src/components/FullscreenNav.jsx`** — `data-cursor-suppress` on `.nav__brand`.
- **`src/lib/cursorContext.js`** — skip suppress zones and logo selectors.
- **`src/index.css`** — `cursor: none` on `#overlay` when labeled; logo suppress uses normal pointer.
- **`src/components/MovingCircle.jsx`** — `body.style.cursor = 'none'` while ring active.
