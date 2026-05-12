# Session log – 2026-05-11

## Summary
Matched the **“Who we are”** band background to neighbors by removing full-bleed **radial-gradient overlays** that tinted `#050816` (teal on stats + parallax, rose on home-problem). All three sections now use the same flat base `bg-[#050816]` with no atmospheric wash.

## Changes
- `src/components/sections/ParallaxLayerShowcase.jsx` — removed teal radial overlay.
- `src/components/sections/HeroStatsTrustBand.jsx` — removed teal radial overlay.
- `src/components/sections/HomeProblemSection.jsx` — removed rose radial overlay.

## Notes
- Cards and the stats glass panel still carry their own depth; only the **page canvas** behind them is unified.
