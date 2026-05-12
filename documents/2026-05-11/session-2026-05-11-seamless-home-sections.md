# Session log – 2026-05-11

## Summary
Reduced visible **section seams** on Home: merged hero stats + trust into **one** panel (no twin card borders), removed the carousel **1px** decorative rule, and flattened the roadmap band background so it matches `#050816` (no lighter top gradient that read as a horizontal line under Selected Work).

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — single outer glass panel; inner columns without separate card borders.
- `src/components/sections/Carousel3D.jsx` — removed `h-px` gradient hairline in the hero overlay stack.
- `src/components/sections/HomeRoadmapSection.jsx` — replaced top-heavy gradient overlay with solid `#050816`.

## Notes
- Stat tiles and marquee chips still use light borders for legibility; say if those should go borderless too.
