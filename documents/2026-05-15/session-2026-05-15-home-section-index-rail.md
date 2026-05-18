# Session log – 2026-05-15 (home section index)

## Summary
Added a fixed numbered chapter rail on the canonical home route (`/`) that tracks the section in the viewport’s center band and jumps to each viewport-tall band via Lenis (or native `#main` scroll). Centralized section order in `homeNarrativeSections.js` so the index stays aligned with `HomePageSections`.

## Changes
- Created `src/lib/homeNarrativeSections.js` — ordered `id` + label list for 11 home bands
- Created `src/components/home/HomeSectionIndex.jsx` — IntersectionObserver-driven active state + jump buttons
- Updated `src/pages/Home.jsx` — mount `HomeSectionIndex` on `/` only (component also gates on pathname)
- Updated `src/lib/utils.js` — `scrollMainToTarget()` (Lenis-first, `scrollIntoView` fallback)
- Updated `src/components/home/HomePageSections.jsx` — header comment to keep chapter list in sync with the manifest

## Decisions / notes
- **No CSS `scroll-snap` on `#main`:** smooth Lenis + snap often fight; narrative is carried by full-height bands + the index instead.
- **Intersection root:** viewport with `rootMargin: -42% 0px -42%` so the “active” chapter matches the middle of the screen (RDS-style story rhythm).
- **Touch targets:** jump buttons use at least ~42×42px tap area on narrow screens (`min-h/min-w`), relaxing on `sm+`.
- Labels show from `lg` up; shorter screens still get numbered index + `title` for full name.

## Next steps (optional)
- If the active chapter flickers near short bands, tighten thresholds or add a tiny scroll-linked debounce.
- Consider syncing URL hash (`#home-hero`, etc.) without fighting route transitions.
