# Session log – 2026-04-27 (Hero redesign — particle field)

## Summary
Replaced the Three.js globe + optional HUD bitmap with a lightweight cyan/teal particle grid inspired by a “flux” reference, tuned for Ensemble’s premium healthcare-tech palette. All existing hero copy, CTAs, pain cards, and cinematic reveal wiring are unchanged.

## Changes
- Added `src/components/sections/HeroParticleField.jsx` — drift + pointer-driven field (window `pointermove` clamped to `#page1`), reduced-motion static gradient fallback, smaller grid on mobile, no per-frame `setTimeout` storm on particles
- `src/components/sections/Hero.jsx` — removed `HeroGlobePlexus` and background image stack; render `HeroParticleField` with `boundsRef={heroRef}`
- `src/lib/content.js` — `heroContent.backgroundImage` set to `null` (optional to restore path for a subtle underlay)
- `src/index.css` — comment update for hero horizon mesh note

## Notes
- `HeroGlobePlexus.jsx` remains in repo for reuse; it is no longer imported from Home hero.
