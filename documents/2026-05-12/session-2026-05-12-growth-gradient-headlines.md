# Session log – 2026-05-12

## Summary
Aligned headline typography with the primary growth CTA (`--color-growth-from` → `--color-growth-to`): new `.growth-gradient-text` utility (90° gradient + clip), applied to mobile `#page1` lockup lines, practice outcomes `h2`, and home-problem stat figures; retinted `.section-heading-neon` so site-wide section titles read more of the same coral/pink system.

## Changes
- Edited `src/index.css` — `.section-heading-neon` stops, `.growth-gradient-text`, `.section-heading-neon--line2` drop-shadow
- Edited `src/components/sections/HeroScrollExpand.jsx` — mobile three-line stack
- Edited `src/components/sections/HeroStatsTrustBand.jsx` — outcomes headline
- Edited `src/components/sections/HomeProblemSection.jsx` — stat values

## Notes
- Removed `mix-blend-difference` on mobile hero lines so the growth gradient reads predictably on the photo plate.
- `prefers-reduced-motion` / `.reduced-motion`: `.growth-gradient-text` falls back to `var(--color-growth-soft)` solid fill.
