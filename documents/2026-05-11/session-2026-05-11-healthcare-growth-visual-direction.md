# Session log – 2026-05-11

## Summary

Shifted the global visual system from a cyber / HUD-heavy look toward a premium **healthcare growth ecosystem** aesthetic: warmer navy surfaces, teal + warm orange accents, softer meshes/grids, gradient display headings (replacing hollow neon Orbitron strokes), and updated hero/selected-work/footer treatments without changing routes or section structure.

## Changes

- **`tailwind.config.js`** — Added `brand.warm` / `brand.warm-light` mapped to CSS variables.
- **`src/index.css`** — New surface/warm CSS variables; rewrote `.section-heading-neon` / `--line2` as gradient display type; softened `.hero-eyebrow-tech`, hero meshes, horizon CSS (teal/amber vs violet/cyber), carousel backdrops, keyword gradients; nav bar CTA conic gradient (teal/orange vs violet); pin-spacer shell colors.
- **`src/app/layout.jsx`** — Page shell background `#050816`.
- **`src/components/sections/Hero.jsx`** — Default hero image `digitalHealthNetwork`; removed HUD horizon strip + scanline layer; navy/teal/amber overlays; teal-forward stats/CTA accents.
- **`src/components/sections/Carousel3D.jsx`**, **`ParallaxDepth.jsx`** — Backdrop gradients and grids tuned to navy/teal/warm.
- **Home sections** — `ParallaxLayerShowcase`, `HomeProblemSection`, `HomeRoadmapSection`, `TestimonialsCollage`, `ShareExperienceSection`: backgrounds, glass cards, eyebrow/accent colors.
- **`CTABand.jsx`** — Rich teal → orange gradient band.
- **`CinematicFooter.jsx`**, **`src/styles/cinematic-footer.css`** — Footer palette, softer giant watermark type, marquee separators (· vs ✦), reduced grid contrast.
- **`FullscreenNav.jsx`**, **`Loader.jsx`** — Link gradients and loader glows (no violet).
- **`MarketingDocLayout.jsx`**, **`BlogHub.jsx`**, **`NotFound.jsx`**, **`Page4.jsx`** — Shell bg alignment.
- **`src/lib/backgroundAssets.js`**, **`src/lib/content.js`** — Comments/default hero doc alignment.

## Notes

- Class names like `section-heading-neon` and `hero-eyebrow-tech` were **kept** for stability; behavior is now display-gradient / clean label styling via CSS.
- `npm run build` succeeded after changes.

## Next steps

- Spot-check hero imagery (`digital-health-network-hero-bg.png`) vs. calmer `tech-plexus` if any scene still feels dense.
- Optional: soften `HeroGlobePlexus` / custom cursor HUD if those routes reappear on Home.
