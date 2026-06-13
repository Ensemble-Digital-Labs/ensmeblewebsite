# Session log – 2026-06-12 (case studies helix bottom-right)

## Summary
Re-added the DNA helix on `/case-studies` as a **subtle bottom-right corner accent** only — not full-screen/center. Masked WebGL layer so the carousel stays clear.

## Changes
- **`src/lib/homeDnaHelix.js`** — `CASE_STUDIES_DNA_HELICES` → single helix at `cx: 0.9`, `y0–y1: 0.48–0.98`
- **`src/components/case-studies/CaseStudiesDnaCanvas.jsx`** — lower opacity (`0.52`), viewport doc height, `case-studies-portfolio-helix` class
- **`src/pages/CaseStudies.jsx`** — remounted `CaseStudiesDnaCanvas`
- **`src/styles/case-studies-portfolio.css`** — corner radial mask on helix webgl/scrim; disabled full wash

## Notes
- User request parsed as “helix on the right bottom corner” after removing center-dominating helix.
- Build to verify.
