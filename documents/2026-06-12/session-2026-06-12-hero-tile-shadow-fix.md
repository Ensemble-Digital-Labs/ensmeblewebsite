# Session log – 2026-06-12 (hero tile shadow fix)

## Summary
Fixed upright dark rectangle behind tilted hero photos — caused by axis-aligned `box-shadow` on the outer tile wrapper while 3D rotation applied to inner layer.

## Changes
- `src/index.css` — `#home-hero .home-influx-masthead-tile { box-shadow: none }`; shadow kept on `.home-hero-collage__frame` inside rotated float
- `useHomeHeroEntrance.js` — tile entrance fades opacity only (no GSAP scale/y on outer wrapper)

## Notes
- If a faint dark border still shows inside the photo, it may be baked into the PNG export — crop or re-export without letterboxing.
