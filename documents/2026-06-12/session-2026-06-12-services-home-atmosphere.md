# Session log – 2026-06-12 (services / home atmosphere)

## Summary
Aligned `/services` and `/services/*` with the homepage plum atmosphere: canvas, parallax paths, transparent sections, white typography, and glass cards.

## Changes
- **Updated** `src/lib/atmosphericRoutes.js` — `/services` prefix matching + `isServicesRoute`
- **Updated** `src/pages/Services.jsx` — page-level dark `ParallaxDepth`
- **Updated** `ServicesHero.jsx`, `ServicesGrid.jsx`, `ServiceTiers.jsx`, `HowWeWork.jsx`, `FAQ.jsx` — removed light/opaque shells
- **Updated** `src/components/site/MarketingDocLayout.jsx` — atmosphere shell for service detail pages only

## Notes
- Main services index and subpages (e.g. `/services/performance-marketing`) share the case-studies/blog/about treatment.
