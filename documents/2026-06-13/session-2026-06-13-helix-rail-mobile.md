# Session log – 2026-06-13 (helix rail mobile layout)

## Summary
Scoped homepage helix-rail left content layout to laptop (1024px+). Mobile and tablet keep centered hero and full-width sections; helix stays behind content without left gutter restructuring.

## Changes
- Updated `src/index.css` — helix gutter, section max-width, and left margins only apply at `min-width: 1024px`
- Updated `src/components/home/chapters/HomeChapterHero.jsx` — centered hero on mobile; left-aligned at `lg:` breakpoint

## Notes
- WebGL helix already uses `narrow` layout on mobile (`dnaHelixLayout.js`) — no JS change needed
- Laptop layout unchanged: content left, ribbon right
