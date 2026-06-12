# Session log – 2026-06-12 (home DNA intro animation)

## Summary
Added DNA Capital–style load intro for home helix chains: particles start as a scattered edge cloud, morph into the curvy double-helix path, and fade/scale in after the intro loader completes.

## Changes
- **`src/lib/homeDnaIntro.js`** — Shared 0→1 intro progress + smoothstep ease.
- **`src/lib/dnaParticleCore.js`** — `HOME_DNA_INTRO_VERTEX/FRAGMENT` + `createHomeDnaIntroMaterial()` (scatter morph, intro scale/opacity).
- **`src/lib/homeDnaWebgl.js`** — Scatter position generation; intro uniforms driven each frame.
- **`src/components/home/HomePageDnaCanvas.jsx`** — GSAP timeline (1.75s) triggered when `introReady`.
- **`src/pages/Home.jsx`** — Passes `loaderComplete` as `introReady`.

## Notes
- Synced with home loader: DNA hidden until loader finishes, then animates in (like DNA Capital clone).
- `prefers-reduced-motion`: intro skipped, helix shown immediately.
- Scatter cloud stays on same left/right side as target helix.

## Next steps
- Optional: stagger intro slightly before hero CTAs for tighter choreography.
