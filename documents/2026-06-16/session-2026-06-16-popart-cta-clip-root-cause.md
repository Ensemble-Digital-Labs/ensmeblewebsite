# Session log – 2026-06-16

## Summary
Fixed “Our story” label sliced in half: removed `label-clip` overflow box whose `em` height used parent 16px font while text was ~2.5rem.

## Changes
- **`src/components/home/HomePopArtCircleCta.jsx`** — Direct label animate with 5px `y` + opacity (no percent clip).
- **`src/index.css`** — Removed `.home-popart-circle-cta__label-clip`.
