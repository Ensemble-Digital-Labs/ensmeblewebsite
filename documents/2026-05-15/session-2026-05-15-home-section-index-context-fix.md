# Session log – 2026-05-15 (home section index context fix)

## Summary
The right-hand chapter rail stayed on `01` because `HomeSectionIndex` was rendered **outside** `HomeStoryContext.Provider`, so `useHomeStory()` was always `null` and the active slug defaulted to the first section. Moved the rail **inside** `HomeStoryViewport`’s provider scope.

## Changes
- Updated `src/components/home/HomeStoryViewport.jsx` — render `<HomeSectionIndex />` as a child of `HomeStoryContext.Provider`
- Updated `src/pages/Home.jsx` — removed duplicate `HomeSectionIndex` render

## Notes
- Rail remains `position: fixed` so DOM order under the provider does not affect layout.
