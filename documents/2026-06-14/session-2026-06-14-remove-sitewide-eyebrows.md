# Session log – 2026-06-14 (remove sitewide eyebrow text)

## Summary
Removed eyebrow labels (small uppercase lines above section titles) across the site per user request.

## Changes
- **`HomeHeroTitle.jsx`** — Removed hero eyebrow reveal.
- **`SectionHeading.jsx`** — No longer renders `subtitle` eyebrow line.
- **`MarketingDocLayout.jsx`** — Removed blog + marketing doc eyebrow labels.
- **`BlogHub.jsx`** — Removed “Insights” eyebrow.
- **`CaseStudyDetail.jsx`** — Removed “Case study” eyebrow.
- **`Hero.jsx`** — Removed legacy hero eyebrow strip.
- **`HomeChapterAi.jsx`** — Removed “AI engine” eyebrow.
- **`HomeChapterTrust.jsx`** — Removed “Featured outcome” card label.
- **`HomeChapterWork.jsx`** — Removed “More work” sub-label.
- **`HomeExpertiseCard.jsx`** — Removed card subtitle eyebrow.
- **`DnaCapitalClonePage.jsx`** — Removed section eyebrow lines.

## Notes
- `eyebrow` fields remain in content/data for docs/buildPage; they are no longer displayed in layouts.
- Form labels, filter bars, stat labels, phase titles, and tags were kept (not section eyebrows).

## Next steps
- None.
