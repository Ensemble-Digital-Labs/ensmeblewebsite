# Approved logo nav geometry — `/experiments`

**Status:** User-approved baseline (2026-06-15). Preserve when porting to `FullscreenNav.jsx` or tuning further.

**Preview:** `src/components/EnsembleLogoNav.jsx` — live in fullscreen nav left panel + `/experiments`

---

## Tile map

| Route | Label | Column | Row | Accent |
|-------|-------|--------|-----|--------|
| `/ai` | AI Capability | left | 1 | blue |
| `/services` | Services | left | 2 | orange |
| `/about` | About | left | 3 | lime |
| `/case-studies` | Case Studies | right | 1 | teal |
| `/blog` | **Blogs** | right | 2 | coral |
| `/contact` | Contact | right | 3 | purple |

Source: `src/data/navMenuIcons.js`, labels from `src/data/navigation.js`

---

## Hover fill system

- Rows **1–3** use official SVG path fill + nested clips:
  1. Logo half clip (`LEFT_PATH` / `RIGHT_PATH`)
  2. Per-row region polygon (`ensembleLogoRowRegionClipPoints`)
- Row **N** upper boundary = row **N−1** lower seam (exact, no upward bleed)
- Lower seams extend to spine `x = 0.5` on both sides
- Helper lines are **hidden** in preview; seam constants still drive clip polygons

Source: `src/data/ensembleLogoPaths.js`, `ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS = [1, 2, 3]`

---

## Approved seam constants (viewBox fractions)

### Left lower edges (outer → spine)

| Row | x1, y1 | x2, y2 |
|-----|--------|--------|
| 1 | 0.056, 0.23 | 0.5, 0.452 |
| 2 | 0.083, 0.51 | 0.5, 0.723 |
| 3 | 0.136, 0.827 | 0.5, 1.018 |

### Right lower edges (spine → outer) — **approved row 2/3 seam**

| Row | x1, y1 | x2, y2 |
|-----|--------|--------|
| 1 | 0.5, 0.452 | 0.944, 0.23 |
| 2 | **0.5, 0.723** | **0.925, 0.512** |
| 3 | 0.5, 1.018 | 0.878, 0.81 |

Row 3 **upper** on right must match row 2 lower: `{ x1: 0.5, y1: 0.723, x2: 0.925, y2: 0.512 }`

> Tuning note: row 3 right fill bled into row 2 gap when seam was lowered (+0.02 y). Final approved position is the **original** row 2 right seam (`0.723` / `0.512`). Nudge in ±0.005 steps if revisiting.

---

## Icon + label layout

```js
ROW_BAND_Y:   { 1: 0.84, 2: 0.77, 3: 0.65 }
WING_ANGLES:  { 1: 27, 2: 27, 3: 27 }
ICON_Y_LIFT:  { 1: 7, 2: 7, 3: 7 }
TILE_ANCHORS: pivotX 0.25 (left) / 0.75 (right), iconAlong ±36
```

Source: `src/data/ensembleLogoTileAnchors.js`

---

## Key files

| File | Role |
|------|------|
| `ensembleLogoPaths.js` | Path data, seams, outer edge samples, region clip polygons |
| `ensembleLogoTileAnchors.js` | Icon/text wing-axis layout |
| `navMenuIcons.js` | Tile → route, column, row, accent, icon |
| `navigation.js` | Link labels (`Blogs` not `Blog`) |
| `EnsembleLogoNav.jsx` | Shared SVG nav component (live + experiments) |
| `experiments/EnsembleLogoNavPreview.jsx` | Thin re-export for experiments page |
| `experiments-logo-nav-preview.css` | Hover wash, label, icon styles |

---

## Do not regress

- Row 1 hover fill (user-approved as perfect reference)
- Path-native fill for rows 2–3 (not chord/rect estimates)
- Right row 2 clip: trace outer seam directly (no reentrant cut through wing)
- Row 3 outer corners: use path-sampled `bottomX` / `bottomY` on left; path-sampled outer points on right
- Services ↔ Case Studies wing swap (Services left row 2, Case Studies right row 1)
