# Session log – 2026-06-15 (contact orb cursor morph)

## Summary
Added desktop-only cursor morph on contact FAB hover: pointer becomes a growth-gradient blob with “Get in touch” text, matching the contact button theme.

## Changes
- `src/components/contact-orb/ContactOrbCursorMorph.jsx` — hover detect, smooth follow, morph in/out
- `src/styles/contact-orb-cursor-morph.css` — blob styling, breathe animation, cursor hide class
- `src/components/contact-orb/PopArtContactOrb.jsx` — mount morph component
- `src/main.jsx` — import cursor morph CSS

## Notes
- Laptop/desktop only (≥1024px, fine pointer, hover capable).
- Disabled when orb panel open or fullscreen nav overlay active.
- Global MovingCircle remains off; this is contact-button scoped first.
