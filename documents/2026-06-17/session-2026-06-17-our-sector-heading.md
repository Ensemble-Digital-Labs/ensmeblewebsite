# Session log – 2026-06-17 (Our Sector heading)

## Summary
Added an **Our Sector** section heading above the service capability cards in the home Services chapter, matching the PopArt headline pattern used in Our Work.

## Changes
- **src/lib/homeInfluxContent.js** — Added HOME_INFLUX_CAPABILITIES_SECTION with title Our Sector.
- **src/components/home/chapters/HomeChapterCapabilities.jsx** — Replaced the old parallax showcase title/lead with monogram + HomePopArtRevText headline; set andAlign="start" so the heading sits in the top viewport band above the staggered cards.
- **src/index.css** — Added home-capabilities-chapter__* layout and headline styles (mirrors work chapter header).

## Notes
- Removed use of HOME_INFLUX_WIN from the capabilities chapter (export kept for potential reuse).
- Nav rail still labels this chapter as **Services VI**; visible heading is **Our Sector** per request.

## Next steps
- Confirm heading placement across 320px–2560px and adjust column wave offsets if the header + cards feel tight on laptop.
## Update - Our work masonry frame fit
- Added home-work-masonry__media-fit padded inner frame (nav showcase pattern)
- Laptop: switched from object-cover to object-contain for all tiles
- Unified glass background on laptop; images scale to fit frame without cropping
## Update - Our Sector layout reposition
- Desktop: heading moved into center column above IT Infrastructure card
- Added top padding to clear nav logo overlap
- Removed center column negative translateY; pushed side columns down for wave stagger
# Session log – 2026-06-17 (AIPSTL frame fit)

## Summary
Adjusted the AIPSTL masonry tile on laptop so the card frame shrinks to the image aspect ratio instead of stretching across the full wide grid cell.

## Changes
- **src/index.css** — Laptop-only (1024px+) rules for .home-work-masonry__tile--aipstl: it-content width chain, intrinsic image width with height: 100%, justify-self: end in grid cell. Mobile/tablet unchanged.

## Notes
- Other work tiles still use object-cover on laptop.
- AIPSTL keeps object-contain with frame hugging the logo art.

## Next steps
- Hard-refresh on laptop and confirm frame width matches image; tweak alignment if needed.
# Session log – 2026-06-17 (AIPSTL masonry slot swap)

## Summary
Swapped AIPSTL into the large left masonry block (formerly STL IOIR Clinics) on the home Our Work grid; STL IOIR moved to the bottom-right slot.

## Changes
- **src/components/home/HomeWorkMasonryGrid.jsx** — Added orderMasonryTiles() to place AIPSTL at index 0 and STL IOIR at index 4.
- **src/index.css** — AIPSTL tile alignment justify-self: start for the left hero block.

## Notes
- Case studies page order unchanged; swap is home masonry display only.
- AIPSTL keeps square frame-fit styling in the new large slot.
# Session log – 2026-06-17 (AIPSTL caption label)

## Summary
Updated the AIPSTL work card caption from the acronym to the full client name.

## Changes
- **src/data/healthcareCaseStudies.js** — client: 'Alliance of Independent Physicians' (was AIPSTL).
# Session log – 2026-06-17 (STL IOIR logo zoom)

## Summary
Added laptop-only STL IOIR masonry styling so the logo uses object-contain with a slight scale-up instead of harsh object-cover crop.

## Changes
- **src/components/home/HomeWorkMasonryGrid.jsx** — home-work-masonry__tile--stl-ioir / __photo--stl-ioir classes.
- **src/index.css** — STL IOIR: object-contain, scale(1.22) on laptop, hover 1.28; reduced-motion fallback.
# Session log – 2026-06-17 (CTA icon circle)

## Summary
Changed the No cost / No commitment CTA section accent icon from a square frame to a circle.

## Changes
- **src/components/home/chapters/HomeChapterCta.jsx** — Added home-cta-accent-icon class on ContextualIconTile.
- **src/index.css** — Circular clip (order-radius: 9999px, overflow: hidden) for CTA icon frame and inner shell.
# Session log – 2026-06-17 (Our Services heading rename)

## Summary
Renamed the home capabilities section heading from **Our Sector** to **Our Services**.

## Changes
- **src/lib/homeInfluxContent.js** — HOME_INFLUX_CAPABILITIES_SECTION.title → Our Services.
# Session log – 2026-06-17 (STL IOIR frame trim)

## Summary
Trimmed left/right empty space on the STL IOIR Clinics masonry card on laptop by shrinking the frame to a square aspect ratio (same pattern as AIPSTL).

## Changes
- **src/index.css** — Laptop-only .home-work-masonry__tile--stl-ioir frame-fit rules: it-content width, spect-ratio: 1 / 1, removed aggressive scale crop.
# Session log – 2026-06-17 (STL IOIR position)

## Summary
Moved STL IOIR masonry card left on laptop so it sits flush next to MHW Surgery (justify-self: start).

## Changes
- **src/index.css** — STL IOIR tile alignment center → start in laptop grid.
# Session log – 2026-06-17 (Work CTA position)

## Summary
Moved the Our Work "+" circle CTA into the blank area beside STL IOIR on laptop (bottom row, right of the card).

## Changes
- **src/index.css** — Laptop .home-work-chapter__cta absolutely positioned between STL IOIR and the right edge; vertically centered in bottom masonry row.
# Session log – 2026-06-17 (Nav ROI card removed)

## Summary
Removed **How We Measure AI Marketing ROI** from the fullscreen nav Selected work rail.

## Changes
- **src/components/FullscreenNav.jsx** — Filter how-we-measure-ai-marketing-roi from 
avShowcaseStudies; case study page data unchanged.
# Session log – 2026-06-17 (Mission circle iPhone layout)

## Summary
Fixed Our mission circular visual dropping below the headline on real iPhones by replacing fragile vh transforms with flow-based overlap (negative margins) and tighter mobile orbit sizing.

## Changes
- **src/index.css** — Mobile #home-passion: smaller circle/orbit vars capped to viewport, margin-bottom on visual + margin-top on copy, 	ranslate3d with vw/rem (not vh), iPhone max-width: 430px overrides.

## Notes
- Safari iOS handles h and wide absolute orbit stacks differently than Chrome DevTools responsive mode.
# Session log – 2026-06-17 (Mission circle layout v2)

## Summary
Fixed Our mission circle dropping on iPhone by sizing the mobile layout box to the circle only (orbit icons overflow visibly) and removing mobile vh/transform hacks.

## Changes
- **src/index.css** — Passion visual stack on tablet/mobile: height/width = --passion-circle-size only; base 	ranslateY(vh) scoped to 768px+; cleared mobile negative margins/transforms.

# Session log – 2026-06-17 (Hide Our Team on About)

## Summary
Removed the Our Team section from the About page.

## Changes
- **src/pages/About.jsx** — Removed Team import and render (component file kept for later reuse).
