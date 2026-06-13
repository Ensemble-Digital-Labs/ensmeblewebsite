# Session log – 2026-06-12 (case study back link spacing)

## Summary
Fixed “Back to Case Studies” overlapping the fixed nav logo on detail pages by increasing top inset and wrapping the link in a nav row below the header zone.

## Changes
- **`src/pages/CaseStudyDetail.jsx`** — `pt-28 sm:pt-32 lg:pt-36`; back link in `<nav>` with extra top margin.
