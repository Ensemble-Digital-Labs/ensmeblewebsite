# Session log – 2026-06-12 (case studies heading hide on menu open)

## Summary
“CASE STUDIES GALLERY” no longer overlaps the fullscreen nav menu — hidden while menu is open, visible beside logo on gallery page when menu is closed.

## Changes
- **`FullscreenNav.jsx`** — render heading only when `!isMenuOpen` on case studies route
- **`case-studies-portfolio.css`** — reduced menu top padding; tighter brand row when menu open

## Notes
- Menu already includes “Case Studies” link (03); page title returns when menu closes
