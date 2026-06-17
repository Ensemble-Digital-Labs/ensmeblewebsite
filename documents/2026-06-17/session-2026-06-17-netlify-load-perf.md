# Session log – 2026-06-17 (Netlify load performance)

## Summary
Improved initial Netlify load without changing site visuals: removed global DNA preloads, split vendor bundles, lazy-loaded secondary routes, and deferred ambient starfield WebGL until after first paint.

## Changes
- **`index.html`** — Removed `dna-02.glb` + Draco preloads from every page load.
- **`vite.config.js`** — Manual chunks for three, gsap, framer-motion, locomotive, etc.
- **`src/app/AnimatedRoutes.jsx`** — Lazy-loaded all routes except Home.
- **`src/app/layout.jsx`** — Lazy + deferred `AmbientStarfieldCanvas`; lazy home helix canvas.
- **`public/_headers`** — Long-cache headers for hashed assets on Netlify.

## Notes
- Main entry JS dropped from ~1.49MB monolith to ~216KB app shell (+ route/vendor chunks on demand).
- Starfield appears ~0.5–1.4s after paint; same look once loaded.
- Three.js (~584KB) loads only when WebGL layers mount.
