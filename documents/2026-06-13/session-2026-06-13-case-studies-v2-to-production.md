# Session log – 2026-06-13 (case-studies v2 → production)

## Summary
Promoted case-studies-v2 carousel, cards, starfield canvas, and CSS to production `/case-studies`.

## Changes
- `src/pages/CaseStudies.jsx` — uses V2 canvas + gallery + v2 stylesheet; keeps mobile page heading
- `src/components/case-studies-v2/CaseStudyPortfolioGalleryV2.jsx` — intro replay on both gallery routes
- `src/styles/case-studies-portfolio-v2.css` — comment updated (shared production + sandbox)

## Update (gallery title fix — editorial override)
- Excluded gallery h1 from global editorial 400 weight rule; sizes in ensemble-editorial-type.css
- Portfolio CSS imported globally from main.jsx; title nudged up in nav
