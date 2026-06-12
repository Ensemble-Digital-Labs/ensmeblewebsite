# Session log – 2026-06-12 (home WebGL DNA upgrade)

## Summary
Upgraded homepage edge DNA from 2D canvas helices to WebGL `dna-02.glb` particle ribbons (same Codrops pipeline as DNA Capital clone), dual left/right placement with Ensemble cyan/teal palette.

## Changes
- Created `src/lib/dnaParticleCore.js` — shared particle shaders + material factory
- Created `src/lib/homeDnaWebgl.js` — dual edge ribbons, scroll-linked drift, subtle bloom
- Updated `src/components/home/HomePageDnaCanvas.jsx` — WebGL mount (replaces 2D canvas)
- Updated `src/lib/dnaCapitalModelParticles.js` — cache by maxPoints (home 6500, clone 14000)
- Updated `src/lib/dnaCapitalShaderHelix.js` — uses shared `dnaParticleCore`

## Notes
- `homeDnaHelix.js` kept as legacy reference; home route no longer imports it
- Transparent WebGL over existing wash/scrim CSS layers
- Left ribbon hidden below 480px for mobile clarity

## Next steps
- Visual QA at 320–1440px; tune edge opacity/scale if ribbons compete with hero type
