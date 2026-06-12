# Session log – 2026-06-12 (DNA backdrop composition)

## Summary
Reorganized hero DNA helices for a more aesthetic, editorial layout: curved spines framing the headline instead of four parallel vertical columns.

## Changes
- `HomeHeroCinematicBackdrop.jsx` — asymmetric helix placement (left/right accents + two faint upper/lower whispers), curved spine via `cxDrift`/`cxWave`, center fade for headline clarity, softer node density on background strands
- `src/index.css` — tuned wash/vignette and lowered canvas opacity for calmer backdrop

## Notes
- Primary accent on right edge; left column supports; center ~32% width stays visually quiet.
- Background helices skip node rendering when `weight < 0.4`.
