# Session log – 2026-05-14

## Summary
Replaced the single Trust “Signal” stat slab with **three separate glass cards** (one per metric from `heroContent.stats`), removed the **Signal** label, widened the Trust column shell for `lg`, and introduced **`TrustStatCards`** (deleted `HeroSignalExpandable.jsx`).

## Changes
- Added `src/components/home/TrustStatCards.jsx`.
- `src/components/home/HomePageSections.jsx` — Trust band uses `TrustStatCards`; section inner `max-w-*` bumped to `md:max-w-5xl lg:max-w-6xl`.
- Deleted `src/components/home/HeroSignalExpandable.jsx`.

## Notes
- Layout: `grid-cols-1` → `sm:grid-cols-3` with responsive gaps; cards use equal min-heights and `home-scene-*` styling.
