# Session log – 2026-06-12 (case study detail dark background)

## Summary
Restyled case study detail pages to use the same dark atmospheric shell as `/case-studies`, About, and Blog — fixing the light cream/lavender background mismatch.

## Changes
- **`src/pages/CaseStudyDetail.jsx`** — Single `ParallaxDepth` + `BackgroundPathsParallaxLayer` (dark); white/cyan typography; glass metric cards; removed light `bg-bg-primary` section bands.

## Notes
- Hub (`CaseStudies.jsx`) was already dark; only detail route needed the fix.
- `/case-studies/:slug` already in `atmosphericRoutes` for `HomeAtmosphereCanvas`.
