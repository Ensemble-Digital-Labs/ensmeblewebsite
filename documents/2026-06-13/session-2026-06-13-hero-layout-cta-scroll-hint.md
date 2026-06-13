# Session log – 2026-06-13 (hero layout + scroll hint)

## Summary
Moved homepage hero headline up (top-aligned under nav), added CTAs + “Scroll to explore” stack, and matched `/experiments` ensemble hero layout.

## Changes
- Updated `HomeChapterHero.jsx` — top-aligned layout, scroll hint below CTAs
- Updated `index.css` — hero padding, scroll hint styles, flex-start alignment
- Updated `useHomeHeroEntrance.js` — animate scroll hint after CTAs
- Updated `DnaCapitalClonePage.jsx` + `dna-capital-clone-ensemble.css` — ensemble CTAs + top-aligned hero

## Notes
- Order: headline → 2 gradient CTAs → scroll hint line
- Scroll hint line uses same pulse animation as `/experiments` (`scaleY` + opacity loop)
- Laptop (1024px+): hero stack nudged down via `--home-hero-laptop-nudge` on helix-rail layout
