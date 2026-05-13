# Session log – 2026-05-13

## Summary
Home problem pain bars: replaced one list-level ScrollTrigger + stagger with **per-row** `gsap.fromTo` + ScrollTrigger on each `li`, so each bar animates in from left/right only when that row enters the viewport.

## Changes
- Edited `src/components/sections/HomeProblemSection.jsx` — removed `useLayoutEffect` initial set; `fromTo` supplies off-screen start per bar

## Notes
- Even index: from `xPercent: -101`; odd: `101`. `start: 'top 88%'`, `toggleActions: play none none reverse`.
