# Session log – 2026-06-14 (home DNA particle logo colors)

## Summary
Switched home background DNA helix particles from cyan-heavy to logo rainbow tones (teal, coral, purple) with smoother per-particle color blending.

## Changes
- **`src/lib/dnaParticleCore.js`**
  - `HOME_DNA_PARTICLE_COLORS`: `#38e1f5` / `#67e8f9` / `#ff9f7a` → `#3da993` / `#f77b74` / `#a857e5`, rim `#fce7f3`
  - Fragment shaders use `smoothstep` mixes instead of hard 33% color buckets

## Notes
- Previous palette was bright cyan + light cyan + coral accent.
- New palette aligns with Ensemble logo / CTA rainbow per user choice.
