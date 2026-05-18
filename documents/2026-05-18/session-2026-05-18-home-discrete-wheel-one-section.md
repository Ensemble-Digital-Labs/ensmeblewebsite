# Session log – 2026-05-18 (home discrete wheel — one section per gesture)

## Summary
Homepage deck scrolling now treats each wheel flick or touch swipe as exactly one chapter change. Wheel events inside the story region call `preventDefault`, stop Lenis momentum, and step ±1 with a gesture lock and cooldown. Scroll progress no longer drives chapter index. Lenis `smoothWheel` is off on `/`.

## Changes
- Rewrote `src/components/home/HomeStoryViewport.jsx` — wheel + touch handlers, `tryStepChapter`, removed debounced ScrollTrigger index mapping
- Updated `src/lib/locomotive.js` — `smoothWheel: !homeDeck` on home

## Notes
- Last chapter + scroll down: wheel is not hijacked so the user can reach the footer.
- Chapter rail still jumps directly to any index via `goToSlideById`.

## Next steps
- Verify trackpad vs mouse wheel and mobile swipe on `/`.
