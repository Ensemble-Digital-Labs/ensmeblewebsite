# Session log – 2026-06-12 (home DNA continuous + background)

## Summary
Fixed discontinuous DNA blobs and flat black background on home: particles now sample the original continuous helix path; WebGL renders transparent over wash layer (removed bloom composer).

## Changes
- `src/lib/homeDnaHelix.js` — `buildHelixParticleData()` from legacy path sampling
- `src/lib/homeDnaWebgl.js` — orthographic document-space particles, no GLB tiling
- `src/lib/dnaParticleCore.js` — `HOME_DNA_PARTICLE_VERTEX` with `u_sectionTop`
- `src/components/home/HomePageDnaCanvas.jsx` — layer order: wash → WebGL → scrim
- `src/index.css` — transparent canvas, z-index stacking

## Notes
Root cause: stacked dna-02.glb ribbon segments had gaps; EffectComposer cleared opaque black over gradient wash.
