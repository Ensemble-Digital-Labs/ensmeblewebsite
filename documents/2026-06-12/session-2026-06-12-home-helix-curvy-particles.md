# Session log – 2026-06-12 (home helix curvy particles)

## Summary
Restored the original home double-helix path (twist, weave, drift, scroll-linked) while keeping DNA Capital–style particle rendering on the homepage WebGL layer.

## Changes
- **`src/lib/homeDnaWebgl.js`** — Replaced stacked GLB ribbon tiles with `buildHelixParticleData` sampling; orthographic scroll via `u_sectionTop`; DNA clone purple/blue particle palette; per-frame position updates for animated twist/curve.
- **`src/lib/homeDnaHelix.js`** — Denser strand interpolation (3 midpoints) and rung steps (16) for smoother curvy chains.
- **`src/components/home/HomePageDnaCanvas.jsx`** — Passes `docHeight` through create/resize/render; updated layer comment.

## Notes
- Background wash + edge scrim unchanged; transparent WebGL only.
- Helix motion comes from `sampleDoubleHelix` time param (spin, weave, axis sway).
- No GLB load on home — lighter init, path-driven continuity.

## Next steps
- Tune particle size/opacity if edges feel too dense on mobile.
- Optional: throttle geometry rebuild if perf dips on low-end devices.

---

## Update — particles invisible (render crash)

### Summary
Fixed helix particles disappearing: `renderHomeDnaWebgl` referenced undefined `scene` (ReferenceError every frame → WebGL layer fell back to wash-only). Restored brighter `HOME_DNA_PARTICLE_COLORS` for visibility on dark wash.

### Changes
- **`src/lib/homeDnaWebgl.js`** — Destructure `ctx.scene` for `renderer.render()`; brighter cyan/teal home palette + larger point size.
