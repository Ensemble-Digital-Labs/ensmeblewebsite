# Session log – 2026-04-27 (Hero cinematic reveal)

## Summary
Applied `useCinematicSectionReveal` to home `#page1` (Hero) with lead + staggered blocks, matching other pinned bands. Added `firstScreenHero` option so “from” states keep opacity at 1 and avoid a blank first viewport at scroll progress 0.

## Changes
- `src/lib/cinematicSectionReveal.js` — optional `options.firstScreenHero`; `useCinematicSectionReveal(ref, options)` passes it through; softer `y`/`scale` from-states when set
- `src/components/sections/Hero.jsx` — `useCinematicSectionReveal(heroRef, { firstScreenHero: true })`, `data-scroll`, `data-cinematic-reveal` wrappers (lead = eyebrow + headline; blocks = pain grid, subhead+CTAs, trust row)
- `src/index.css` — `#main .pin-spacer:has(#page1)` background `#030508`

## Notes
- Globe/canvas stay inside the section; they pin with the hero. Existing mount `gsap.fromTo` on `[data-hero-slide]` is unchanged.
