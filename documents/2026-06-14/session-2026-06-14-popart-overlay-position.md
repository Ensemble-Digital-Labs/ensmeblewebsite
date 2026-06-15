# Session log – 2026-06-14 (popart overlay icon position)

## Summary
Repositioned PopArt collage overlay icons so they sit mostly beside the main photo with only a slight edge overlap, not stacked heavily on top.

## Changes
- `src/index.css` — negative `left`/`right` offsets on card overlays; slightly smaller cards; `overflow: visible` + horizontal padding on stack; removed md rule that pulled icons inward

## Notes
- Brand and expertise sections share `HomePopArtVisualStack`.
