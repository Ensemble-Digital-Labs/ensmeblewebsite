# Session log – 2026-06-12 (nav logo user-intent scroll)

## Summary
Replaced the 1s grace-period workaround with user-intent gating: the logo still fades during real user scroll, but ignores programmatic Lenis/`scrollTo(0)` bursts on refresh and route change. Fixed CSS `transition: all 1s` on `.nav .logo` that was slowing opacity changes.

## Changes
- `src/components/FullscreenNav.jsx` — scroll-hide only runs after wheel/touch/keyboard/pointer on `#main`; clears intent when scroll settles; resets on route change; single scroll source (Lenis OR native `#main`)
- `src/index.css` — `.nav .logo` transition limited to `letter-spacing` (opacity uses Tailwind 300ms)

## Notes
- Scroll-hide UX unchanged for actual scrolling
- Removed `navLogoGraceActive` / quiet-window timers
