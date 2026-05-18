# Session log – 2026-05-15 (home-v2 neo typography)

## Summary
Recreated the deleted **neo hollow tech** homepage variant at **`/home-v2`**: same full legacy section stack as `/home-v1`, with **Orbitron** outline + cyan bloom scoped under `.home-v2-neo` so `/` and the rest of the site keep the current healthcare growth gradient headings.

## Changes
- Created `src/styles/home-v2-neo.css` — scoped Orbitron hollow stroke + glow overrides (beats `#root` gradient clip locks)
- Created `src/pages/HomeV2.jsx` — mirrors `HomeV1` sections, imports neo stylesheet
- Edited `src/app/AnimatedRoutes.jsx` — route `/home-v2` → `HomeV2`
- Edited `src/app/layout.jsx` — adds `home-v2-neo` on `[data-scroll-content]` when pathname is `/home-v2` (includes cinematic footer headings)
- Edited `src/pages/Home.jsx` — comment pointing to `/home-v2`

## Notes
- Typography reference: session logs from 2026-05-10 (Orbitron, transparent fill, cyan `-webkit-text-stroke`, electric cyan `text-shadow`).
- `prefers-reduced-motion` / `.reduced-motion`: solid cyan fill, no glow stack.

## Next steps
- Optional: dark `main` surface on `/home-v2` if white scroll shell feels off against dark bands.
