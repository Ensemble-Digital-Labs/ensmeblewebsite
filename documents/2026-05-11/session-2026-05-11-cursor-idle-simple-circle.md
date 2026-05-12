# Session log – 2026-05-11

## Summary
Default custom cursor is now a **single high-contrast circle** (teal fill, white ring, dark + growth halo) instead of the old multi-layer HUD. Labeled states unchanged.

## Changes
- `src/components/MovingCircle.jsx` — idle state renders `cursor-brand__idle` only; wrapper uses `cursor-brand--idle` vs `cursor-brand--labeled`.
- `src/index.css` — new `.cursor-brand__idle` / `.cursor-brand--idle`; removed glow, orbit, brackets, ring, dot, and their keyframes; trimmed reduced-motion cursor overrides.
