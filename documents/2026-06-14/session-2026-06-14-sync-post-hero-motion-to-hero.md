# Session log – 2026-06-14 (sync post-hero motion to hero)

## Summary
Aligned all post-hero homepage animations to the exact hero entrance rate via shared `HOME_MOTION` tokens — 0.78s reveals, 1.15s headlines, 0.14s/0.2s stagger, power3.out / same CSS ease curve.

## Changes
- **Created** `src/lib/homeMotionTokens.js` — single source of truth
- **Updated** `useHomeHeroEntrance.js` — consumes tokens (same values, centralized)
- **Updated** `useHomePopArtMotion.js` — image masks 0.78s @ 0 / 0.14 / 0.28s, copy at 0.92s (hero CTA timing)
- **Updated** `useHomeSequentialReveals.js`, `popArtBigLetterReveal.js`, `HomePopArtSectionLayout.jsx`, `HomePopArtRevText.jsx`
- **Updated** `index.css` — `--home-motion-*` CSS variables shared with hero line animation

## Hero reference timing
| Token | Value |
|-------|-------|
| Headline slide | 1.15s |
| CTA / reveal | 0.78s |
| Stagger | 0.14s |
| Line stagger | 0.2s |
| CTA starts | 0.92s into timeline |
| Ease | power3.out |
