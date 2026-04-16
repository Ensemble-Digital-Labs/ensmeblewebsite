# Session log – 2026-04-16 (visible parallax + themed backdrops)

## Summary

Made scroll parallax easier to see: stronger `yPercent` defaults, tighter scrub, GPU hints on `[data-parallax-layer]`, and new `ParallaxThemedBackdrop` (light + dark cyan/violet med-tech mesh, orbs, grids). `ParallaxDepth` defaults to `variant="default"` with explicit `tone` where needed; FAQ uses `tone="dark"`. Manual stacks (carousel, page4, showcase, page2) got higher `data-parallax-y` overrides.

## Changes

- `src/components/ui/ParallaxDepth.jsx` — export `ParallaxThemedBackdrop`; variants `subtle` / `default` / `strong`; `tone` prop `light` | `dark`.
- `src/lib/parallaxLayerStacks.js` — DEPTH_4/DEPTH_2 increased; scrub `0.32`.
- `src/index.css` — `[data-parallax-layer]` will-change / backface-visibility.
- Updated sections/pages using `ParallaxDepth` + composited backdrops (Services hero, mission/values, grids, team, tiers, how-we-work, why choose us, contact hero, FAQ, testimonials strong, case study pages, etc.).
- Carousel / Page4 / ParallaxLayerShowcase / Page2 — higher per-layer `data-parallax-y`.

## Notes

- Home `Hero` still avoids an extra parallax wrapper to protect globe/HUD stacking; depth is emphasized on following sections.
