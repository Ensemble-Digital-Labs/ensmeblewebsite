# Session log – 2026-06-14 (popart collage tilt angles)

## Summary
Restored PopArt tilt on collage layers — main photo + chart cards angle in on reveal and keep tilt during scroll float.

## Changes
- **`src/hooks/useHomePopArtMotion.js`** — `POPART_LAYER_ANGLES`; mask entrance eases into tilt; parallax preserves `rotation`
- **`src/index.css`** — removed `transform: none` on `is-popart-ready` (was flattening cards); stronger default tilts on main/top/bottom

## Angles
- Main: −1.75°
- Top card: −5°
- Bottom card: +4.5°
