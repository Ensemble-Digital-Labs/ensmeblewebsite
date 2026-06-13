# Session log – 2026-06-13 (chapter rail right)

## Summary
Moved homepage desktop chapter sidebar (STORY, EXPERTISE, etc.) from left to right on laptop (1024px+). Track, active dot, labels, and enter animation mirrored for right-side placement.

## Changes
- Updated `src/components/home/HomeSectionIndex.jsx` — fixed `right` positioning, reversed item layout, GSAP slide from right
- Updated `src/index.css` — track/indicator on right, section `padding-right` gutter; helix-rail deck skips extra padding (rail over helix margin)

## Notes
- Mobile compact rail unchanged (already on the right)
