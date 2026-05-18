# Session log – 2026-05-15

## Summary
Fixed a double pixel-grid transition when jumping home chapters via the right-hand rail: the deck-sync effect was firing `withPixelCover` a second time because `visualSlideIndex` updated inside the rail’s cover before the debounced scroll index caught up.

## Changes
- `src/components/home/HomeStoryViewport.jsx`: skip debounced→visual sync while `syncingRailRef` is true; release rail sync after `RAIL_SCROLL_SYNC_RELEASE_MS` (165ms, after the 120ms debounce) instead of clearing immediately when `goToSlideById` finishes.

## Notes
- Manual scroll-driven chapter changes are unchanged (`syncingRailRef` stays false).
