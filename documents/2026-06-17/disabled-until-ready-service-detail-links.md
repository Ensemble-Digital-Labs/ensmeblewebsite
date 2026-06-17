# Disabled until ready — service detail card links

## Status
**Temporary (2026-06-17)** — Individual `/services/:slug` pages are not launch-ready.

## What changed
- `/services` grid cards: hover lift, glow, icon scale, and shimmer **unchanged**
- **Removed** hover CTA row ("Explore this service" + arrow) on service vertical cards
- Cards render as **non-clickable** `<div>` (not `<Link>`)

## Where
- `src/components/sections/ServicesGrid.jsx` — `/services` page
- `src/components/home/chapters/HomeChapterCapabilities.jsx` — homepage capability cards linking to service routes

## Re-enable when detail pages are ready
1. Set `SERVICE_DETAIL_PAGES_LINKS_ENABLED = true` in `src/lib/serviceVerticals.js`
2. Verify each `/services/*` route in `src/data/site/servicesPages.js` has final copy
3. Smoke-test cards on `/services` and homepage capabilities section

## Not changed
- AI hub cards (`/ai#...`) — still clickable
- Fullscreen nav service links in `src/data/navigation.js` — still route to detail URLs (update separately if needed)
