# Session log – 2026-06-14 (home post-hero animation speed)

## Summary
Sped up homepage animation sequence below the hero — PopArt image masks, copy stagger, big-letter wipe, and general scroll reveals were running ~40–45% slower than needed.

## Changes
- `useHomePopArtMotion.js` — image entrance 0.92/0.78s → 0.58/0.46s with slight overlap; earlier scroll trigger (86%)
- `popArtBigLetterReveal.js` — letter wipe 820ms → 520ms; tighter CTA delay
- `HomePopArtSectionLayout.jsx` — copy stagger delays reduced ~45%
- `index.css` — rev-text slide 0.92s → 0.52s; letter wipe 0.82s → 0.52s
- `useHomeSequentialReveals.js` — faster mask/reveal/count-up; triggers at 92%

## Notes
- Brand + Expertise (PopArt) total entrance ~2.5s → ~1.1s before copy starts.
- Hero entrance untouched.
