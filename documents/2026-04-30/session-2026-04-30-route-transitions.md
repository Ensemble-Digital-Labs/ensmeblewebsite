# Session log – 2026-04-30

## Summary
Added cross-route page transitions using Framer Motion (`AnimatePresence` + `motion.div`) so navigating between site pages fades the outgoing view and brings in the next with a short vertical drift. Respects reduced motion (near-instant crossfade).

## Changes
- Created `src/app/AnimatedRoutes.jsx` — frozen `displayLocation` pattern with `Routes location={displayLocation}` so the exiting screen keeps the previous route during the exit animation.
- Updated `src/App.jsx` — render `AnimatedRoutes` inside `Layout` instead of inline `Routes` / `Route` list.

## Notes
- `mode="wait"` runs exit before enter to avoid overlapping content.
- `initial={false}` avoids a transition on the very first paint of the app.

## Next steps
- If Locomotive/ScrollTrigger feel late after fast navigation, consider aligning the existing layout pathname `useEffect` delay with the transition duration (~380ms).

---

## Update — hero (`#page1`) no longer pinned

### Summary
Disabled ScrollTrigger `pin` for the home hero when `firstScreenHero: true`, so the first section scrolls normally instead of sitting in a `pin-spacer` with no strong scroll-driven payoff (mount-time hero lines already animate).

### Changes
- `src/lib/cinematicSectionReveal.js` — `pin` / `pinSpacing` / `anticipatePin` off for first-screen hero.
- `src/index.css` — removed obsolete `#main .pin-spacer:has(#page1)` background rule.
