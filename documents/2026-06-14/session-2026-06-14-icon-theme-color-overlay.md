# Session log – 2026-06-14 (icon theme color overlay)

## Summary
Added site-themed background and color wash overlays on contextual icons — navy void base with lavender / rose / peach DNA particle gradients matching the homepage palette, plus a soft-light wash over the neon art.

## Changes
- `src/index.css` — `--ensemble-icon-theme-bg`, `--ensemble-icon-theme-wash`, `--ensemble-icon-theme-particles`; layered styles for PopArt cards, icon shells, and frames
- `src/components/ui/ContextualIcon.jsx` — `ensemble-contextual-icon-shell` with theme bg + wash layers

## Notes
- Screen blend still removes baked-in PNG black; themed gradient shows through instead of raw file background.
- Frames own the theme layers; inner shell bg/wash hidden to avoid double stacking.
