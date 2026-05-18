# Session log – 2026-05-13

## Summary
Archived the previous full homepage at route `/home-v1` (`HomeV1.jsx`) and replaced the root `/` page with a minimal blank canvas. Global navigation and footer remain from `layout.jsx`.

## Changes
- Created `src/pages/HomeV1.jsx` — former `Home.jsx` content (loader, hero, sections).
- Updated `src/pages/Home.jsx` — empty `min-h-[100dvh]` `#050816` shell only.
- Updated `src/app/AnimatedRoutes.jsx` — import `HomeV1`, register `<Route path="/home-v1" element={<HomeV1 />} />`.

## Notes
- Logo and “back home” links still point to `/` (blank). Open `/home-v1` for the previous experience.

## Next steps
- Wire nav or logo to `/home-v1` if you want one-click access to the archived homepage from the menu.
