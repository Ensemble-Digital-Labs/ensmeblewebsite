# Session log – 2026-06-12 (DNA clone visual match)

## Summary
Improved `/dna-capital-clone` to better match dnacapital.com — visible particle helix, dark shell, hero layout with right-side visual column.

## Changes
- `src/lib/dnaCapitalShaderHelix.js` — larger particles, stronger bloom, helix scaled/offset right, scroll-driven camera
- `src/components/dna-clone/DnaCapitalClonePage.jsx` — mount WebGL immediately, hero two-column layout, reliable hash scroll
- `src/styles/dna-capital-clone.css` — full dark html/body/#main shell, static helix gradient fallback, hero grid
- `src/app/layout.jsx` — `dna-clone-active` class on route enter

## View
http://localhost:3000/dna-capital-clone

## Notes
- Reference signature: dark `#070708`, white hero copy left, glowing purple/blue DNA particles right
- Still uses font substitutes (Cormorant/Inter) — not licensed Bw Darius / Graphik

## Animation distinction (2026-06-12 follow-up)
Clone uses **WebGL particle helix** (`dnaCapitalShaderHelix.js`) — centered, purple/blue, white rim, starfield. **Not** the Ensemble home **2D canvas** edge helices (`homeDnaHelix.js` / cyan-teal rungs). Hero centered; approach stats use ring layout like reference.
