# Session log – 2026-05-12

## Summary
Aligned home and footer CTAs with the hero mobile primary treatment (`growthPrimaryHero` + trailing arrow): new `hero` variant on `StandardCTA`, shared `growthHeroCtaArrow` export, and updates across outcomes band, carousel, roadmap, share form submit, and cinematic footer links.

## Changes
- `src/lib/growthCtaClasses.js` — added `growthHeroCtaArrow`.
- `src/components/StandardCTA.jsx` — `variant="hero"` renders label + arrow like `HeroScrollExpand`.
- `src/components/sections/HeroStatsTrustBand.jsx` — outcomes CTA uses `StandardCTA` hero; removed raw `Link`.
- `src/components/sections/Carousel3D.jsx` — `#disc-btn` uses hero variant.
- `src/components/sections/HomeRoadmapSection.jsx` — primary + secondary both hero variant; layout wrapper for stacked/side-by-side.
- `src/components/sections/ShareExperienceSection.jsx` — submit uses `growthPrimaryHero` + arrow.
- `src/components/CinematicFooter.jsx` — main and legal links use gradient hero pills + arrow (magnetic behavior preserved).

## Notes
- Legal row uses slightly smaller type via `text-sm sm:text-base` on top of hero padding.

## Next steps
- If footer feels heavy with six gradient pills, consider reverting legal row to outline or glass in a follow-up.
