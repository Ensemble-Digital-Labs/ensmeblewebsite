# Session log – 2026-06-14 (popart image mask sequence)

## Summary
Collage layers now mask/fade in strict sequence: main photo first, then top chart card, then bottom chart card — before copy reveals.

## Changes
- **`src/hooks/useHomePopArtMotion.js`** — GSAP `clipPath` + opacity wipe per layer; timeline uses `'>'` so each step starts after the previous ends
- **`src/index.css`** — layer `will-change` + reduced-motion clears clip-path

## Reveal order (images)
1. Large main image — vertical mask down + fade
2. Top small card — mask up + fade (after main)
3. Bottom small card — mask up + fade (after top)
