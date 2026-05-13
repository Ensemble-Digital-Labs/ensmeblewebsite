# Session log – 2026-05-12

## Summary
Fixed `section-heading-neon` / `growth-gradient-text` not showing the gradient: those rules lived in `@layer components`, so later Tailwind utilities (e.g. `text-zinc-*` on sections) could override `color` / fill and break `background-clip: text`. Added end-of-sheet `#root … !important` locks for clip + transparent fill (with reduced-motion fallbacks). Removed unused `data-cinematic-reveal` hooks/markup where `skipReveal: true` made them no-ops, dropped dead `parallax-showcase__title` class, and removed redundant `useCinematicSectionReveal` imports.

## Changes
- `src/index.css` — gradient title cascade fix after `#root` heading weight rule
- `src/components/sections/ParallaxLayerShowcase.jsx`
- `src/components/sections/HomeProblemSection.jsx`
- `src/components/sections/HomeRoadmapSection.jsx`
- `src/components/sections/TestimonialsCollage.jsx`
- `src/components/sections/ShareExperienceSection.jsx`
- `src/components/sections/HeroStatsTrustBand.jsx`

## Notes
- `Page4.jsx` / `Hero.jsx` still use `useCinematicSectionReveal` where scrub/pin matters.
- Build: `npm run build` OK.
