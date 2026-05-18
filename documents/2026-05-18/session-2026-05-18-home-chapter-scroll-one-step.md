# Session log – 2026-05-18 (home chapter scroll — one step per gesture)

## Summary
Fixed homepage deck scrolling where one long wheel stroke could skip multiple narrative chapters. Scroll progress now uses hysteresis anchored to the visible slide, visual changes advance at most one chapter per commit, and scroll position snaps back to the active chapter after each transition. Lenis on `/` uses slightly lower duration and wheel multiplier.

## Changes
- Updated `src/components/home/HomeStoryViewport.jsx` — `chapterIndexFromProgress`, one-step debounced advance, scroll snap after chapter, transition lock during pixel pass
- Updated `src/lib/locomotive.js` — `homeDeck` option (duration 1.05, wheelMultiplier 0.82)
- Updated `src/app/layout.jsx` — pass `homeDeck: location.pathname === '/'`

## Notes
- Root cause: `floor(progress × n)` + Lenis momentum let debounce commit to a far-ahead index, skipping intermediate pixel transitions.
- Rail `goToSlideById` path unchanged; still uses full jump + pixel cover.

## Next steps
- Manual pass on `/` at 320px / 1440px: fast trackpad vs mouse wheel; confirm rail jumps still feel correct.
