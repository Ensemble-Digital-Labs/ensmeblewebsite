# Session log – 2026-06-12 (case studies card title label restore)

## Summary
Restored DNA-style “CLOVER HEALTH” label above centered cards: blue vertical line + uppercase client name, no longer clipped by carousel overflow.

## Changes
- **`CaseStudyGalleryCard.jsx`** — title row moved above link (in document flow); line before text
- **`case-studies-portfolio.css`** — in-flow title layout, slide `overflow: visible` after intro, focus-driven line height/opacity

## Notes
- Label fades in on the centered card via `--csp-focus` (matches DNA Capital behavior).
