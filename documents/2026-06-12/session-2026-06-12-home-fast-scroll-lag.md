# Session log – 2026-06-12 (home fast-scroll lag)

## Summary
Reduced post-refresh scroll lag on the home page by enabling snappier Lenis settings for `/`, initializing scroll sooner, binding GSAP reveals on `scroll-ready` instead of a fixed 800ms wait, and throttling DNA canvas remeasure on scroll.

## Changes
- `src/app/layout.jsx` — `useLocomotiveScroll(..., { homeDeck: isHome })`
- `src/lib/locomotive.js` — rAF init (was 500ms delay); home `smoothWheel: false`, shorter duration/lerp
- `src/hooks/useHomeSequentialReveals.js` — primary bind on `ensemble:scroll-ready`; 1200ms failsafe only
- `src/components/home/HomePageDnaCanvas.jsx` — rAF-throttled `measurePage` on scroll

## Notes
- Lag on hard refresh + fast scroll was caused by stacked delays (500ms Lenis + 800ms reveals), heavy 1.4s wheel smoothing on home, and ScrollTrigger/DNA work firing during scroll before systems were ready.
- Other pages keep smooth wheel + longer duration.
