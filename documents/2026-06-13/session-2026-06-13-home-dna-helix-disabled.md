# Session log – 2026-06-13 (disable home DNA helix)

## Summary
Removed the double-helix DNA chain from the homepage while preserving all WebGL code for potential reuse later.

## Changes
- **`src/lib/homeDnaFeature.js`** — `HOME_PAGE_DNA_HELIX_ENABLED = false` feature flag.
- **`src/pages/Home.jsx`** — conditionally mounts `HomePageDnaCanvas` when flag is true.
- **`src/components/home/HomePageDnaCanvas.jsx`** — doc note pointing to the flag.

## Notes
- Unchanged: `homeDnaHelix.js`, `homeDnaWebgl.js`, `homeDnaIntro.js`, `HomePageDnaCanvas.jsx`, case-studies DNA canvas, `/experiments`.
- Re-enable: set `HOME_PAGE_DNA_HELIX_ENABLED = true` in `homeDnaFeature.js`.
