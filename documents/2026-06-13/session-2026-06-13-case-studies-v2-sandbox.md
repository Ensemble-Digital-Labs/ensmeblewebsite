# Session log – 2026-06-13 (case-studies-v2 sandbox)

## Summary
Added an isolated `/case-studies-v2` route and component copies so DNA-style carousel experiments can run without touching production `/case-studies`.

## Changes
- Created `src/lib/caseStudiesGalleryRoutes.js` — shared `isCaseStudiesGalleryRoute()` for v1 + v2
- Created `src/pages/CaseStudiesV2.jsx`
- Created `src/components/case-studies-v2/CaseStudyPortfolioGalleryV2.jsx`
- Created `src/components/case-studies-v2/CaseStudyGalleryCardV2.jsx`
- Created `src/styles/case-studies-portfolio-v2.css` — small “v2 sandbox” badge
- Updated `src/app/AnimatedRoutes.jsx` — route + fast transition for v2
- Updated `src/app/layout.jsx`, `FullscreenNav.jsx`, `HomeAtmosphereCanvas.jsx`, `atmosphericRoutes.js` — v2 gets same gallery shell (native scroll, no footer, nav gallery mode)

## Notes
- v2 starts as a clone of v1 gallery; iterate in `case-studies-v2/` and `case-studies-portfolio-v2.css` only
- Card links still go to `/case-studies/:slug` for detail pages
- Not added to main nav — visit directly at `/case-studies-v2`

## Next steps
- Experiment with DNA `/companies` patterns (100svh lock, intro stagger, drag tuning) in v2 gallery only

---

# Session log – 2026-06-13 (case-studies-v2 DNA pass 1)

## Summary
First DNA Capital `/companies` iteration on `/case-studies-v2`: top-right filters, center-out intro stagger, side monogram vs center wordmark, filter-change fade.

## Changes
- Updated `CaseStudyPortfolioGalleryV2.jsx` — staggered intro, filter fade hook, v2 gallery class
- Updated `CaseStudyGalleryCardV2.jsx` — monogram mark instead of photo thumbnail
- Updated `CaseStudiesV2.jsx` — removed duplicate mobile h1; leaner stage
- Expanded `case-studies-portfolio-v2.css` — layout + DNA card content swap

## Notes
- Side slides show initials monogram; focused slide reveals large wordmark + title/CTA via existing `--csp-focus` vars
- Production `/case-studies` untouched

## Next steps
- Tune drag inertia / snap to match DNA feel
- Optional client logo assets when available
- Per-card intro clip stagger refinement

---

# Session log – 2026-06-13 (case-studies-v2 line ↔ wave)

## Summary
v2 carousel now collapses to a flat horizontal ribbon while dragging/wheeling, then eases back into the DNA wave stagger when motion settles.

## Changes
- `CaseStudyPortfolioGalleryV2.jsx` — `waveBlendRef`, fast collapse on interaction, slower restore on idle; horizontal spread + uniform-ish card sizes in line mode
- `case-studies-portfolio-v2.css` — line-active slide hints

## Notes
- `waveBlend` 0 = all cards same Y, wider spacing; 1 = wave offsets + center hero scale
- Animation loop keeps running until wave restore completes after snap

## Update (wave ease symmetry)
- Removed instant `waveBlend = 0` on drag/wheel — collapse uses same smooth easing as restore
- Single `WAVE_BLEND_SPEED` for both directions; `wheelActive` latch so flatten starts on first scroll frame without a blink

## Update (filter + card title spacing)
- Filters back to **bottom-right** on v2; carousel bottom padding restored for clearance
- Title wrap + blue line inset from card left; extra gap above card top for labels like “SPINE CARE”
- Card glass panel aligned with same inset rhythm

## Update (center card scale)
- Slightly larger focused card dimensions in `CaseStudyPortfolioGalleryV2.jsx` (~7% width/height at center)

## Update (blue line gutter)
- Blue accent line offset left of card panel via `--csp-v2-line-card-gap` (~0.7–1.05rem) so it no longer sticks to the card edge

## Update (monogram / wordmark swap)
- Sharper idle crossfade at `--csp-size-focus` ~0.54 so logo + wordmark don’t overlap
- In scroll/line mode (`is-line-active`): monogram only; wordmark, title, and learn-more hidden

## Update (monogram-only card center)
- Removed in-card wordmark text; centered monogram scales up on focused card

## Update (card visibility)
- Raised slide opacity floor (side cards ~0.5 → center 1.0), slightly stronger glass panel + monogram opacity

## Update (intro title clip fix)
- Intro wipe clip moved from slide to inner `__panel` so title above card is not clipped during expand

## Update (v2 particle field)
- Added `CaseStudiesV2DnaCanvas` — full-viewport DNA shader stack (starfield + helix + wave) on `/case-studies-v2`
- Replaces corner-only `CaseStudiesDnaCanvas` on v2; soft scrim keeps carousel readable

## Update (v2 starfield only)
- Disabled helix GLB + wave grid on v2; starfield particles only (`includeHelix` / `includeWave` options in shader helper)

## Update (learn more placement)
- Moved CTA outside clipped panel; ~half hangs past card right edge (DNA-style)

## Update (active label fade)
- Title + learn more smooth fade on center focus (not pop-in)

## Update (learn more nudge up again)
- Further raised learn-more bottom (~1–1.25rem) on all breakpoints
