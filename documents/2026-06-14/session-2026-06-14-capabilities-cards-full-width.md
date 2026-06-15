# Session log – 2026-06-14 (capabilities cards full-width large screens)

## Summary
Service cards on the home capabilities section now expand fluidly on large screens — removed the tight 72rem cap for this band, use full width minus chapter-rail clearance, and scaled column gaps with viewport.

## Changes
- **`src/components/home/chapters/HomeChapterCapabilities.jsx`** — `home-capabilities-chapter` class; full-width grid with fluid gaps.
- **`src/index.css`** — Capabilities inner `max-width: none`; rail-only right padding; `minmax(0,1fr)` columns; reduced helix gutter on xl/2xl so content can breathe without dead right-side gap.

## Notes
- Helix ribbon still clears via smaller `--home-helix-gutter` on 1280px+ / 1920px+.
- Other home chapters keep existing helix max-width behavior.

## Update — rail-safe full width

Cards expand to fill viewport minus a fixed `--home-chapter-rail-clearance` (~10.5–12rem) so the right column never overlaps the chapter rail; column gaps capped on xl/2xl so extra space goes to card width.

## Next steps
- Visual QA at 1440px and 2560px on `#home-capabilities`.
