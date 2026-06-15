# Session log – 2026-06-14 (revert footer particle assemble)

## Summary

Removed the footer ENSEMBLE particle assembly effect per user request — footer returns to static background starfield / atmosphere only.

## Changes

- Deleted `src/components/FooterEnsembleParticleCanvas.jsx`
- Deleted `src/lib/footerEnsembleParticles.js`
- Updated `src/components/CinematicFooter.jsx` — removed particle canvas
- Updated `src/lib/dnaCapitalScrollPhases.js` — removed `footerAssemble` phase
- Updated `src/lib/dnaCapitalShaderHelix.js` — restored normal helix/star behavior at footer

## Notes

- Footer giant ENSEMBLE watermark + existing GSAP scrub reveal unchanged.
