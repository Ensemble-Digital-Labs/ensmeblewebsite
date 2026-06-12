# Session log – 2026-06-12 (remove hero images)

## Summary
Removed all masthead photo tiles from the homepage hero — side rails, mobile collage, and related entrance animation.

## Changes
- `HomeChapterHero.jsx` — headline + CTAs only; centered layout; DNA backdrop retained
- `useHomeHeroEntrance.js` — CTA fade-in only (no tile timeline)
- `src/index.css` — reset `.home-hero-center` offset used for flanking photos

## Notes
- `HomeHeroSideRail.jsx` and `HomeHeroVisualCollage.jsx` kept in repo but unmounted from hero.
