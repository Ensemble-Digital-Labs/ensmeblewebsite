# Session log – 2026-05-15 (home atmosphere + route fix)

## Summary
Fixed home showing a **flat white** background and feeling “stuck on home” after navigating from other pages. Root cause: `HomeAtmosphereCanvas` ran its one-shot `useEffect` before `#home-scroll-root` existed (route exit animation), so the scroll gradient never bound. Also simplified `AnimatedRoutes` to key on `location.pathname` directly.

## Changes
- `src/components/home/HomeAtmosphereCanvas.jsx` — retry until `#home-scroll-root` exists; hero scene as inline fallback style; re-init when returning to `/`
- `src/app/AnimatedRoutes.jsx` — removed frozen `displayLocation` state
- `src/index.css` — `#main:has(#home-scroll-root)` gradient fallback

## Notes
- White “cards” in the verticals band are intentional (`home-scene-surface-light`); they need the scrubbed atmosphere behind them, not a white `#main`.
