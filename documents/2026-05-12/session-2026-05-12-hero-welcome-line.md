# Session log – 2026-05-12 (hero welcome line)

## Summary
Added **`heroWelcomeLine`** (`Welcome to Ensemble Digital Labs`) in site content and surfaced it on the home **`HeroScrollExpand`** block above the three-line headline. Home now passes **`headlineLines`** from `heroContent` for the main title so copy stays single-sourced.

## Changes
- `src/lib/content.js` — `heroWelcomeLine: 'Welcome to Ensemble Digital Labs'`.
- `src/components/sections/HeroScrollExpand.jsx` — optional `welcomeLine` prop; mobile + desktop (`lg+`) placement above the title stack.
- `src/pages/Home.jsx` — import `heroContent`; pass `welcomeLine`, `leadText`, `focalText`, `tailText` from `heroContent.headlineLines`.

## Notes
- Welcome uses teal uppercase eyebrow styling; main lines remain existing white / mix-blend-difference (mobile) and shutter stack (desktop).

## Next steps
- None unless copy or placement should match another page’s hero pattern.
