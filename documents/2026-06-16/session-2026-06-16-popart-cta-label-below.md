# Session log – 2026-06-16

## Summary
Moved PopArt “Our story” CTA label below the plus orb with downward char reveal; reserved bottom space so label is visible and layout does not jump on hover.

## Changes
- **`src/components/home/HomePopArtCircleCta.jsx`** — Orb first; GSAP `yPercent` reveal (down) instead of horizontal RTL.
- **`src/index.css`** — Label centered under button; CTA padding/min-height for label slot.
