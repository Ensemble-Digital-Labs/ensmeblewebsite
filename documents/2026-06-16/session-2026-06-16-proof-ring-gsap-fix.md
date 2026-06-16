# Session log – 2026-06-16 (proof ring GSAP fix)

## Summary
Fixed Partners section stat ring stroke animation by switching from manual `requestAnimationFrame` + `pathLength="1"` dash math to GSAP tweens with real `getTotalLength()` circumference, matching other home count-up patterns.

## Changes
- `src/hooks/useDnaStyleCountUp.js` — GSAP timeline syncs count + `strokeDashoffset`; `initRingHidden` / `getRingPathLength`; trigger on `#home-proof`
- `src/components/shared/DnaStyleStatRing.jsx` — removed `pathLength="1"` and layout-effect reset
- `src/styles/dna-style-stat-ring.css` — removed fixed CSS dash values that conflicted with JS

## Notes
- `pathLength="1"` with `stroke-dasharray: 1 0` was leaving partial arcs; circumference-based dash is reliable across browsers.
- Ring draw now uses same `power2.out` ease and duration as count-up.

## Next steps
- Hard refresh homepage and scroll to Partners; confirm all three rings draw fully in sync with numbers.
