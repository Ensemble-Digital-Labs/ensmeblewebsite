# Session log – 2026-06-12 (nav logo grace period)

## Summary
Fixed nav logo flicker on refresh and route changes by pinning the logo fully visible for 1 second whenever the page loads, restores from bfcache, or the route changes. Scroll-hide is suppressed during that grace window.

## Changes
- `src/components/FullscreenNav.jsx` — `armNavLogoGrace()` (1000ms), re-arms on `location.pathname` + `pageshow`; `navLogoGraceActive` forces `opacity-100` and disables opacity transition during grace
- `src/components/AnimatedBrandLogo.jsx` — `loading="eager"` when `priority` (nav logo)

## Notes
- After 1s, scroll-hide behavior resumes as before (logo fades while scrolling, returns when idle)
- `ensemble:scroll-ready` still extends the quiet window by 480ms without shortening an active grace period
