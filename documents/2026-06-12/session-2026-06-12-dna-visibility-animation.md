# Session log – 2026-06-12 (DNA visibility + animation)

## Summary
Made hero DNA helices brighter and more animated after photo tiles were removed from the hero.

## Changes
- `HomeHeroCinematicBackdrop.jsx` — faster spin, spine sway, vertical drift, traveling pulse on strands/rungs, brighter strokes/nodes, relaxed center fade, higher helix weights
- `src/index.css` — canvas opacity 0.96, lighter vignette, teal edge glow on wash, subtle wash pulse animation

## Notes
- Honors `prefers-reduced-motion` (canvas animation off; wash pulse disabled in CSS).
