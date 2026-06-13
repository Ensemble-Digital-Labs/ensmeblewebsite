# Session log – 2026-06-13 (home ribbon helix + left rail layout)

## Summary
Re-enabled WebGL DNA helix on `/` using the experiments-style ribbon (`DnaCapitalHelixCanvas` + ensemble theme). Restructured homepage content to a left column with the helix reserved on the right.

## Changes
- **`src/lib/homeDnaFeature.js`** — `HOME_PAGE_DNA_HELIX_ENABLED = true`, variant `ribbon` (document double-helix preserved as `document`).
- **`src/pages/Home.jsx`** — mounts `DnaCapitalHelixCanvas`; `home-influx-deck--helix-rail` layout class.
- **`src/hooks/useHomeHelixIntro.js`** — ribbon intro after loader.
- **`src/lib/dnaCapitalScrollPhases.js`** — scroll phases map to home section IDs.
- **`src/components/home/chapters/HomeChapterHero.jsx`** — left-aligned hero when helix rail active.
- **`src/components/home/HomePageSections.jsx`**, **`HomeDeckSectionShell.jsx`** — `home-deck-section-inner` + helix rail prop to hero.
- **`src/index.css`** — `--home-helix-gutter`, content max-width, z-index stack.

## Notes
- `/experiments` unchanged.
- Restore scroll-linked double helix: set `HOME_PAGE_HELIX_VARIANT = 'document'`.
