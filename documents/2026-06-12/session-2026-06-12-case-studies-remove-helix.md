# Session log – 2026-06-12 (remove case studies helix)

## Summary
Removed the WebGL DNA helix from `/case-studies`. It had been added intentionally to mirror DNA Capital’s `/companies` page; the gallery now uses only the shared hero atmosphere gradient (same as other marketing pages).

## Changes
- **`src/pages/CaseStudies.jsx`** — unmounted `CaseStudiesDnaCanvas`

## Notes
- `CaseStudiesDnaCanvas.jsx` and `CASE_STUDIES_DNA_HELICES` remain in the repo if a subtler background is needed later.
- `HomeAtmosphereCanvas` in `layout.jsx` still provides the plum/navy gradient on this route.

## Next steps
- None unless user wants a very subtle side helix (lower opacity / off-center only).
