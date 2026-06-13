# Session log – 2026-06-13 (experiments → DNA Capital clone)

## Summary
Replaced the L-path DNA snake experiment with the existing DNA Capital (dnacapital.com) recreation on `/experiments` — same WebGL helix, scroll phases, hero intro, and page sections as `/dna-capital-clone`.

## Changes
- **`src/pages/Experiments.jsx`** — renders `DnaCapitalClonePage`.
- **`src/lib/dnaCapitalRoutes.js`** — shared route helper for `/dna-capital-clone` and `/experiments`.
- **`src/app/layout.jsx`**, **`AnimatedRoutes.jsx`**, **`FullscreenNav.jsx`** — experiments uses DNA clone layout (no site nav/footer, native scroll, `dna-clone-active`).
- **Removed** L-path experiment files: `experimentDnaLPath.js`, `experimentDnaSnake.js`, `ExperimentDnaSnakeCanvas.jsx`, `ExperimentIdeasPage.jsx`, `experiments.css`.

## Notes
- Visit **`/experiments`** or **`/dna-capital-clone`** — identical DNA Capital recreation.
- Stack: `dna-02.glb` particles, scroll-linked shader helix, GSAP hero intro.

## Changes (update 2)
- **WebGL only (not text):** DNA chain uses home particle colors (cyan/teal/warm orange); starfield uses cyan/warm/violet instead of white.
- Homepage atmosphere + DNA wash layers behind transparent canvas; bloom reduced so field stays visible.
- Text styling left as original DNA Capital on `/experiments`.

## Changes (update 3 — ensemble background fix)
- **`src/lib/dnaCapitalShaderHelix.js`** — ensemble theme skips `EffectComposer` (was clearing to opaque black each frame); renders directly with alpha-0 clear so homepage atmosphere shows through.
- **`src/styles/dna-capital-clone-ensemble.css`** — `#main` / `html` / `body` / `#root` set to transparent instead of flat `#050816`; canvas forced transparent.
- **`src/app/layout.jsx`** — `/experiments` uses `bg-transparent` on `#main`.

## Changes (update 4 — DNA Capital chain look on `/experiments`)
- **`src/lib/ensembleDnaShaderOptions.js`** — chain uses `DNA_CLONE_PARTICLE_COLORS` (purple/blue/white rim) instead of home cyan/orange; `particleGlow: true`.
- **`src/lib/dnaParticleCore.js`** — added `DNA_PARTICLE_VERTEX_GLOW` + `DNA_PARTICLE_FRAGMENT_GLOW` (soft halo + white-hot core mimics UnrealBloomPass without opaque black clear).
- **`src/lib/dnaCapitalShaderHelix.js`** — passes `particleGlow` to helix material; wave grid uses DNA Capital blue on experiments too.
- Background/atmosphere unchanged (transparent canvas + `DnaCloneEnsembleAtmosphere`).

## Changes (update 10 — remove `/dna-capital-clone`)
- Deleted **`src/pages/DnaCapitalClone.jsx`**
- Removed route from **`src/app/AnimatedRoutes.jsx`**
- **`src/lib/dnaCapitalRoutes.js`** — only `/experiments` now
- **`src/app/layout.jsx`** — simplified DNA clone surface (always transparent on experiments)
- DNA experience lives at **`/experiments`** only
- **Root cause:** `helixX`, `camX`, and `lookX` were moved together — camera panned with the helix so it barely moved on screen. Hot reload also cached old layout on the WebGL context.
- **`src/lib/dnaHelixLayout.js`** — laptop: `helixX: 2.85`, camera locked at DNA defaults (`camX: 1.18`, `lookX: 0.98`).
- **`src/lib/dnaCapitalShaderHelix.js`** — ensemble reads live `ENSEMBLE_DNA_HELIX_LAYOUT` each frame; resets pose when layout changes.
- **`src/lib/dnaHelixLayout.js`** — `resolveHelixFrame()` for laptop vs mobile; ensemble desktop `helixX: 2.08` (further right); mobile `widthScale: 0.74` (thinner ribbon).
- **`src/lib/dnaCapitalShaderHelix.js`** — render + attach use responsive frame (position, camera, scale).
- **`src/lib/dnaHelixLayout.js`** — `ENSEMBLE_DNA_HELIX_LAYOUT` with 1.42× width (X/Z), 1.12× height, closer camera, larger base scale.
- **`src/lib/ensembleDnaShaderOptions.js`** — passes `helixLayout` + `sizeScale: 1.16` for experiments.
- **`src/lib/dnaCapitalShaderHelix.js`** — non-uniform helix scale + layout-driven camera distance.
- **`src/lib/dnaParticleCore.js`** — slightly larger glow particle point size.
