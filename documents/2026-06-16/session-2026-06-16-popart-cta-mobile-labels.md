# Session log – 2026-06-16 (popart cta mobile labels)

## Summary
PopArt circle CTA script labels (Our process, Our story, etc.) stay visible on mobile; desktop hover unchanged. Contact Get in touch orb untouched.

## Changes
- `HomePopArtCircleCta.jsx` — mobile static label via matchMedia 767px
- `index.css` — mobile spacing for visible script labels

## Notes
- Contact orb hover label remains desktop-only per existing `shouldUseContactCursor()`.
