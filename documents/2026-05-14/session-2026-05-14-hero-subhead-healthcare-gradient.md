# Session log – 2026-05-14

## Summary
Highlighted **healthcare-focused** in the home hero subhead with the same growth gradient treatment as the headline “marketing” span (`--color-growth-from` / `--color-growth-to`, `bg-clip-text`). Split copy in `heroSubheadSegments` and render home hero `<p>` from segments with a `growthHighlight` flag (other routes’ `KeywordReveal` / `HeroScrollExpand` unchanged for that token).

## Changes
- `src/lib/content.js` — split first subhead sentence; `{ text: 'healthcare-focused', growthHighlight: true }`.
- `src/components/home/HomePageSections.jsx` — import `heroSubheadSegments`; map segments to apply gradient span only when `growthHighlight`.

## Notes
- `heroContent.subhead` getter still mirrors full joined string for any other consumers.
