# Session log – 2026-05-12

## Summary
Removed visual overlays from the hero outcomes bottom bar so `ambient-layer-01.png` reads clearly: dropped `.hero-outcomes-marble-bar` box-shadow, grid hairline wash, and cell `bg-zinc-950/35` + `backdrop-blur`.

## Changes
- `src/index.css` — `.hero-outcomes-marble-bar` no `box-shadow`.
- `src/components/sections/HeroStatsTrustBand.jsx` — grid `bg-transparent`; stat + trust cells no tinted/blurred panels.

## Notes
- `gap-px` still shows a sliver of parent background between columns; no extra tint layer.
