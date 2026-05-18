# Session log – 2026-05-15 (home deck viewport + scroll chapters)

## Summary
Restructured canonical `/` home into a **pinned single-viewport “deck”**: one chapter visible at a time inside the hero frame while `#main` scroll runs through a tall `min-height: n×100svh` region. Scroll progress maps to chapter index (debounced); each index change runs the **pixel cover** (unless reduced motion). The numbered rail uses `goToSlideById` + Lenis scroll to the matching story progress.

## Changes
- Added `src/components/home/HomeStoryViewport.jsx` — tall pin region, ScrollTrigger `home-story-deck-pin`, context (`useHomeStory`), `goToSlideById`
- Updated `src/components/home/HomePixelTransition.jsx` — `withPixelCover` queues on `busyRef` instead of silent no-op; context exposes `homeMotionReduced`
- Updated `src/hooks/useHomeSequentialReveals.js` — deck-only reveals scoped to `#home-deck-slide` per `activeSlideIndex`
- Updated `src/components/home/HomePageSections.jsx` — `deckFrame` on `SectionShell`; render `deckIdx` slide only; `home-deck-slide` wrapper
- Updated `src/components/home/HomeSectionIndex.jsx` — active step from `story.visualSlideIndex`; clicks call `goToSlideById`
- Updated `src/pages/Home.jsx` — `HomeStoryViewport` wraps `HomePageSections` inside `#home-scroll-root`

## Decisions / notes
- **No CSS scroll-snap** on `#main` (Lenis); discrete chapter index comes from `floor(progress × n)`.
- **Debounced index (120ms)** avoids pixel spam while smooth scroll crosses boundaries.
- **Rail** uses pixel + programmatic scroll; `syncingRailRef` suppresses ST churn during sync.
- Long slide content scrolls **inside** the pinned frame (`overflow-y-auto` on `SectionShell` inner when `deckFrame`).

## Next steps (optional)
- Tune debounce / ST refresh if chapter highlight lags on fast scroll.
- Add a subtle “scroll for next chapter” cue on non-final slides if analytics show discoverability issues.
