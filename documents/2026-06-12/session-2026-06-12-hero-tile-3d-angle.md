# Session log – 2026-06-12 (hero tile 3D angle)

## Summary
Corrected hero photo tile “angle” — user meant flanking masthead cards, not the DNA backdrop. Reverted DNA helix tilt; added perspective `rotateX` / `rotateY` / `rotateZ` on photo tiles; wired interim masthead image fallbacks.

## Changes
- `HomeHeroCinematicBackdrop.jsx` — reverted to vertical DNA helices
- `HomeHeroSideRail.jsx` — per-tile tiltX/tiltY/rotate with CSS vars
- `HomeHeroVisualCollage.jsx` — same 3D tilt on mobile collage
- `src/index.css` — perspective on rails/collage; 3D transform on `__float`; hover lift; reduced-motion flatten
- `useHomeHeroEntrance.js` — GSAP no longer overrides tile rotation (CSS owns tilt)
- `homeImagery.js` — interim masthead paths to existing `/assets/images/ambient/hero-bg-ensemble-*.png`

## Notes
- Left tiles lean inward (`tiltY` positive); right tiles mirror (`tiltY` negative).
- Swap `HOME_HERO_MASTHEAD` back to `ensemble2026Home.hero.masthead` when `public/ensemble-2026/home/hero/` files land.
