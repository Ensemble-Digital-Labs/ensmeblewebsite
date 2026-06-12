# Session log – 2026-06-12 (home DNA vertical + legacy colors)

## Summary
Adjusted homepage WebGL DNA to match previous layout: vertical downward edge chains, scroll-locked tiling, legacy cyan/warm palette — WebGL particles only, not DNA Capital purple theme.

## Changes
- `src/lib/homeDnaWebgl.js` — vertical segments, 6%/94% edge X, sectionTop scroll attach, modular Y tiling
- `src/lib/dnaParticleCore.js` — HOME colors: `#38e1f5` cyan, `#ff8c64` warm, `#78f0ff` rim
- `src/components/home/HomePageDnaCanvas.jsx` — pass viewWidth to render

## Notes
Uses same `dna-02.glb` particle method as clone; orientation/scroll/colors match old `homeDnaHelix.js` behavior.
