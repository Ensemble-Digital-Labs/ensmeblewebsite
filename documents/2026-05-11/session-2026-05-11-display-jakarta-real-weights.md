# Session log – 2026-05-11

## Summary
Headings and nav still looked unchanged because **Runtime only ships one Regular file**—multiple `@font-face` weights all map to the same outlines, so faux 700/800 barely differed. **`.section-heading-neon` also forced `font-weight: 600`** on the non-split hero headline. Fixed once by loading **Plus Jakarta 800**, putting **Plus Jakarta first** in the `font-display` stack (real bold masters), raising neon / fullscreen menu / hero CSS weights, **semibold** on the sticky nav CTA, and aligning footer giant type.

## Changes
- `index.html` — Plus Jakarta Google Fonts link includes **800**
- `tailwind.config.js` — `fontFamily.display` and `antique`: **Plus Jakarta Sans** before Runtime
- `src/index.css` — hero main heading, hero gradient, section neon headings, fullscreen `.fs-menu-label`: Jakarta-first stacks; neon **800**; menu labels **800**
- `src/lib/growthCtaClasses.js` — `growthPrimaryNav`: **font-semibold**
- `src/components/FullscreenNav.jsx` — menu label span **font-extrabold**
- `src/styles/cinematic-footer.css` — `.footer-giant-bg-text`: Jakarta first, **font-weight 800**

## Notes
- Runtime remains in the stack for fallback/character coverage; visible weight now comes from Jakarta where `font-display` is used.
- Prior `#root h1–h6` rule at end of `index.css` unchanged (still enforces 800 on semantic headings).

## Next steps
- If a specific block must stay on Runtime-only for brand, scope an override there.
