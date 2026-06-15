# Session log – 2026-06-14 (popart scroll lag fix)

## Summary
Reduced “laggy” float after section load — caused by high GSAP scrub delays (1.15–1.45s catch-up) and always-on `will-change`.

## Changes
- **`src/hooks/useHomePopArtMotion.js`** — single parallax timeline with `scrub: 0.4`; slightly smaller drift; `force3D`; clear `will-change` after entrance
- **`src/index.css`** — `will-change` only during `.is-entrance-pending`

## Notes
- Scrub number = seconds animation lags behind scroll; old values felt sluggish even when content was fully loaded.
