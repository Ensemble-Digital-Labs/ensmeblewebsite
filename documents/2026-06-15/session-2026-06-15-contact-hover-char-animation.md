# Session log – 2026-06-15 (contact hover char animation)

## Summary
Restored character-by-character RTL reveal; kept bold Dancing Script and 0.42em word spacing via space char wraps. Added Cursor rule to preserve char animation.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — LABEL_CHARS + char GSAP
- `src/styles/contact-orb-cursor-morph.css` — char-wrap classes, space width 0.42em
- `.cursor/rules/contact-hover-label-char-animation.mdc` — project preference
