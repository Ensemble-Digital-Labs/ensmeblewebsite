
# Session log – 2026-06-19

## Summary
Reviewed `manus-ensemble-website-motion-handoff.md` in `documents/` — identified as unused Manus AI motion handoff doc (partially stale). Deleted per user cleanup request.

## Changes
- Deleted `documents/manus-ensemble-website-motion-handoff.md`

## Notes
- File was a one-off export for Manus/external builders describing GSAP, Locomotive, ScrollTrigger, and hero WebGL patterns.
- Not referenced anywhere in `src/`; motion guidance now lives in Cursor rules, README, and the codebase itself.
- Home has evolved since the doc was written (DNA helix, `HomePageDnaCanvas`, loader gate) — doc was increasingly outdated.


## Summary
Created `documents/website-content/` with subfolders for website source documents and moved marketing/copy assets from the project root into organized locations.

## Changes
- Created `documents/website-content/` with `copy-briefs/`, `print/`, `decks/`, `video/`, `reference/`
- Added `documents/website-content/README.md` (folder index)
- Moved 8 new marketing assets from repo root into subfolders
- Moved 2 legacy PDFs from root into `reference/` (renamed for cleaner paths)

## Notes
- Videos total ~842 MB — keep out of git unless using LFS
- `documents/` remains for dated session logs; `website-content/` is for collateral and copy source files


## Summary
Moved three promo/event videos from `documents/website-content/video/` to `public/assets/videos/` for website use; registered paths in `ensemble2026Assets.js`.

## Changes
- Moved and renamed videos to `public/assets/videos/`:
  - `ensemble-brand-reel-primary.mp4` (514 MB)
  - `ensemble-brand-reel-short.mp4` (208 MB)
  - `ensemble-event-conference.mp4` (110 MB)
- Updated `src/lib/ensemble2026Assets.js` with `ensembleSiteVideos` export
- Updated `documents/website-content/README.md`
- Removed empty `documents/website-content/video/` folder

## Notes
- Use `ensembleSiteVideos` from `ensemble2026Assets.js` when wiring hero, about, or conference sections
- Existing loader video unchanged: `/assets/videos/ensemble-website.mp4`


## Summary
Wired pixel route transition (NavPixelLink) into cinematic footer CTAs, case study gallery/portfolio cards, and StandardCTA (case study detail back link and other routed CTAs).

## Changes
- `src/components/CinematicFooter.jsx` — Contact, Services, Privacy, Terms, Support use `NavPixelLink` via `MagneticButton`
- `src/components/case-studies/CaseStudyGalleryCard.jsx`
- `src/components/case-studies-v2/CaseStudyGalleryCardV2.jsx`
- `src/components/case-studies/CaseStudyPortfolioCard.jsx`
- `src/components/StandardCTA.jsx` — all `StandardCTA` links (incl. case study not-found)

## Notes
- Pixel wipe still desktop-only per `shouldUsePixelNav`; mobile keeps instant nav + Framer fade
