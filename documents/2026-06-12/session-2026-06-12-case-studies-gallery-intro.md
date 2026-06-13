# Session log – 2026-06-12 (case studies gallery intro animation)

## Summary
Added DNA Capital `/companies`-style gallery entrance: cards spread inward, rise, and fade into focus on load; shorter replay on filter change; filters slide up after cards.

## Changes
- **`src/hooks/useCaseStudiesGalleryIntro.js`** — `easeIntro`, GSAP intro timeline (1.15s initial / 0.62s on filter), filter-change crossfade
- **`src/components/case-studies/CaseStudyPortfolioGallery.jsx`** — intro-driven spacing, lift, focus, opacity in `applyLayout`; blocks drag during intro
- **`src/pages/CaseStudies.jsx`** — filters anchor fade/slide on first paint
- **`src/styles/case-studies-portfolio.css`** — `.is-intro-active` pointer-events guard

## Notes
- Honors `prefers-reduced-motion` (intro skipped, layout immediate)
- Filter changes: gallery opacity crossfade + card intro replay (matches DNA Vue fade on carousel rebuild)

## Next steps
- Optional: tie intro start to global loader if case studies route gets a preloader
