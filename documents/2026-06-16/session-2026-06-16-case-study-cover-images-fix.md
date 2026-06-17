# Session log – 2026-06-16 (case study card cover images fix)

## Summary
Fixed case studies gallery cards to show full client cover images instead of tiny inverted logo marks.

## Changes
- `CaseStudyGalleryCardV2.jsx` — uses `study.image` as full-panel cover art
- `case-studies-portfolio-v2.css` — cover fill styling, gradient overlay, panel overflow
- `case-studies-portfolio.css` — explicit display rule for cover images on v2 slides

## Notes
- Partner assets are full project covers; previous logo + invert filter rendered as white slivers.
