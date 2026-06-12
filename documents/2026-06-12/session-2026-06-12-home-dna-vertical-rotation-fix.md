# Session log – 2026-06-12 (home DNA vertical rotation fix)

## Summary
Fixed home DNA ribbons rendering horizontal across the hero: removed erroneous `rotation.z = PI/2` that flipped the already-vertical dna-02.glb mesh flat. Uses DNA Capital clone edge tilt instead.

## Changes
- `src/lib/homeDnaWebgl.js` — `applyVerticalRibbonPose` matches clone rotations; tighter segment overlap

## Notes
dnacapital.com ribbon is vertical in model space; Z=90° mapped Y→X and produced horizontal waves behind headline.
