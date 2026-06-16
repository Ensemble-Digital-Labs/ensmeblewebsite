# Session log – 2026-06-15 (experiments logo lab)

## Summary
Replaced the blank DNA Capital clone on `/experiments` with a centered Ensemble logo lab: six colored bars forming the geometric E mark, with assemble animation on load and wordmark below. Removed `/experiments` from DNA clone routing so normal site chrome (nav, footer, scroll) returns.

## Changes
- Created `src/data/ensembleLogoBars.js` — bar colors/rows for left and right columns
- Created `src/components/experiments/EnsembleLogoMark.jsx` — logo mark component reusing nav accordion geometry
- Created `src/styles/experiments-logo.css` — lab page layout and solid bar styling
- Updated `src/pages/Experiments.jsx` — logo lab instead of `DnaCapitalClonePage`
- Updated `src/lib/dnaCapitalRoutes.js` — no active DNA clone routes

## Notes
- Reuses `animateNavLogoTiles()` from `navLogoTileMotion.js` and `fs-nav-*` classes from `fullscreen-nav-menu.css`
- Page uses site theme background (`--ensemble-icon-theme-bg`) with optional wordmark via `AnimatedBrandLogo` loader variant

## Update — wing icon + diagonal label placement
- Icons moved to thick inner wing (near spine); labels rotated per row wing angle toward spine
- Top row ±27°, middle ±5°, bottom ∓13°; slightly larger icons (30 viewBox units)

- Each nav tile is a row-clipped slice of the official left/right path (`<path>` + `<clipPath>`)
- Icons via SVG `<image>`, labels via `<text>`; glass tint + accent stroke on path silhouette
- Removed rectangular HTML overlay cards

- Added `EnsembleLogoNavPreview.jsx` — exact path slices + six nav tiles (icons, labels, glass chrome)
- Uses `navAppTiles` mapping (same as fullscreen nav); links work but not wired into live menu
- `/experiments` hero panel shows large preview; reference SVG below for comparison

- Root cause: `min-height: 0` collapsed bars; GSAP started tiles at `opacity: 0`
- Restored bar heights (`minmax(3.5rem, 1fr)` rows, `min-height: 3.25rem` on tiles)
- Removed GSAP on experiments page — cards render in final CSS state immediately
- Hid spine completely (`display: none`) — was the faint center line

- Removed broken clip-path polygons (wrong winding → bowtie shapes)
- Rebuilt cards as six rotated parallelograms (same model as nav accordion)
- Calibrated to SVG: ~28deg tilt, 9% width taper, 14px row shift, no spine gap

- Measured official SVG path corners into `ensembleLogoMaskGeometry.js`
- Added `EnsembleLogoCards.jsx` — six `clip-path` cards matching mask polygons
- Experiments page shows side-by-side: cards vs reference SVG (same viewBox bbox)

- Replaced CSS bar approximation with official SVG paths + brand gradients from `ensemble-logo.svg`
- Added `public/assets/branding/ensemble-logo-mark.svg` (mark-only crop)
- Tightened lockup spacing between mark and wordmark; corrected proportions (tall mark, wider wordmark)

## Update — row 1 full horizontal clip minus row 2 wedge
- Row 1: evenodd clip = horizontal band − row 2 outer bleed (fixes missing middle strip)
- Removed rib trapezoid + gradient mask gaps on hover
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`, `experiments-logo-nav-preview.css`
- Row 1: rib trapezoid clip (stops before row 2 outer wedge)
- Rows 2–3: horizontal band + outer-wing bleed clip (hybrid kept)
- Hover uses mask sweep (no scale) so color stays inside clips
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`, `experiments-logo-nav-preview.css`
- Removed default gradient/accent fills; logo is charcoal grey (`#252c3a`) at rest
- Each wing reveals nav accent on hover with scale + fade from spine (`color-wash` animation)
- Files: `EnsembleLogoNavPreview.jsx`, `experiments-logo-nav-preview.css`
- Rib trapezoids over-clipped center notch between row 1/2 — reverted
- Spine uses horizontal row bands; diagonal color only on outer 40% of wing (`OUTER_BLEED_DEPTH`)
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`
- Removed horizontal clip + diagonal bleed wedge (visible seam / double edge)
- Each tile uses one slanted rib trapezoid (`ensembleLogoRibClipPoints`) ∩ official path
- Gradient base kept; rib tint at 0.42 covers full wing row along diagonal bounds
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`
- Row 2 bleed outerY: 0.19 → 0.28; row 3: 0.56 → 0.62 (less overlap into row above)
- Kept horizontal row clips (correct proportions) + gradient base
- Added triangular bleed clips so row 2/3 accent extends into slanted wing above their band
- Tiles paint in row order so bleed overlays prior row color on the rib
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`
- Restored horizontal row-band clips + official gradient base (correct E mark proportions)
- Removed experimental diagonal wing polygons that distorted wing shape
- Files: `EnsembleLogoNavPreview.jsx`, `ensembleLogoPaths.js`, `experiments-logo-nav-preview.css`
- Replaced horizontal row rects with diagonal rib clip polygons (`ensembleLogoWingClipPoints`)
- Each wing row uses solid nav accent fill (no full-path gradient bleed across ribs)
- Case Studies / middle wing stays fully teal along its slanted rib
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`, `experiments-logo-nav-preview.css`
- Icons rotate on their own pivot, lifted 7 viewBox units (`ENSEMBLE_LOGO_ROW_ICON_Y_LIFT`)
- Labels keep row-band Y; separate text/icon transforms in preview component
- `ENSEMBLE_LOGO_ROW_BAND_Y` row 1: 0.78 → 0.84
- `ENSEMBLE_LOGO_ROW_BAND_Y` row 1: 0.72 → 0.78
- Row 1 Y now at 72% through its band (`ENSEMBLE_LOGO_ROW_BAND_Y`) — ~0.255 vs prior 0.178
- Targets visual center of thick top wing (user red-line reference)
- File: `ensembleLogoTileAnchors.js`
- `pivotY` now derived from row-band midpoint (`ENSEMBLE_LOGO_ROW_BANDS`) instead of hard-coded 0.14
- Row 1 center: ~0.178 (was 0.14) — AI Capability + Services sit mid-wing
- File: `ensembleLogoTileAnchors.js`
- Row wing angles now come from one shared map (`ENSEMBLE_LOGO_ROW_WING_ANGLES`) — row 1 uses ±27° for both AI Capability and Services
- Rotation pivots on the icon center (not wing pivot) so both sides tilt symmetrically
- Mirrored row-1 pivots at 0.25 / 0.75
- Files: `ensembleLogoTileAnchors.js`, `EnsembleLogoNavPreview.jsx`
- Fixed asymmetric gaps: anchor text at icon edge (`end` left, `start` right) instead of estimating char width
- `UNIFORM_LABEL_ICON_GAP` (4px) now applies identically on both wings
- File: `ensembleLogoTileAnchors.js`
- Replaced square icon tiles with circles: dark fill bg, accent stroke ring, clipped `<image>`
- Shared `clipPath` uses `clipPathUnits="objectBoundingBox"` so icons stay round after wing rotation
- Files: `EnsembleLogoNavPreview.jsx`, `experiments-logo-nav-preview.css`

## Update — row 1 lower seam under label
- Row 1 line uses path segment under text (~37% y at label x), not upper rib diagonal (~17% y)
- Left: (5.6%, 27%) → (45.5%, 46.9%); right mirrored for Services
- Nudged row 1 seam up ~2% viewBox height (y −0.02)
- Extended row 1 seam to spine (x = 50%) on both wings
- Nudged row 1 seam up again (~2% viewBox height)
- Row 1 wing fill: parallelogram from `PATH_UPPER_EDGE` + `PATH_LOWER_EDGE`, clipped to logo path half
- Added `PATH_TOP_TIP` so fill includes outer top cap above main wing body
- One clipPath per tile = rib trapezoid (row 1) or horizontal band (rows 2–3) + outer bleed wedge
- Single color-wash layer (no main/bleed seam); stronger fill opacity on hover
- Icons/text outside shape clip; transparent hit path keeps hover target

## Update — row 1 top-left tip fill gap
- Re-sampled `ENSEMBLE_LOGO_LEFT_PATH` / `RIGHT_PATH`: true outer tip at `(0, 0.033)` / `(1, 0.033)`, not `(0.005, 0.061)`
- Added `ENSEMBLE_LOGO_PATH_OUTER_EDGE` (left `0.027, 0.19`; right `0.973, 0.179`) so polygon traces outer silhouette back to tip
- `ensembleLogoWingFillPolygonPoints()` now 6-point wing boundary; fixes dark triangular gap at top-left of AI Capability segment
- File: `ensembleLogoPaths.js`

## Update — row 1 path-native fill (top edge fix)
- Root cause: polygon chord from inner top → spine sat ~3% below real path top (up to 0.034 gap mid-wing)
- Row 1 hover now uses official `LEFT/RIGHT_PATH` fill with nested clips: logo half + generous row-1 region
- Added `ensembleLogoRow1RegionClipPoints()` — bleeds above wing tip, lower bound on calibrated row-1/2 diagonal
- Removed `TileWingPolygonFill` from preview; path fill follows Bézier silhouette including top cap
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`

## Update — row 1 outer-corner wedge
- Row-1 region clip no longer cuts outer edge with one diagonal `(0.056,0.23)→bleed`; that excluded a path wedge (~x=0.01) inside the logo
- Clip now traces path outer edge: lower outer → `(0.027,0.19)` → tip `(0,0.033)`; spine lower bleeds +3% for notch corner
- File: `ensembleLogoPaths.js`

## Update — row 1 approved
- User confirmed row 1 (AI Capability / Services) hover fill is perfect on `/experiments`
- Next when ready: apply same path-native fill + region clip to rows 2–3, then port to `FullscreenNav.jsx`

## Update — row 2 path-native fill
- Row 2 (Case Studies / Blog) now uses same approach as row 1: official path fill + logo-half clip + per-row region clip
- Added `PATH_UPPER_EDGE` row 2 (= row 1 lower seam), `PATH_OUTER_EDGE` row 2 (path-sampled zigzag + mid)
- Generalized `ensembleLogoRowRegionClipPoints(column, row)`; `ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS = [1, 2]`
- Files: `ensembleLogoPaths.js`, `EnsembleLogoNavPreview.jsx`

## Update — row 2 left/right symmetry
- Case Studies vs Blog mismatch: left clip used `bleedOuter` vertical cut; right traced outer diagonal — different shapes
- Left path has row 1/2 reentrant `(0.152, 0.318)`; clip now includes mirrored reentrant on both sides
- `PATH_LOWER_EDGE` row 2 right mirrored from left; `PATH_OUTER_EDGE` row 2 points mirrored (`0.945/0.848/0.931`)
- Row 2 clip follows seam outer → spine → notch → outer silhouette → reentrant (no outer bleed box)
- `spineLowerBleed` uses path notch x ± 0.06 toward spine, not forced `x = 0.5`
- File: `ensembleLogoPaths.js`

## Update — row 2 upper bound at row 1 seam
- Row 2 clip had `upperBleed` (−2% y) shifting top edge into row 1 — salmon fill crossed helper line
- Upper boundary now uses exact row 1/2 seam (`top.x1/y1` → `top.x2/y2`) with no bleed
- File: `ensembleLogoPaths.js`

## Update — row 2 lower helper line to spine
- Row 2 lower seam extended to spine `x = 50%` (same as row 1 helper line)
- Left: `(0.083, 0.51) → (0.5, 0.723)`; right: `(0.5, 0.723) → (0.917, 0.51)` — y interpolated along path diagonal
- File: `ensembleLogoPaths.js`

## Update — row 3 path-native fill
- Row 3 (About / Contact) uses same system as rows 1–2: path fill + region clip
- Upper bound = exact row 2 lower helper line (`0.083/0.51 → 0.5/0.723`); no bleed into row 2
- Lower helper extended to spine: left `(0.136, 0.827) → (0.5, 1.018)`; right mirrored
- `PATH_OUTER_EDGE` row 3 path-sampled + mirrored reentrant; `ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS = [1, 2, 3]`
- File: `ensembleLogoPaths.js`

## Update — row 2 right outer fill gap
- Blog wing clip cut inward via reentrant before outer edge — excluded path pocket along outer diagonal
- Right row 2+ clip now traces `top outer seam → path outer upper → mid → lower outer` (reentrant kept on left only)
- Path-sampled right outer: `(0.942, 0.373)`, mid `(0.933, 0.443)`, lower outer `x = 0.925`
- File: `ensembleLogoPaths.js`

## Update — row 3 outer corner fill gaps
- Right lower outer was mirrored `(0.864, 0.827)` not path `(0.878, 0.810)` — ~1.2% gap along outer edge
- Row 3 outer points re-sampled both sides; left reentrant `(0.207, 0.628)`; added `bottomX/bottomY` corner on lower diagonal
- Clip polygon includes bottom corner vertex before tracing outer edge up
- File: `ensembleLogoPaths.js`

## Update — row 2/3 icon + label alignment (match row 1)
- Rows 2–3 now share row 1 layout: `ROW_BAND_Y` 0.84, wing angle 27°, icon lift 7, pivotX 0.25/0.75, `iconAlong` ±36
- File: `ensembleLogoTileAnchors.js`

## Update — row 2 content nudge up
- `ENSEMBLE_LOGO_ROW_BAND_Y` row 2: 0.84 → 0.77 (Case Studies + Blog text/icon up within wing)
- File: `ensembleLogoTileAnchors.js`

## Update — row 3 content nudge up
- `ENSEMBLE_LOGO_ROW_BAND_Y` row 3: 0.84 → 0.74 (About + Contact; slightly above row 2 at 0.77)
- File: `ensembleLogoTileAnchors.js`

## Update — row 3 content nudge up (more)
- `ENSEMBLE_LOGO_ROW_BAND_Y` row 3: 0.74 → 0.65
- File: `ensembleLogoTileAnchors.js`

## Update — swap Services ↔ Case Studies logo wings
- Services → left row 2; Case Studies → right row 1 (labels, icons, accents stay with each route)
- File: `navMenuIcons.js`

## Tweak — row 2 right seam nudged up
- Seam `y` −0.01 (0.743→0.733 spine, 0.532→0.522 outer) — halfway between original and prior fix
- File: `ensembleLogoPaths.js`

## Update — lower row 2 right seam (row 3 bleed fix)
- Row 2 right lower + row 3 right upper seam lowered ~2% viewBox (`y` +0.02) to stop row 3 fill bleeding into row 2 gap
- File: `ensembleLogoPaths.js`
- Restored `usesPathNativeFill` variable accidentally dropped with helper line code
- File: `EnsembleLogoNavPreview.jsx`
- Removed lower-edge `<line>` rendering from logo nav preview (clip boundaries unchanged)
- File: `EnsembleLogoNavPreview.jsx`

## Update — Blog → Blogs label
- Nav + footer resources link label: `Blog` → `Blogs` (path `/blog` unchanged)
- File: `navigation.js`

## Approved baseline — logo nav geometry (user sign-off)
- All rows 1–3 hover fill, tile map, icon layout, and seam values locked as reference model
- Right row 2/3 seam: `y1 0.723`, `y2 0.512` at `x2 0.925` (after bleed tuning)
- Helper lines hidden; clip geometry unchanged
- Reference doc: `documents/2026-06-15/approved-logo-nav-geometry.md`
- Inline comments added in `ensembleLogoPaths.js`

## Port — SVG logo nav into fullscreen menu (left panel)
- Extracted shared `EnsembleLogoNav.jsx` (pixel nav, active route, close overlay)
- Replaced legacy `fs-nav-logo-accordion` bar tiles in `FullscreenNav.jsx`
- `EnsembleLogoNavPreview.jsx` now re-exports shared component for `/experiments`
- Menu open animation: stagger fade for SVG slices (`navLogoTileMotion.js`)
- Styles: `experiments-logo-nav-preview.css` global + `fs-nav-logo-mark` layout in `fullscreen-nav-menu.css`

## Fix — SVG nav vertical position (clear brand logo)
- Removed legacy accordion `padding-top` stack on `fs-nav-panel-nav` when `.fs-nav-logo-mark` is present
- Tightened `fs-nav-logo-mark` top padding so E mark sits higher without overlapping fixed ENSEMBLE logo

## Update — ghost E mark in live nav
- Fullscreen nav: transparent wing fill (no grey), theme backdrop shows through
- Default state: outline stroke + icons + labels only; hover/active accent fill unchanged
- File: `fullscreen-nav-menu.css`

## Update — SVG nav always fits viewport
- Flex chain fills available menu height; SVG scales with `min(width, height × aspect)` + container queries
- Desktop capped by half-panel width; mobile/tablet use taller `dvh` clearance
- Files: `FullscreenNav.jsx`, `fullscreen-nav-menu.css`
