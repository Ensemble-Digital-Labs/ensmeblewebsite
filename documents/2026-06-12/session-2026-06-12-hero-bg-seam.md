# Session log – 2026-06-12 (hero background seam)

## Summary
Removed the hero’s opaque gradient wash so the fixed home atmosphere canvas shows through consistently, eliminating the visible color cutoff between the hero and the brand section below.

## Changes
- `src/index.css` — hero wash is accent-only (no solid linear gradient); softened vignette (no bottom dark band); `--home-atmo-base1/base2` tokens on `.home-influx-deck`; transparent `#home-hero` background
- `HomeChapterHero.jsx` — `DeckMeshBackdrop` opacity matches other chapters

## Notes
- Page base color comes from `HomeAtmosphereCanvas` (`#14122a` → `#221c4a` at scroll top), same as `HOME_ATMOSPHERE_SCENES[0]`.

---

## Update — DNA visibility after transparent hero

Boosted helix stroke/node contrast in `HomeHeroCinematicBackdrop.jsx`, canvas opacity to `1`, and a subtle left/right edge scrim on the wash so DNA reads clearly on the lighter atmosphere without restoring the opaque hero gradient.

---

## Update — mobile DNA V-shape

On viewports under 1024px, `axisTilt` / `planeRoll` now scale to zero by 480px so edge helices stay vertical columns instead of converging into a V.
