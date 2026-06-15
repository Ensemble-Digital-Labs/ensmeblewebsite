# Session log – 2026-06-14 (service cards + rail compact + Roman numerals)

## Summary
Service vertical cards now show full description text (no line clamp) with taller min-heights. Homepage chapter rail is narrower with tighter label-to-number spacing, Roman numerals (I–VIII), and reduced right gutter / helix margin so content has more room.

## Changes
- **`src/components/ui/ServiceVerticalCard.jsx`** — Removed `line-clamp-4`; increased card min-heights.
- **`src/components/home/chapters/HomeChapterCapabilities.jsx`** — Stagger on `<li>` via CSS margins; `data-home-reveal` moved to inner wrapper so GSAP scroll animation no longer flattens offsets.
- **`src/components/home/HomeSectionIndex.jsx`** — Roman numerals; tighter rail item gap and padding.
- **`src/index.css`** — Smaller `--home-rail-gutter`, `--home-helix-gutter`, and `.home-scroll-spy__inner` width.

## Notes
- Rail labels unchanged (Story, Expertise, etc.); only index numbers are Roman.
- Helix gutter reduction gives service cards more horizontal space on laptop when ribbon helix is active.

## Next steps
- Visual QA at 1024px and 1440px on `#home-capabilities`.
