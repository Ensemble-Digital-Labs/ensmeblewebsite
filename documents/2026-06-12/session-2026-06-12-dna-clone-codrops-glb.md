# Session log – 2026-06-12 (DNA clone Codrops GLB rebuild)

## Summary
Rebuilt `/dna-capital-clone` WebGL using the [Codrops DNA Capital tutorial](https://tympanus.net/codrops/2021/10/18/replicating-the-particles-animation-from-dna-capital-with-three-js/) approach: load `dna-02.glb`, sample mesh vertices as particles, displacement texture in vertex shader. Kept scroll phases, bloom, stars, wave grid, and hero intro.

## Changes
- Added `public/assets/dna-clone/dna-02.glb` and `displacement-texture.jpg` (from dnacapital.com)
- Created `src/lib/dnaCapitalModelParticles.js` — GLTFLoader + DRACOLoader, vertex sampling (~3000 particles), scatter attrs
- Rewrote `src/lib/dnaCapitalShaderHelix.js` — Codrops-style shaders with displacement + UV rim gradient; async create
- Updated `src/components/dna-clone/DnaCapitalHelixCanvas.jsx` — async GLB init
- Deleted unused `src/lib/dnaCapitalParticleHelix.js`

## Notes
- Particles subsampled from full mesh for airy density matching reference
- DRACO decoder loaded from Google CDN (browser only)
- Procedural ribbon fallback removed; stars/wave still render if GLB fails

## Next steps
- Tune particle count, displacement strength, and right-side framing after visual QA
- Optional preloader before hero timeline
