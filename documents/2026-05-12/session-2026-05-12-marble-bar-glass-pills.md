# Session log – 2026-05-12

## Summary
Styled hero outcomes marble-bar stat captions and trust lines as compact glass pills (border, translucent fill, inset highlight, backdrop blur). Trust lines wrap gradient text inside a glass shell so `growth-gradient-text` still clips correctly.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — stat label `<p>`: `inline-flex`, `rounded-full`, glass surface classes, slightly brighter label color; trust: each part wrapped in matching glass `div` with inner `<p className="m-0 …">`.
