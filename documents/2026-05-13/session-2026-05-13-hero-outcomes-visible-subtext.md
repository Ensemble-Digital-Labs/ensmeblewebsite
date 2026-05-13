# Session log – 2026-05-13 (Hero outcomes subtext)

## Summary
Made every feature card in `HeroStatsTrustBand` show its description visually. Inactive items no longer use `sr-only`; they use muted `text-zinc-500` while the active card uses `text-zinc-300`. Progress bar remains on the active card only.

## Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx` (feature `<p>` classNames).

## Notes
- If horizontal scroll cards feel tall on small screens, consider tightening inactive typography or spacing in a follow-up.
