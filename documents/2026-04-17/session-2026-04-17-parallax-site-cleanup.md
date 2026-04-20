# Session log – 2026-04-17 (Parallax cleanup site-wide)

## Summary
Reduced redundant GSAP ScrollTrigger work, removed a conflicting parallax stack on the sticky 3D carousel, scoped global parallax CSS, and tuned scrub/intensity by breakpoint so scrubbed stacks behave more predictably across screen sizes.

## Changes
- `src/components/ParallaxLayerRegistry.jsx` — One full remount at mount + one at 600ms (loader-gated content); later timers only call `ScrollTrigger.refresh()` instead of rebuilding all tweens five times.
- `src/components/sections/Carousel3D.jsx` — Removed `data-parallax-layers` / `data-parallax-layer` from the carousel (static background + content). Avoids GSAP scrub on elements inside a long sticky pin zone fighting Lenis.
- `src/lib/parallaxLayerStacks.js` — Slightly lower intensity on `xs`/`smMd`; `scrub` 0.42 on `xs`, 0.32 otherwise.
- `src/index.css` — `will-change` / `backface-visibility` only under `[data-parallax-layers] [data-parallax-layer]`.

## Notes
- `ParallaxDepth` sections unchanged; footer / other animations unchanged.
- Build verified after edits.
