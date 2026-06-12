# Session log – 2026-06-12 (home helix particle visibility)

## Summary
Boosted home DNA helix particle visibility: brighter cyan/warm palette (no dark color1), larger points, higher opacity, denser strand sampling, dedicated home fragment shader.

## Changes
- `src/lib/dnaParticleCore.js` — HOME colors, sizes, `HOME_DNA_PARTICLE_FRAGMENT`
- `src/lib/homeDnaHelix.js` — strand interpolation, more rung steps, brighter color bias
- `src/lib/homeDnaWebgl.js` — mobile opacity floor 0.88

## Notes
Dark `#1a2848` color1 made ~33% of additive particles invisible on navy background.
