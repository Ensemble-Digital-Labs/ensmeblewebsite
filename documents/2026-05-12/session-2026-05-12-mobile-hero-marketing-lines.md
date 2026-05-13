# Session log – 2026-05-12 (mobile hero marketing lines)

## Summary
Mobile (`< lg`) **`HeroScrollExpand`** three-line stack can differ from desktop: **`Home`** passes **`mobileLeadText` / `mobileFocalText` / `mobileTailText`** from **`heroContent.headlineLines`** (**Not just a** / **marketing** / **agency**) while desktop shutter + pin still uses **`heroScrollExpandHeadlineLines`** (welcome lockup).

## Changes
- `src/components/sections/HeroScrollExpand.jsx` — optional mobile headline props; mobile branch uses `mobile* ?? lead/focal/tail`.
- `src/pages/Home.jsx` — pass mobile lines from `headlineLines`.

## Next steps
- None.
