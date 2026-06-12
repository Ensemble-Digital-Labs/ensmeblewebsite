# Session log – 2026-06-12 (AI / home atmosphere)

## Summary
Aligned `/ai` and `/ai/*` capability pages with the homepage plum atmosphere (canvas, parallax paths, transparent footer).

## Changes
- **Updated** `src/lib/atmosphericRoutes.js` — `/ai` prefix + `isAiRoute`, `isMarketingDocAtmosphereRoute`
- **Updated** `src/components/site/MarketingDocLayout.jsx` — atmosphere shell for AI doc pages

## Notes
- AI hub and detail pages render via `DynamicSitePage` → `MarketingDocLayout` (same path as services subpages).

---

## Update – Nav logo white on atmospheric pages

### Summary
`FullscreenNav` now uses the light wordmark (`ensemble-logo.svg`) on all `isAtmosphericRoute` pages, not only `/`.

### Changes
- **Updated** `src/components/FullscreenNav.jsx` — `navBackdropIsDark` for case studies, blog, about, services, contact, AI, etc.

---

## Update – About team cards dark glass

### Summary
Replaced `Card` on About team section — `bg-bg-card` (#fff) was winning over dark overrides because `cn()` does not merge Tailwind classes.

### Changes
- **Updated** `src/components/sections/Team.jsx` — native glass cards, white type, rose role labels

