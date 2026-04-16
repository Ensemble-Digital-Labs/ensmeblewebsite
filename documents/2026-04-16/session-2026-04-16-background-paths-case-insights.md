# Session log – 2026-04-16 (BackgroundPaths — Case Studies & Insights)

## Summary

Ported the framer-motion “floating paths” SVG background to Vite/React as `BackgroundPathsParallaxLayer`, tuned for Ensemble (brand-primary strokes, soft gradient base, hairline accent). Wired it as `ParallaxDepth` `layer1` on the Case Studies and Insights pages. Respects `prefers-reduced-motion` via `useReducedMotion` (static paths when reduced).

## Changes

- Added `src/components/ui/BackgroundPaths.jsx` — `FloatingPaths`, export `BackgroundPathsParallaxLayer`.
- `src/pages/CaseStudies.jsx` — `layer1={<BackgroundPathsParallaxLayer />}`.
- `src/pages/Insights.jsx` — same.

## Notes

- Full-screen hero variant from the snippet (animated headline + shadcn `Button`) was not added; only the path field is used behind existing page content.
