# Session log – 2026-05-14

## Summary
Removed expand/collapse from the Signal trust card: no Details button, no Framer Motion height animation; detail bullets render as a static list under the stats when `signalExpandBullets` is present.

## Changes
- `src/components/home/HeroSignalExpandable.jsx` — simplified to static markup only (`HeroSignalExpandable` name kept for import stability).
