# Session log – 2026-06-14 (icon screen blend)

## Summary
Icons still looked like square black patches because PNGs ship with opaque dark backgrounds (not transparent). Applied `mix-blend-mode: screen` so dark pixels drop out and neon glow merges with the site gradient; added soft radial edge masks and removed borders/shadows on overlay cards.

## Changes
- `src/index.css` — `.ensemble-contextual-icon--blend`, feathered masks on frames and PopArt contextual cards
- `HomePopArtVisualStack.jsx` — no border/shadow on contextual overlays; blend class on images
- `ContextualIcon.jsx` — blend mode on all contextual icons; frame border removed
- `ServiceVerticalCard.jsx` — removed frame drop shadow

## Notes
- Ultimate long-term fix: re-export icons with **transparent** backgrounds. Screen blend is the CSS workaround for neon-on-dark raster assets.
- Works best on dark sections (homepage void `#050816` + purple mesh).
