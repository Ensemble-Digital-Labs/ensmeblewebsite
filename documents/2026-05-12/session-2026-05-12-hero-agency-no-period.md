# Session log – 2026-05-12 (hero headline no period)

## Summary
Removed the trailing period from the third hero headline line (**agency** vs **agency.**) by updating `heroContent.headlineLines` / `headline` and the `Home` → `HeroScrollExpand` fallback.

## Changes
- `src/lib/content.js` — `headlineLines[2]`, `headline` string.
- `src/pages/Home.jsx` — `tailText` fallback.

## Next steps
- None.
