# Session log – 2026-06-15 (contact hover text visibility fix)

## Summary
Fixed invisible hover label: gradient+filter on parent broke text paint; moved gradient to each word, fixed mount/anim timing with useLayoutEffect.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — sync mount+active; split enter/exit layout effects
- `src/styles/contact-orb-cursor-morph.css` — per-word gradient clip, glow on wrap not text, higher z-index
