# Session log – 2026-06-12 (DNA clone initial animation)

## Summary
Re-checked [dnacapital.com](https://dnacapital.com/) initial load behavior and implemented a matching hero entrance on `/dna-capital-clone`: WebGL ribbon fade/scale, line-mask title reveal, delayed scroll hint.

## Changes
- Created `src/lib/dnaCapitalIntro.js` — shared 0→1 intro progress for page + WebGL
- Updated `src/components/dna-clone/DnaCapitalClonePage.jsx` — GSAP line-mask reveal + scroll hint fade-in
- Updated `src/lib/dnaCapitalShaderHelix.js` — intro-driven opacity, scale, camera pull-in, star brightness
- Updated `src/styles/dna-capital-clone.css` — hero line masks, gradient clipped title, scroll hint hidden until animated

## Notes
Reference site (Immersive Garden): fixed WebGL canvas with `dna-02.glb`, preloader logo canvas, hero title uses `.lines-mask` overflow + gradient text, scroll hint starts hidden. Clone now mirrors the DOM/GSAP sequence; GLB preloader still optional follow-up.

## Next steps
- Optional preloader fade before hero timeline
- Load GLB / displacement for closer WebGL match
