# Session log – 2026-05-14

## Summary
On viewports **≥1440px** (`2xl` in this repo’s Tailwind config), the “How we grow your practice” feature rail (`HeroStatsTrustBand`) used `lg:justify-start`, so the three stacked cards stayed top-aligned and left a large empty band under them while the right image column stretched full height. Added **`2xl:justify-between`** on the scroll rail so the three items distribute vertically and fill the column.

## Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx` — `hero-outcomes-scroll` flex classes: `lg:justify-start 2xl:justify-between`.

## Notes
- `2xl` is defined as **1440px** in `tailwind.config.js`, matching the user’s breakpoint language.

---

## Update — same vertical fill from `lg` (1024px+)

### Summary
User asked to apply the same behavior above **1024px** (not only from 1440px). Replaced `lg:justify-start 2xl:justify-between` with **`lg:justify-between`** so the three feature cards distribute vertically for all desktop two-column layouts.

### Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx` — `hero-outcomes-scroll`: `lg:justify-between` only.

---

## Update — mobile / tablet text clipping in outcomes band

### Summary
The section used a fixed **`h-[100svh]`** with **`overflow-y-hidden`**, so stacked content (image, feature rail, marble stats) was clipped on short viewports. Below **`lg`**, the section now uses **`min-h-[100svh]` + `h-auto` + `overflow-y-visible`**, inner wrappers allow overflow on small screens, the main grid drops the rigid **`minmax(0,1fr)`** row, the feature rail allows **`overflow-y-visible`** under **`lg`**, active feature copy gets bottom padding, and stat numerals use **`leading-[1.06]`** instead of **`leading-none`**.

### Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx` — section shell, wrappers, grid, scroll rail, description + stat typography.
