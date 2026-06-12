# Session log – 2026-06-12 (DNA outlier particle fix)

## Summary
Fixed stray particles with weird motion on the DNA chain: removed random subsampling and per-vertex displacement, deduped seam vertices, use all mesh vertices with even stride, static Codrops-style shader (group rotation only).

## Changes
- `src/lib/dnaCapitalModelParticles.js` — merge all GLB meshes, dedupe vertices, deterministic attrs, radial scatter
- `src/lib/dnaCapitalShaderHelix.js` — static vertex shader (no displacement texture)

## Notes
Outliers were random vertex picks + UV-based displacement on seam duplicates — reference tutorial keeps vertices static and rotates the whole Points object.
