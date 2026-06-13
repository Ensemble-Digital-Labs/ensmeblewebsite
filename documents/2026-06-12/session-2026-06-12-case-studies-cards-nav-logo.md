# Session log – 2026-06-12 (case studies cards vs nav logo)

## Summary
Fixed inactive gallery cards / carousel wheel interaction obscuring the Ensemble nav logo on `/case-studies`.

## Changes
- **`src/components/FullscreenNav.jsx`** — disable scroll-fade logo logic on case studies gallery; logo always full opacity there
- **`src/components/case-studies/CaseStudyPortfolioGallery.jsx`** — lower slide z-index stack (no longer 120)
- **`src/styles/case-studies-portfolio.css`** — clip carousel below nav band; nudge slides down; nav brand stacking

## Notes
- Carousel horizontal wheel was triggering global scroll-fade and hiding the logo.
