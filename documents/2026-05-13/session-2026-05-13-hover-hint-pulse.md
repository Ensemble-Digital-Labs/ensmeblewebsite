# Session log – 2026-05-13

## Summary
Added a subtle teal-accent pulse to the parallax “Hover to reveal” pill via a custom Tailwind animation; disabled under `prefers-reduced-motion`.

## Changes
- Edited `tailwind.config.js` — `keyframes.parallax-hint-pulse`, `animation.parallax-hint-pulse`
- Edited `src/components/sections/ParallaxLayerShowcase.jsx` — hint span uses `animate-parallax-hint-pulse` + `motion-reduce:animate-none`, keeps static shadow fallback

## Notes
- Pulse animates opacity, box-shadow, and border color for a restrained glow (no default `animate-pulse` opacity dip on text alone).
