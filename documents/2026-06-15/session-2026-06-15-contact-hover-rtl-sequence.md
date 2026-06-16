# Session log – 2026-06-15 (contact hover RTL word sequence)

## Summary
Hover label words now reveal right-to-left from cursor anchor: touch → in → Get; exit collapses back toward cursor. Anchor X follows pointer on button.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — xPercent horizontal stagger `from: 'end'` / exit `from: 'start'`
- `src/styles/contact-orb-cursor-morph.css` — word-wrap right-align for clip direction
