# Session log – 2026-05-12

## Summary
Split `#parallax-showcase` main heading into two stacked lines via `headlineLine1` / `headlineLine2` in content and two `<span className="block">` nodes in the component (still one `h2` for a11y).

## Changes
- `src/lib/content.js` — `parallaxShowcaseContent`: replaced `headline` with `headlineLine1` + `headlineLine2` (“The only partner” / “Built like this.”).
- `src/components/sections/ParallaxLayerShowcase.jsx` — render two lines with slight vertical gap (`mt-1 sm:mt-1.5` on second span).
