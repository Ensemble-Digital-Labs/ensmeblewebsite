# Session log – 2026-05-11

## Summary
Fixed **wheel scroll dying over the footer** in embedded previews (e.g. Cursor Simple Browser): the cinematic footer is `position: fixed` + full viewport height, so it sat on top of `#main` and intercepted events. Footer shell is now **`pointer-events-none`**; CTA + bottom bars use **`pointer-events-auto`** so links/buttons still work and scroll reaches Lenis / `#main`.

## Changes
- `src/components/CinematicFooter.jsx` — `pointer-events-none` on `<footer>`, `pointer-events-auto` on the two interactive column wrappers.
