# Session log – 2026-06-12 (case studies horizontal gallery)

## Summary
Replaced the case studies grid with a DNA Capital `/companies`-style horizontal gallery: staggered tall cards, center-focus scaling, cyan/coral accent lines, drag + wheel scroll, and compact top filters.

## Changes
- **Created** `src/components/case-studies/CaseStudyPortfolioGallery.jsx` — horizontal track, center detection, drag/wheel/keyboard nav.
- **Created** `src/components/case-studies/CaseStudyGalleryCard.jsx` — tall panel cards with label, wordmark/logo, “Learn more →”.
- **Updated** `src/pages/CaseStudies.jsx` — header + gallery layout.
- **Updated** `src/components/case-studies/CaseStudyPortfolioFilters.jsx` — `variant="compact"` for top bar.
- **Updated** `src/styles/case-studies-portfolio.css` — gallery styles (replaced grid).

## Notes
- Center card shows large typography; side cards show thumbnail + smaller wordmark.
- Edge padding lets first/last cards scroll to center.
- `npm run build` passes.

## Next steps (optional)
- Pin gallery and map vertical page scroll → horizontal progress (full DNA Immersive Garden behavior).
- Real client logo SVGs instead of photo thumbnails on side cards.
