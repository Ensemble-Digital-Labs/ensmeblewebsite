# Session log – 2026-06-12 (home DNA Capital vertical ribbons)

## Summary
Home edge DNA now uses dna-02.glb ribbons like DNA Capital: vertical orientation, overlapping tiles for continuity, scroll-locked. Page wash/background CSS untouched; WebGL stays fully transparent.

## Changes
- Rewrote `src/lib/homeDnaWebgl.js` — GLB particles, 8 segments/side, 88% overlap, DNA Capital purple/blue palette
- Updated `src/components/home/HomePageDnaCanvas.jsx` — async GLB load, pass time for slow spin

## Notes
Replaces helix-path particle sampling; background layers (wash + scrim) unchanged.
