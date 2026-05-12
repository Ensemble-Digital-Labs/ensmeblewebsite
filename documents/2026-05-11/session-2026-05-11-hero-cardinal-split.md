# Session log – 2026-05-11 — Cardinal-style split hero

## Summary

Refactored the home hero toward a **Cardinal Digital Marketing–style** layout when `heroPortraitSrc` is set: **navy editorial gradients** (no full-bleed tech wallpaper), **left bold sans headline** with **warm accent line**, **subhead in a light glass strip**, **warm pill primary CTA + circular arrow**, **right column portrait** with **concentric arc rings** (teal/warm), **stats + trust** in a **two-column row** below. Legacy **full-bleed background** remains when `heroPortraitSrc` is `null`.

## Changes

- **`src/lib/content.js`** — `heroPortraitSrc` (default Unsplash portrait), `headlineAccentLineIndex`.
- **`src/components/sections/Hero.jsx`** — Split vs legacy branches; `HeroGrowthArcs`, `HeroStatsAndTrust` helpers; primary CTA Link pattern with `ArrowRight`.

## Notes

- Replace `heroPortraitSrc` with a **local** `/assets/...` image for production (HIPAA/brand control).
- Set **`heroPortraitSrc: null`** to restore the previous full-bleed hero background treatment.
