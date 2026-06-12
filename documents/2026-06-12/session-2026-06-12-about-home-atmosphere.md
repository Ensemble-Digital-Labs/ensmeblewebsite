# Session log – 2026-06-12 (about / home atmosphere)

## Summary
Aligned `/about` with the homepage color system: hero plum atmosphere canvas, parallax paths, transparent sections, white typography, and glass cards.

## Changes
- **Created** `src/lib/atmosphericRoutes.js` — shared `/`, `/case-studies`, `/blog`, `/about` detection
- **Updated** `src/app/layout.jsx`, `HomeAtmosphereCanvas.jsx`, `CinematicFooter.jsx` — use `atmosphericRoutes`
- **Updated** `src/pages/About.jsx` — page-level `ParallaxDepth` + dark paths
- **Updated** `AboutHero.jsx`, `MissionValues.jsx`, `Team.jsx`, `WhyChooseUs.jsx` — dark/transparent surfaces

## Notes
- Removed per-section light `ParallaxDepth` backdrops that blocked the fixed atmosphere layer.
