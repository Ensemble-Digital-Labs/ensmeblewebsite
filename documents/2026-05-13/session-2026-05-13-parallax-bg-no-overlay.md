# Session log – 2026-05-13 (Parallax bg — no overlay)

## Summary
Removed the navy gradient scrim and the reduced opacity on `#parallax-showcase` background art so `hero-bg-ensemble-02.png` displays full-strength with only `object-cover` (no tint layer on the image).

## Changes
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`.

## Notes
- Section shell still uses `bg-[#050816]` for any edge falloff; foreground copy relies on existing glass / type contrast over the art.
