# Session log – 2026-06-12 (hero text entrance slower)

## Summary
Slowed the hero headline reveal and aligned CTA fade-in so the entrance reads more deliberately after the loader.

## Changes
- `src/index.css` — headline line animation `0.76s` → `1.15s`; stagger `0.12s` → `0.2s` per line
- `src/hooks/useHomeHeroEntrance.js` — CTAs start later (`0.92s`), longer fade (`0.78s`), wider stagger; failsafe `2800ms`
