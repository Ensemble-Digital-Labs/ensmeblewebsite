# Session log – 2026-06-13 (case studies → page footer fix)

## Summary
Fixed footer disappearing after navigating away from `/case-studies`. The gallery uses native `#main` scroll and hides the footer; on exit Lenis re-inits late and footer ScrollTrigger scrub left content at opacity 0.

## Changes
- **`src/lib/locomotive.js`** — destroy stale Lenis on cleanup; kill `#main` ScrollTriggers when leaving native gallery scroll; always re-init Lenis (no skip-if-exists).
- **`src/components/CinematicFooter.jsx`** — show footer immediately on route change; defer scrub until `ensemble:scroll-ready`; Lenis resize + safety visible fallback.
- **`src/app/layout.jsx`** — refresh Lenis/ScrollTrigger after leaving gallery routes.

## Notes
- Case studies gallery still intentionally omits footer while on `/case-studies`.
- `npm run build` passes.
