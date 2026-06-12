# Session log – 2026-06-12 (Hero collage layout)

## Summary

Replaced the straight 4-column hero masthead grid with a scattered editorial collage — rotated, overlapping tiles at varied positions (PopArt-style, not a rigid row).

## Changes

- Created `src/components/home/HomeHeroVisualCollage.jsx`
- Updated `HomeChapterHero.jsx` — uses collage component; images break out of narrow headline column
- Added `.home-hero-collage` styles in `src/index.css`
- Tweaked `useHomeHeroEntrance.js` — stagger timing for collage tiles

## Notes

- Mobile-first: tiles overlap within bounds; no 2×2 or 4-across grid
- Hover nudges rotation on desktop; reduced-motion safe

---

## Update — hero relevant items animation

### Summary
Added floating proof chips (HIPAA, patients, revenue, etc.) around the collage with GSAP entrance + subtle idle float. Collage tiles now snap in with rotation/back ease and continuous gentle drift.

### Changes
- `HOME_HERO_RELEVANT_ITEMS` in `homeInfluxContent.js`
- `HomeHeroRelevantItems.jsx` — glass proof chips
- `HomeHeroVisualCollage.jsx` — float wrapper per tile
- `useHomeHeroEntrance.js` — chip + tile rotation timeline
- `HomeChapterHero.jsx` — `home-hero-stage` wrapper
- `index.css` — chip positions, float keyframes, reduced-motion off

---

## Update — hero left/right flanking rails

### Summary
Hero uses a 3-column layout from `md` up: proof chips + photo tiles on left and right of headline/CTAs. Mobile keeps bottom collage only.

### Changes
- `HOME_HERO_LEFT_ITEMS`, `HOME_HERO_RIGHT_ITEMS` in `homeInfluxContent.js`
- `HomeHeroSideRail.jsx` — desktop flanking columns
- `HomeChapterHero.jsx` — grid layout
- `index.css` — rail tile/chip positioning

---

## Update — raise hero center copy

### Summary
Moved headline + CTA block up slightly; left/right rails unchanged. Grid uses `items-start` instead of vertical centering on side columns.

### Changes
- `HomeChapterHero.jsx` — `md:items-start`
- `index.css` — `.home-hero-center` negative translate (responsive)

---

## Update — remove hero proof pills

### Summary
Removed all small proof chip pills from hero (desktop side rails + mobile collage). Side rails show photo tiles only.

### Changes
- Removed chip data from `homeInfluxContent.js`
- Deleted `HomeHeroRelevantItems.jsx`
- Simplified `HomeHeroSideRail.jsx`, `HomeChapterHero.jsx`, `useHomeHeroEntrance.js`

---

## Update — hero center nudge up (follow-up)

Increased `.home-hero-center` negative translate (~0.75–1.25rem more at md/lg).
