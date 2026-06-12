# Session log – 2026-06-12 (scroll + logo flicker fix)

## Summary
Reverted the home-specific Lenis changes that broke scrolling after refresh. Stopped top-left logo flicker during Lenis/ScrollTrigger init bursts, and added hysteresis to the left chapter rail visibility.

## Changes
- `src/app/layout.jsx` — removed `homeDeck: isHome` (restored default Lenis)
- `src/lib/locomotive.js` — restored 500ms init + original duration options; added `cancelled` guard
- `src/components/FullscreenNav.jsx` — quiet window on load/`scroll-ready` so logo does not fade on programmatic scroll
- `src/components/home/HomeSectionIndex.jsx` — hysteresis for `pastHero` rail show/hide
- `src/hooks/useHomeSequentialReveals.js` — 800ms failsafe restored alongside `scroll-ready`

## Notes
- Prior attempt (`smoothWheel: false` on home + rAF init) caused scroll to stop working on refresh.
- Logo flicker was `navLogoScrollIdle` reacting to init-time `scrollTo(0)` / `ScrollTrigger.refresh` events.
