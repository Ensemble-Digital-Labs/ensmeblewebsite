# Session log – 2026-06-15 (contact cursor keep system pointer)

## Summary
Kept the normal system cursor visible on contact FAB hover; morph blob is now a companion label to the left, not a cursor replacement.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — removed `ensemble-contact-cursor-active` class toggle
- `src/styles/contact-orb-cursor-morph.css` — removed `cursor: none` rules; exit fades in place at left anchor
