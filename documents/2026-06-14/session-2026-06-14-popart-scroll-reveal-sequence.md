# Session log – 2026-06-14 (popart scroll reveal sequence)

## Summary
Orchestrated Brand/PopArt section scroll reveals: left collage first, then title → subtitle → body → CTA. Removed competing ScrollTriggers that caused jumping.

## Changes
- **`src/hooks/useHomePopArtMotion.js`** — single `once` timeline per section; visuals finish then `revealPopArtSectionSequence`; softer entrance; CTA after copy; parallax starts later (`top 70%`)
- **`src/lib/popArtBigLetterReveal.js`** — copy uses `data-rev-delay` only; CTA reveals after last text; skip in-view early reveal for orchestrated stacks
- **`src/components/home/chapters/HomeChapterBrand.jsx`** — `definition` as `subtitle`, long copy as `body`
- **`src/components/home/HomePopArtSectionLayout.jsx`** — staged delays (0 / 0.22 / 0.42+); CTA pending class
- **`src/index.css`** — CTA pending/revealed opacity

## Reveal order (scroll into Brand section)
1. Left image collage (main + chart overlays)
2. Giant letter wipe + title “Ensemble”
3. “One accountable partner…”
4. Body paragraph
5. + CTA button
