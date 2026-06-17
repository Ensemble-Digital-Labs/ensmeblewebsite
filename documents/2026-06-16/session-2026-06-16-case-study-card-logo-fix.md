# Session log – 2026-06-16 (case study card logo visibility)

## Summary
Fixed case study gallery cards so client brand images show centered in the card panel instead of tiny hidden placeholders.

## Changes
- `src/styles/case-studies-portfolio.css` — only hide logos on non-v2 cards; allow `--has-logo` cards through
- `src/styles/case-studies-portfolio-v2.css` — larger centered logo wrap, cover crop, removed white invert filter
- `src/components/case-studies-v2/CaseStudyGalleryCardV2.jsx` — logo wrap + fallback to `study.image`

## Notes
- Partner assets are website mockups; cards crop top-center to emphasize branding/header area.
