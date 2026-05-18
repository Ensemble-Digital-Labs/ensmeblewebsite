# Session log – 2026-05-15

## Summary
Removed unused `public/models/ensemble_3d_growth_chart` Wavefront assets (.obj, .mtl, README). Nothing in `src` referenced these paths, so they were dead weight and could confuse local setup.

## Changes
- Deleted `public/models/ensemble_3d_growth_chart/*`
- Removed empty `public/models` tree if no other files remained

## Notes
- If you add a Three.js (or similar) scene later, restore models under `public/` and wire loaders in the relevant component.
