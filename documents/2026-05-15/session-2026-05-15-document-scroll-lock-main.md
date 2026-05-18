# Session log – 2026-05-15

## Summary
Reduced the stray vertical scrollbar on refresh by locking document scroll to `#main`: `html`/`body` now use `overflow-y: hidden` (horizontal unchanged), native `#main` scroller gets the same hidden-scrollbar treatment as the document, and `#main` height uses `100dvh` caps instead of `100vh` to avoid small viewport overflow vs browser chrome.

## Changes
- `src/index.css`: `overflow-y: hidden` on `html, body`; scrollbar hiding on `#main.native-main-scroll`.
- `src/app/layout.jsx`: `#main` `h-screen` → `h-[100dvh] max-h-[100dvh]` for native and Lenis paths.

## Notes
- Scroll position / chapter rail still drive `#main`; touch and wheel behavior unchanged.
