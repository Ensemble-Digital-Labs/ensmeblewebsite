# Session log – 2026-06-14 (footer ENSEMBLE particle assemble)

## Summary

Added scroll-driven particle assembly for the cinematic footer: background stars drift into the giant “ENSEMBLE” wordmark as the footer enters view. Home uses the existing WebGL starfield; other atmospheric routes get a lightweight footer canvas fallback.

## Changes

- Created `src/lib/footerEnsembleParticles.js` — text sampling, footer scroll progress, 3D star morph + 2D canvas helpers
- Created `src/components/FooterEnsembleParticleCanvas.jsx` — canvas fallback when home WebGL helix is absent
- Updated `src/lib/dnaCapitalScrollPhases.js` — `footerAssemble` scroll phase
- Updated `src/lib/dnaCapitalShaderHelix.js` — morph star positions toward wordmark; damp drift; fade helix on assemble
- Updated `src/components/CinematicFooter.jsx` — mount canvas fallback on non-home atmospheric pages

## Notes

- Assembly scrubs from footer `top 88%` → `bottom bottom` (matches existing footer GSAP triggers).
- Star targets recompute each frame from the live watermark `getBoundingClientRect()` so particles track the wordmark while scrolling.
- Helix ribbon opacity fades ~82% at full assemble so the wordmark reads clearly.
- Honors reduced motion / mobile static reveal via existing animation profile paths.

## Next steps

- Optional: tune particle count or depth on very small screens if performance is tight.

---

## Update (alignment fix)

The first approach mapped WebGL stars through 3D camera unprojection and sampled text with unstretched canvas coordinates — particles clustered on the left (E/N/S only).

**Fix:**
- Replaced WebGL morph with a **2D footer canvas** that samples the **live SVG** (inlined stroke styles for accurate rasterization).
- Particle targets use **footer-local coordinates** via `getBoundingClientRect()` on both footer + SVG.
- Canvas enabled on **home** too; WebGL starfield **fades out** as footer particles assemble.
- Increased particle density (up to ~1200 on desktop) for fuller letter coverage.

---

## Update (performance / lag fix)

Footer particle canvas was causing severe CPU/GPU load:

- **~1200 particles** each drawn every frame at 60fps
- **`shadowBlur` on every dot** — extremely expensive (forces offscreen blur per draw)
- **Idle RAF loop** — kept running even when footer was off-screen
- **Stacked with** home WebGL helix + Lenis scroll + GSAP scrub

**Mitigations applied:** removed per-particle glow, cut counts to 180–400, draw only on scroll / when footer intersects viewport, cap DPR at 1.5, precompute colors.
