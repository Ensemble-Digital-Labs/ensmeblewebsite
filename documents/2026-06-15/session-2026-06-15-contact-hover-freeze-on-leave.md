# Session log – 2026-06-15 (contact hover freeze on leave)

## Summary
Label no longer chases cursor after quick mouse-out — anchor freezes at button edge and follow loop stops during exit animation.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — frozen anchor on leave; target updates only while hovering
