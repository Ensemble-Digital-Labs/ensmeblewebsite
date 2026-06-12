# Session log – 2026-06-12 (Ensemble 2026 asset library)

## Summary

Created a new canonical asset folder `public/ensemble-2026/` for all replacement site media. Added path registry, full manifest checklist, and wired homepage imagery to the new paths (old `/assets/` and Unsplash URLs deprecated for home).

## Changes

- Created `public/ensemble-2026/` folder tree (branding, home chapters, pages, shared, previews, icons, videos)
- Created `public/ensemble-2026/README.md` — folder rules and migration notes
- Created `public/ensemble-2026/ASSET-MANIFEST.md` — complete file checklist with specs
- Created `src/lib/ensemble2026Assets.js` — single path registry for all new assets
- Updated `src/lib/homeImagery.js` — points to `ensemble-2026` paths
- Updated `HomeChapterBrand.jsx` — dedicated brand overlay paths
- Added `.gitkeep` in empty subfolders so structure is tracked in git

## Decisions / notes

- Legacy `public/assets/` and `public/revamp-assets/` remain on disk but should not receive new files
- Images will 404 until files are dropped in — follow `ASSET-MANIFEST.md` filenames exactly
- Next code migrations: `branding.js`, `content.js` carousel, `healthcareCaseStudies.js`, `Loader.jsx`, capability icons

## Next steps

- Produce assets per manifest (hero, brand collage, expertise, work covers, testimonials)
- Wire remaining modules to `ensemble2026Assets.js` as files land
- Retire or archive old `public/assets/images/dashboards/` and HUD art
