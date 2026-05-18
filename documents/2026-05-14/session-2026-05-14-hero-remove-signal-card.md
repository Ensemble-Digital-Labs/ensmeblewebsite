# Session log – 2026-05-14

## Summary
Removed the home hero **Signal** glass card (`HeroSignalExpandable` — stats, Details expander) so the hero matches the art-led layout: full-bleed background only on the right, CTAs remain bottom-right on `lg+`. Deleted the unused component file.

## Changes
- `src/components/home/HomePageSections.jsx` — dropped `HeroSignalExpandable` import and markup (tilt wrapper + card); CTA row keeps `data-home-reveal` and adjusted top spacing when stacked under the copy column.
- Deleted `src/components/home/HeroSignalExpandable.jsx`.

## Notes
- `heroContent.stats` / `signalExpandBullets` in `content.js` are unused by home hero UI for now; kept for possible reuse elsewhere.
