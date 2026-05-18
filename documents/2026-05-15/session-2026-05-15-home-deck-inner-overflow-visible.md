# Session log – 2026-05-15

## Summary
Home story deck sections (all `SectionShell` with `deckFrame`) now pass `deckInnerOverflowVisible={df}` like the hero, so the max-width inner shell uses `overflow-y-visible` instead of default `overflow-y-auto`, removing the nested in-slide scrollbar.

## Changes
- `src/components/home/HomePageSections.jsx`: added `deckInnerOverflowVisible={df}` to every deck chapter shell except hero (already had it); clarified comment on `SectionShell` inner overflow.

## Notes
- Outer `section` still uses `overflow-hidden` in deck mode for layout; chapter scrolling remains on `#main` + pinned sticky deck.
