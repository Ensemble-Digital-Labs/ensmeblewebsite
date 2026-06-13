# Session log – 2026-06-12 – About page revert

## Summary
Reverted `/about` to the last committed version per user request. Removed the incomplete Lama-inspired redesign (cream bands, mask reveals, new team layout).

## Changes
- **Restored** `src/pages/About.jsx` — `ParallaxDepth` + `BackgroundPathsParallaxLayer` wrapper, original section order
- **Restored** `src/components/sections/MissionValues.jsx` — glass 3-column card grid
- **Restored** `src/components/sections/Team.jsx` — circular avatars + `SectionHeading`
- **Deleted** `src/styles/about-page.css`
- **Deleted** `src/hooks/useAboutPageMotion.js`

## Notes
- `AboutHero.jsx` was unchanged from HEAD
