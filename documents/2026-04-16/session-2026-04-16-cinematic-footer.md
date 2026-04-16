# Session log – 2026-04-16 (cinematic / motion footer)

## Summary

Integrated a 21st.dev–style cinematic footer adapted for Ensemble (Vite + React Router, no shadcn CLI): full-viewport footer with marquee, giant “ENSEMBLE” parallax text, glass pills, magnetic CTAs, GSAP ScrollTrigger scrubbed to `#main` (Locomotive/Lenis proxy), and Lenis-based back-to-top. Added optional `CinematicSectionBand` marquee strips between Home sections for scroll rhythm. Styles live in `src/styles/cinematic-footer.css`; `Layout` now renders `CinematicFooter` instead of `Footer`.

## Changes

- Added `src/styles/cinematic-footer.css` — keyframes, glass pills, grid, aurora, giant text, section band
- Added `src/components/CinematicFooter.jsx` — `CinematicFooter`, `CinematicSectionBand`, `MagneticButton`
- Updated `src/main.jsx` — import cinematic footer CSS
- Updated `src/app/layout.jsx` — `CinematicFooter` replaces `Footer`
- Updated `src/pages/Home.jsx` — two `CinematicSectionBand` instances (after Hero, after carousel)

## Notes

- Original snippet’s TypeScript, `@/` imports, and shadcn semantic tokens were adapted to project `cn`, React Router `Link`, and explicit zinc/cyan palette.
- `ScrollTrigger` uses `scroller: '#main'` to match existing Locomotive setup.
- `Footer.jsx` is retained but unused by layout; remove or repurpose later if desired.
