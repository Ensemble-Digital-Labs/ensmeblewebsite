# Session log – 2026-06-12 (DNA Capital clone preview)

## Summary
Added a self-contained [dnacapital.com](https://dnacapital.com/) recreation at **`/dna-capital-clone`** for local dev preview. Ensemble nav/footer are hidden on this route.

## How to view
```bash
npm run dev
```
Open: **http://localhost:5173/dna-capital-clone**

## Changes
- `src/pages/DnaCapitalClone.jsx` — route entry
- `src/components/dna-clone/DnaCapitalClonePage.jsx` — layout, menu, sections, stats
- `src/components/dna-clone/DnaCapitalHelixCanvas.jsx` — Three.js scroll-linked helix
- `src/lib/dnaCapitalContent.js` — section copy + nav structure
- `src/styles/dna-capital-clone.css` — cream minimal styling
- `src/app/AnimatedRoutes.jsx` — route
- `src/app/layout.jsx` — hide Ensemble chrome on clone route

## Notes
- **Not a pixel-perfect copy** — no proprietary assets, fonts, or original WebGL code; structure, copy, and motion pattern are recreated for learning/preview.
- Uses existing Lenis + GSAP ScrollTrigger from the app shell.
- **v2 upgrade:** Instrument Serif + Inter fonts, particle helix, GSAP menu stagger, 1440/768/375 spacing tokens.
- **For true pixel-perfect:** run extraction tool on live site + license Bw Darius & Graphik fonts.
