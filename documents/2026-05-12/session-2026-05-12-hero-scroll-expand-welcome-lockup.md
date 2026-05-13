# Session log – 2026-05-12 (hero scroll-expand welcome lockup)

## Summary
Home **`HeroScrollExpand`** first-phase three-line stack now uses **`heroScrollExpandHeadlineLines`**: **Welcome to** / **Ensemble** / **Digital Labs** instead of **Not just a** / **marketing** / **agency**. **`headlineLines`** stays for **`Hero.jsx`** if used. **`heroWelcomeLine`** cleared to avoid duplicating the welcome above the stack.

## Changes
- `src/lib/content.js` — `heroWelcomeLine: ''`, `heroScrollExpandHeadlineLines`, comment on `headlineLines`.
- `src/pages/Home.jsx` — pass `leadText` / `focalText` / `tailText` from `heroScrollExpandHeadlineLines`.

## Next steps
- None.
