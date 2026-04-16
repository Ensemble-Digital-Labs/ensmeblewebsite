# Session log – 2026-04-16 (Insights / Case Studies full-viewport background)

## Summary

Fixed the background “cut off” on Insights and Case Studies: `ParallaxDepth` defaulted to `min-h-0`, so the block only grew with content and the absolute backdrop stopped mid-page. Removed default `min-h-0` on the parallax root, applied `min-h-[100svh] min-h-screen` + padding on those two pages, and added `min-h-full` on the backdrop layer slot. Single `ParallaxDepth` wrapper replaces the old outer `div`.

## Changes

- `src/components/ui/ParallaxDepth.jsx` — drop default `min-h-0`; backdrop layer uses `min-h-full`.
- `src/pages/Insights.jsx` — full-height `ParallaxDepth` with `box-border` + vertical padding.
- `src/pages/CaseStudies.jsx` — same.

## Notes

- Other routes using `ParallaxDepth` without `min-h-screen` keep content-sized height; if any layout regresses, add `min-h-0` via `className` on that instance.
