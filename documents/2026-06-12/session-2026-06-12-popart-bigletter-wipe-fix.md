# Session log – 2026-06-12 (PopArt big letter wipe fix)

## Summary
Fixed giant letter animation to match popwebdesign.net gold horizontal wipe (not fade/blur), and wired reliable ScrollTrigger reveals on home PopArt sections.

## Changes
- `src/lib/popArtBigLetterReveal.js` — shared `.show` trigger
- `usePopArtScrollReveals.js` — retry bind, `introReady` support, home letters delegated to GSAP
- `useHomePopArtMotion.js` — ScrollTrigger `onEnter` per section monogram
- `index.css` — PopArt `::before` wipe (`translateX -101% → 101%`), `#facc16` gold
- `HomePageSections.jsx` — rev-text hook waits for `introReady`

## Notes
- Reference uses `.animate-bigletter::before` sweep + `.show` color fill — not opacity/scale.
