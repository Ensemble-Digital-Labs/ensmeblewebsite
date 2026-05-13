# Session log – 2026-05-13

## Summary
Home problem pains are full-bleed horizontal bars (stacked, edge-to-edge) with GSAP + ScrollTrigger: even rows slide in from the left, odd from the right, staggered timeline when the list hits the viewport; `prefers-reduced-motion` skips motion. No SplitText (not in deps).

## Changes
- Edited `src/components/sections/HomeProblemSection.jsx` — layout + `useLayoutEffect` initial `xPercent`, `useEffect` tween + `ScrollTrigger` (`scroller: #main` when present), stats block stays in constrained container

## Notes
- `toggleActions: play none none reverse` replays when scrolling back above the trigger.

## Next steps
- Optional: per-bar triggers instead of one staggered timeline if stagger should start only as each bar enters view.
