# Session log – 2026-06-12 (case studies intro slower smoother)

## Summary
Slowed and smoothed the left-edge card expand intro: longer GSAP timeline, sine.inOut easing, smootherstep reveal curve, gentler stagger overlap, softer opacity/typography fade.

## Changes
- **`useCaseStudiesGalleryIntro.js`** — page intro 2.15s, filter 1.15s, `easeIntroReveal`, `sine.inOut`; slower filters fade
- **`CaseStudyPortfolioGallery.jsx`** — reveal uses smootherstep; wider stagger overlap

## Notes
- Total page-entry choreography ~2.3s including delay; filters enter ~1s after cards start
