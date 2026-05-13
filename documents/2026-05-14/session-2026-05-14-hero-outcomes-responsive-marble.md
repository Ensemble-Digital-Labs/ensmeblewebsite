# Session log – 2026-05-14

## Summary
Tuned `HeroStatsTrustBand` for short laptops: more horizontal padding and `lg:overflow-x-visible` so feature cards are not clipped; marble stat strip uses a fixed **25svh** height on `lg+` with a denser stat/trust typography so the upper practice block matches the intended ~75/25 split. Image column uses `lg:min-h-0` + flex so the grid can shrink when the bar is reserved.

## Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx`

## Notes
- Mobile/tablet: marble bar remains content-driven height (`mt-auto`); fixed 25% applies from `lg` breakpoint only.

---

## Follow-up (clipping + bar proportion)

### Summary
`#main` still clips wide shadows at ~1280px when horizontal padding was only ~2.5rem. Reinforced one-viewport band + **25svh** marble with **`section#hero-stats-trust`** rules in `index.css`. Increased horizontal inset with **`max(rem, vw)`** padding, **`lg:grid-rows-[minmax(0,1fr)]`** so the two-column row can shrink, slightly smaller active-card shadow, removed **`xl` min-height** on the outcomes image so the grid does not force excess height.

### Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — padding, grid row, shadow, marble `flex-[0_0_25svh]`, `lg:max-h-[100svh]` on section
- `src/index.css` — `@media (min-width: 1024px)` for `#hero-stats-trust` + `.hero-outcomes-marble-bar` heights

---

## Follow-up (left rail height vs image + visible copy)

### Summary
Replaced `lg:justify-between` on the feature rail with `justify-start`, added a **`flex-1` spacer** after the cards so the left column’s **total flex height matches the image column** without growing or squashing individual cards. Relaxed flex (`lg:flex-none`, `lg:min-h-min`, text column `lg:shrink-0`) so descriptions are not clipped. Image column uses **`self-stretch`** in the grid.

### Changes
- `src/components/sections/HeroStatsTrustBand.jsx`

---

## Follow-up (short viewport height — no inner scroll, no bar overlap)

### Summary
For `lg` + `max-height: 820px`, the fixed `100svh` shell and marble bar sat above the third feature card in z-order. Section uses **`height: auto`** (min `100svh`) and **`overflow-y: visible`** so content stacks above the marble; feature rail stays **`overflow-y: visible`** (no inner scrolling).

**Revision (felt “too short”):** the **820px** query now only adjusts section/shell overflow — no headline/image/marble shrink there. **Mild** compaction at **`max-height: 700px`**; **stronger** compaction only at **`max-height: 640px`**.

### Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — classes `hero-outcomes-section`, `hero-outcomes-shell`, `hero-outcomes-head`, `hero-outcomes-cta-wrap`, `hero-outcomes-visual`; rail `lg:overflow-y-visible`
- `src/index.css` — `@media (min-width: 1024px) and (max-height: 820px | 700px | 640px)` outcomes blocks
