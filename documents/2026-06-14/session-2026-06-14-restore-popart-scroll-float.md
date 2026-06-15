# Session log – 2026-06-14 (restore popart scroll float)

## Summary
Restored layered scroll parallax (“floating” PopArt motion) after mask entrance completes; was weakened and starting too late.

## Changes
- **`src/hooks/useHomePopArtMotion.js`** — `bindPopArtStackParallax()` with original scrub depths; runs in entrance `onComplete` (desktop lg+ only)

## Notes
- Mask-in sequence unchanged (main → top card → bottom card).
- Float = scroll-linked `y`/`x` drift while scrolling through section, not entrance fly-in.
