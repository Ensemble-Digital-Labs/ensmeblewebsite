# Session log – 2026-06-12 (Hero cinematic backdrop)

## Summary
Added ABL-inspired cinematic hero background: warm rim-light gradients + soft animated network nodes (Ensemble teal/coral, not amber clone). Respects reduced motion via static gradients only.

## Changes
- Created `src/components/home/HomeHeroCinematicBackdrop.jsx`
- Updated `HomeChapterHero.jsx` — mounts backdrop behind copy
- Added `.home-hero-cinematic-backdrop__*` styles in `index.css`

## Notes
- Alternative paths: hero photo/video in `ensemble-2026/home/hero/hero-background.webp`, or full Three.js molecule for maximum fidelity
- Canvas layer uses `mix-blend-mode: screen` for glow; tune opacity in CSS if too strong

---

## Update — full viewport DNA backdrop

### Summary
Backdrop moved to `fullBleedBackdrop` so it covers entire hero section (100svh). Canvas now draws helix strands, base-pair links, and bokeh orbs for clearer DNA/molecular read.

### Changes
- `HomeChapterHero.jsx` — `fullBleedBackdrop`, `min-h-[100svh]`
- `HomeHeroCinematicBackdrop.jsx` — helix + bokeh layers, full-bleed sizing
- `index.css` — hero section isolation + inner flex fill

---

## Update — readable DNA double helices

### Summary
Replaced bubble/bokeh layers with proper double-helix geometry: two backbone strands, base-pair rungs every segment, depth-sorted drawing, four vertical helices across viewport.

### Changes
- Rewrote `HomeHeroCinematicBackdrop.jsx` helix sampler + draw passes
- Removed random bokeh/scatter nodes; removed `mix-blend-mode: screen` on canvas

---

## Update — angled DNA helices

### Summary
Each helix axis now tilts in 3D (`axisTilt`, `planeRoll`) so columns lean diagonally instead of straight vertical.

### Changes
- `HomeHeroCinematicBackdrop.jsx` — tilted axis sampling per helix
