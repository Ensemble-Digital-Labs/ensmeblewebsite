# Session log – 2026-05-14

## Summary
Removed the three bullet lines under the Trust band Signal card; dropped `signalExpandBullets` from `heroContent` and the `expandBullets` prop from `HeroSignalExpandable` (stats-only card).

## Changes
- `src/components/home/HeroSignalExpandable.jsx` — stats + label only.
- `src/components/home/HomePageSections.jsx` — `HeroSignalExpandable` call no longer passes bullets.
- `src/lib/content.js` — removed `heroContent.signalExpandBullets`.
