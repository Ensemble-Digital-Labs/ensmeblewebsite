# Session log – 2026-06-14 (footer bottom line fix)

## Summary

Removed unintended bottom border on cinematic footer caused by legacy poppr `footer { border-bottom }` styles applying to `CinematicFooter`.

## Changes

- Updated `src/index.css` — scope legacy footer rules to `footer:not(.cinematic-footer-wrapper)`
- Updated `src/styles/cinematic-footer.css` — explicit `border-bottom: none` on cinematic footer

## Notes

- Line was `--color-brand-primary` 1px border from old `Footer.jsx` stylesheet, not ENSEMBLE watermark art.
