# Session log – 2026-06-12

## Summary
Reworked `/case-studies` to follow the Groote Schuur Hospital Trust “Our Impact” project card pattern: overlapping image + cream panel, category tag on photo, filter tabs with skewed underline, sort dropdown, 2-column grid, and pagination.

## Changes made
- **Created** `src/components/case-studies/CaseStudyImpactCard.jsx` — GSH-style overlap card with grayscale-to-color hover, rounded image top on hover, category pill, “Free audit” + “Read case study” CTAs
- **Created** `src/components/case-studies/CaseStudyFilterBar.jsx` — uppercase filter tabs + sort select
- **Updated** `src/pages/CaseStudies.jsx` — warm listing band, intro copy, 2-col grid, 6 items per page, pagination

## Decisions / notes
- Ensemble palette preserved: growth gradient primary CTA, navy category tags, cream panel `#f7f6f0`, page band `#f5f5ed`
- Conversion CTA maps GSH “Donate” → `/free-practice-audit`
- Existing `caseStudies` / `caseStudyFilters` data unchanged
- Build verified (`npm run build`)

## Next steps
- Optional: add hero banner image band like GSH `/our-impact` top section
- Replace Unsplash placeholders with local case study art when available

---

## Update – Case studies background

### Summary
Removed pink `BackgroundPathsParallaxLayer` backdrop; page now uses flat warm cream `#f5f5ed` (GSH-style) end-to-end.

### Changes
- **Updated** `src/pages/CaseStudies.jsx` — dropped `ParallaxDepth`, solid `bg-[#f5f5ed]` on page wrapper

---

## Update – Dark home atmosphere + animated parallax

### Summary
Restored animated `BackgroundPathsParallaxLayer` on `/case-studies` with a **dark navy home-style** base (`#050816` → `#14122a`, rose/cyan glows). Page copy/filters use white type; cream GSH cards unchanged. `#main` is transparent on this route; nav gets dark backdrop tone.

### Changes
- **Updated** `BackgroundPaths.jsx` — `tone="dark"` variant for parallax layer
- **Updated** `CaseStudies.jsx` — `ParallaxDepth` + dark paths, light typography, nav atmosphere event
- **Updated** `CaseStudyFilterBar.jsx` — `dark` prop for filter/sort on navy
- **Updated** `layout.jsx` — `bg-transparent` for `/case-studies` like home

---

## Update – Match home hero plum (not navy)

### Summary
Case studies parallax backdrop now uses the same **hero atmosphere** as `/` (`#14122a` → `#221c4a` with warm orange + lavender blobs), not cold navy `#050816`.

### Changes
- **Updated** `homeAtmosphereScenes.js` — exported `HOME_HERO_ATMOSPHERE_STYLE`
- **Updated** `BackgroundPaths.jsx` — dark tone uses hero atmosphere + lavender path strokes

---

## Update – Fix heading / background separation

### Summary
White gap above “Explore our work” was caused by GSAP parallax moving the background layer faster than content, exposing white `body` behind it. Fixed with fixed home atmosphere on `/case-studies`, disabled scroll layer parallax, merged headings, and proper nav padding.

### Changes
- **Updated** `HomeAtmosphereCanvas.jsx` — static hero atmosphere on `/case-studies`
- **Updated** `layout.jsx` — mount atmosphere canvas on case studies
- **Updated** `CaseStudies.jsx` — `scrollLayerParallax={false}`, `pathsOnly` layer, unified header, `pt-24+`
- **Updated** `BackgroundPaths.jsx` — `pathsOnly` prop (paths without duplicate gradient)

---

## Update – Footer matches home atmosphere on case studies

### Summary
Footer on `/case-studies` was using `cinematic-footer-wrapper--surface-light` (white/slate) instead of transparent dark atmosphere mode — same class of issue as the header gap.

### Changes
- **Updated** `CinematicFooter.jsx` — `onAtmosphere` for `/` and `/case-studies` (dark footer, glass pills, white type)
- **Updated** `cinematic-footer.css` — force transparent bg on `cinematic-footer-on-atmosphere`
