# Session log – 2026-06-12 (hero seam + softer DNA)

## Summary
Removed hero-only backdrop layers that caused a hard edge at 100vh, softened the Story section grid fade-in, and upgraded page DNA with ambient bubbles + smoother curved strands.

## Changes
- `HomeChapterHero.jsx` — no local cinematic/mesh backdrop (page canvas + atmosphere only)
- `HomeDeckSectionShell.jsx` — backdrop sections use `overflow-y-visible`
- `src/index.css` — page DNA wash, brand grid top fade, transparent section backgrounds
- `HomePageDnaCanvas.jsx` — global wash layer
- `src/lib/homeDnaHelix.js` — ambient bubbles, quadratic strand smoothing, denser segments
