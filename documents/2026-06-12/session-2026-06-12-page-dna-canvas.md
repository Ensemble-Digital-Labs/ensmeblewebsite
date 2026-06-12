# Session log – 2026-06-12 (page-wide DNA canvas)

## Summary
Moved DNA helices from hero-only to a fixed viewport canvas that spans the full home scroll height, so the chains animate and scroll smoothly through every homepage section.

## Changes
- `src/lib/homeDnaHelix.js` — shared helix sampling + renderer (document-space Y, scroll-aware)
- `src/components/home/HomePageDnaCanvas.jsx` — fixed canvas on home page, syncs with `#main` / Lenis scroll
- `src/pages/Home.jsx` — mounts `HomePageDnaCanvas`
- `HomeHeroCinematicBackdrop.jsx` — wash/vignette only (no local canvas)
- `src/index.css` — page DNA edge scrim + section stacking above canvas

## Notes
- Helix turn count scales with page height so pitch stays natural on long scroll.
- Mobile keeps vertical edge columns (no V-shape); desktop keeps subtle inward tilt.

## Update — fix broken DNA scroll sync
- Map helix Y via `#home-sections.getBoundingClientRect().top` (Lenis transform scroll)
- Cap turn scaling on very long pages to avoid over-coiled / broken-looking strands

## Update — smoother curvy DNA through all sections
- Helix spans full `#home-scroll-root` height (through last section)
- Higher segment density, wider amplitude, dual spine waves + vertical sway
- Turn count scales per viewport module (no cap) for continuous twist down the page
- Backbone drawn as smooth connected paths with round joins
