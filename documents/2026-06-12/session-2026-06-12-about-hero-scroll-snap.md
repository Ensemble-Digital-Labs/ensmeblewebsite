# Session log – 2026-06-12 – About hero scroll snap fix

## Summary
Fixed About hero “snap” on refresh + immediate scroll. Root causes: delayed `forceScrollMainToTop` resetting user scroll at ~550ms, Lenis init overwriting early native scroll, and About hero parallax using window instead of `#main`.

## Changes
- **Updated** `src/lib/utils.js` — `hasUserScrolledMain`, `forceScrollMainToTop({ onlyIfNearTop })`
- **Updated** `src/app/layout.jsx` — delayed scroll-to-top skips if user already scrolled
- **Updated** `src/lib/locomotive.js` — preserve native scroll when Lenis attaches; skip forced top when user scrolled
- **Updated** `src/components/sections/AboutHero.jsx` — parallax waits for `ensemble:scroll-ready`, uses `#main` scroller, `fromTo` baseline

## Notes
- Initial route `useLayoutEffect` still forces top on first paint (correct for hard refresh at scroll 0)
