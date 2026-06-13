# Session log – 2026-06-12 (blog pages match case studies)

## Summary
Aligned blog article/category pages and hub with case study design: dark ParallaxDepth shell, centered hero, nav clearance, cyan tags, no overlapping breadcrumbs/logo.

## Changes
- **`src/lib/atmosphericRoutes.js`** — `isBlogDocRoute()` for `/blog/*` detail pages.
- **`src/components/site/MarketingDocLayout.jsx`** — Blog branch: ParallaxDepth, centered hero, “Back to Insights”, removed left PopArt big letter overlap.
- **`src/pages/BlogHub.jsx`** — Increased top padding to match detail pages.

## Notes
- Services/AI marketing docs keep existing left-aligned PopArt layout.
- Blog CTAs centered; article body stays readable in `max-w-3xl`.
