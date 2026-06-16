# Session log – 2026-06-16 (contact orb position)

## Summary
Moved the floating “Get in touch” contact FAB higher on screen and locked hover label vertical alignment to the button center.

## Changes
- **`src/styles/popart-contact-orb.css`** — increased `bottom` offset on `.ensemble-contact-orb`
- **`src/components/contact-orb/ContactOrbCursorMorph.jsx`** — label Y uses trigger vertical center (not cursor Y)

## Notes
- Hover “Get in touch” script should sit level with the circular hand button
