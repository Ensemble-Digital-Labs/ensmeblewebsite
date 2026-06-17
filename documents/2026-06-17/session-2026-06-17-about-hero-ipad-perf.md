# Session log – 2026-06-17 (About hero iPad performance)

## Summary
Fixed lag and jank on iPad in the About page hero ("Who We Are" / product company section) by using a lightweight touch/tablet visual path instead of the desktop torch mask, duplicate images, heavy blurs, and scroll parallax.

## Changes
- **`src/lib/animationProfile.js`** — Added `shouldUseLightSectionEffects()` helper.
- **`src/components/sections/AboutHero.jsx`** — Light mode on touch/narrow viewports: single background image, solid story panel (no backdrop-blur), content visible immediately, no GSAP parallax/torch/mouse effects.
- **`src/index.css`** — About hero ring animation + touch/reduced-motion safety overrides.

## Notes
- Desktop keeps full cinematic hero (torch reveal, parallax, entrance timeline).
- Removed non-functional `styled-jsx` block (not supported in Vite).
