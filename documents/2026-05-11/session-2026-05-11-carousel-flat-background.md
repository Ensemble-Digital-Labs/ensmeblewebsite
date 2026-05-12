# Session log – 2026-05-11

## Summary
Aligned the **Selected Work / “Built by Ensemble.”** (`Carousel3D`) canvas with the rest of Home: default (no hero bitmap) backdrop is **flat `#050816`** instead of glow/mesh/grid/vignette + top tint stack. Removed the extra full-width gradient overlay that sat on top of both branches. Optional hero `backgroundImage` path keeps photo + read-through gradient and a lighter grid only (no teal radial wash).

## Changes
- `src/components/sections/Carousel3D.jsx` — simplified background layers as above.

## Notes
- Unused CSS classes (`.carousel-3d-bg-glow`, mesh, vignette) remain in `index.css` for now; harmless. Remove later if you want a smaller stylesheet.
