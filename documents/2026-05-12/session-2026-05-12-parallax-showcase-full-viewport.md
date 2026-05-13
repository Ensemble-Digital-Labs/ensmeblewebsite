# Session log – 2026-05-12

## Summary
Made `#parallax-showcase` a full-viewport-height section (`min-h-[100svh]`) with flex column layout and `my-auto` on the inner container so the block centers vertically when shorter than the viewport; content can still grow taller than one screen.

## Changes
- `src/components/sections/ParallaxLayerShowcase.jsx` — section + inner wrapper classes; JSDoc note.
