# Session log – 2026-06-12 (DNA clone smoothness fix)

## Summary
Fixed glitchy DNA chain animation on `/dna-capital-clone`: gentler displacement shader, denser random particle sampling, scatter coords aligned with mesh transform, smoothed scroll/camera/pose interpolation, depth test + clamped point size, softer bloom.

## Changes
- `src/lib/dnaCapitalModelParticles.js` — random vertex sample up to 9k; scatter after center/scale; mipmapped displacement
- `src/lib/dnaCapitalShaderHelix.js` — slow UV-based displacement (no sin/cos jitter); smooth state lerping; pose/camera easing
- `src/lib/dnaCapitalScrollPhases.js` — cache section layout to reduce scroll jitter
- `src/components/dna-clone/DnaCapitalHelixCanvas.jsx` — pass deltaMs to render loop

## Notes
Reference Codrops tutorial uses mostly static vertices + slow group rotation; our prior shader stacked fast displacement scroll + trig which caused sparkle/flicker.
