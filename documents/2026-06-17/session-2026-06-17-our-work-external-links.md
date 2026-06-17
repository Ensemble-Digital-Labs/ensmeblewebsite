# Session log – 2026-06-17 (Our Work external links)

## Summary
Wired the home **Our work** masonry tiles to each client live website. Cards now open the external site in a new tab instead of routing to internal case study detail pages.

## Changes
- **`src/data/healthcareCaseStudies.js`** — Added `websiteUrl` for all five featured portfolio entries.
- **`src/components/home/HomeWorkMasonryGrid.jsx`** — Added `MasonryTileLink` helper for external links with `target="_blank"` and `rel="noopener noreferrer"`.

## Notes
- Hover Explore this CTA and tile styling unchanged.
- Case study detail pages remain available via /case-studies gallery.
