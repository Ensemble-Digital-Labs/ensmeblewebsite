# Session log – 2026-06-12 (blog / case studies align)

## Summary
Aligned `/blog` with the case studies page: home hero atmosphere, parallax paths, transparent layout shell, centered header, filter bar, pagination, and atmospheric footer.

## Changes
- **Updated** `src/pages/BlogHub.jsx` — `ParallaxDepth`, `BackgroundPathsParallaxLayer`, filter/sort/pagination, removed opaque bg + breadcrumb overlap
- **Updated** `src/app/layout.jsx` — `/blog` atmospheric page
- **Updated** `src/components/home/HomeAtmosphereCanvas.jsx` — static hero atmosphere on `/blog`
- **Updated** `src/components/CinematicFooter.jsx` — transparent footer on `/blog`

## Notes
- Reuses `CaseStudyFilterBar` with tag-derived filters from `blogArticleSummaries`.
- Article cards stay a 3-column grid (case studies uses 2-col impact cards).

## Update – Blog GSH impact cards

### Summary
Blog hub cards now use the same GSH overlapping image + cream panel layout as case studies (`BlogImpactCard`).

### Changes
- **Created** `src/components/blog/BlogImpactCard.jsx`
- **Updated** `src/data/site/blogPages.js` — `image` + `category` on summaries
- **Updated** `src/pages/BlogHub.jsx` — 2-column impact grid

## Next steps
- Optional: blog article detail pages could get the same atmosphere treatment.
