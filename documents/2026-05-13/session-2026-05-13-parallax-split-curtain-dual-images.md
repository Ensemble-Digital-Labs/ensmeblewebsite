# Session log – 2026-05-13 (Parallax split-curtain + dual images)

## Summary
Documented and implemented a **two-phase split curtain** pillar mode: when both `imageOutside` and `imageInside` are set on a pillar, two half-panels (outside art) slide apart on hover/focus to reveal inside art + body copy, sharing the same interaction model as `CardCurtainReveal`. Until both URLs are provided, pillars keep the existing glass + clip-path behavior.

## Changes
- Edited `src/lib/content.js` — `parallaxShowcaseContent.pillars` entries include `imageOutside` / `imageInside` (currently `null`) + JSDoc.
- Edited `src/components/sections/ParallaxLayerShowcase.jsx` — `pillarHasSplitImages`, `ParallaxSplitCurtainPillar`, conditional `li` shell, unified `revealMotionTransition` with curtain timing.

## Notes
- Use root-relative paths, e.g. `/assets/images/parallax-pillars/specialty-outside.webp`.
- Inside panel uses a **bottom-only** gradient behind copy so long text stays readable on photos (not the same as the full-section overlay removed earlier).

## Next steps
- Drop assets under `public/…` and set both fields per pillar to enable split mode.
