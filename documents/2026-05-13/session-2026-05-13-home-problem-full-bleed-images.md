# Session log – 2026-05-13

## Summary
Home problem cards use **full-bleed** `image` under copy; text stays in the same **left / right third** layout (`ml-auto` for odd rows). Light bottom gradient only for legibility. All six pains have `image` URLs; five files are **stubs** copied from `invisible-online.png` until bespoke art replaces them.

## Changes
- `public/assets/images/home-problem/` — added `wasted-ad-spend.png`, `reputation-risk.png`, `website-friction.png`, `hipaa-exposure.png`, `fragmented-vendors.png` (copies of invisible-online stub)
- `src/lib/content.js` — `image` on every pain + doc comment
- `src/components/sections/HomeProblemSection.jsx` — absolute `object-cover` image, overlay row for text, removed side-by-side image column + `flex-row-reverse`
- `FILE_TREE.md` — list home-problem PNGs

## Next steps
- Replace stub PNGs with final card art (same filenames).
