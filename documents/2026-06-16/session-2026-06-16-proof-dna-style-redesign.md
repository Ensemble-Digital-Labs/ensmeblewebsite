# Session log – 2026-06-16 (proof dna-style redesign)

## Summary
Redesigned home Proof section to match DNA Capital split layout: circular featured stat left, editorial headline + body right; supporting stats below ring.

## Changes
- **`src/components/home/chapters/HomeChapterProof.jsx`** — split grid, ring stat, removed icon/monogram/mask stack
- **`src/lib/homeInfluxContent.js`** — partner title/body copy; sentence-case `displayLabel` on stats
- **`src/index.css`** — `#home-proof` ring, stat value, and label styles

## Notes
- Featured metric: `100+` in gradient ring; `3×` and `90` as secondary stats under ring
- Pattern inspired by `dna-clone-section--split` / `dna-clone-stat-ring`, adapted to Ensemble palette

## Update
- All three stats (`100+`, `3×`, `90`) now use matching ring treatment
- Desktop/tablet: 3 rings in a horizontal row left, copy block right — fits one viewport band
- Rings arranged in **L-shape**: `100+` top, `3×` below, `90` on horizontal foot to the right
- DNA-scale rings (`14.5rem`), all equal size; copy block sits above the 3rd ring column

## Update (DNA count-up animation)
- **`src/hooks/useDnaStyleCountUp.js`** — shared IntersectionObserver count-up (1.8s ease-out quad)
- **`src/components/home/HomeProofRingStat.jsx`** — proof rings use DNA-style animation
- **`src/hooks/useHomeSequentialReveals.js`** — skip GSAP count-up inside `#home-proof`
- **`DnaCapitalClonePage.jsx`** — `DnaStat` uses same hook

## Update (animated cool ring border)
- **`src/components/shared/DnaStyleStatRing.jsx`** — SVG gradient stroke draws on scroll (gap at bottom)
- **`src/styles/dna-style-stat-ring.css`** — cool cyan→blue palette, white stat numerals
- Home proof + DNA clone ring stats both use `DnaStyleStatRing`

## Update (proof copy spacing)
- **`src/index.css`** — moved `.home-proof-copy` to grid column 3 (was `2 / -1`) so headline/body sit further right of the L-shape rings; increased `column-gap` at 640px+ and 1024px+; added light `padding-left` on copy block

## Update (proof ring animation fix)
- **`src/hooks/useDnaStyleCountUp.js`** — home proof stats defer until `ensemble:scroll-ready` and use GSAP ScrollTrigger (`syncWithHomeScroll`) so ring draw + count-up run when the section is revealed, not while `opacity: 0`
- **`src/components/home/HomeProofRingStat.jsx`** — removed per-stat `data-home-reveal`; pass `syncWithHomeScroll` + stagger index
- **`src/components/home/chapters/HomeChapterProof.jsx`** — use `staggerIndex` prop instead of CSS transition delay

## Update (proof copy position)
- **`src/index.css`** — copy block spans rows 1–2 in column 3 with `align-self: center` (was pinned to row 2 bottom); added `max-width` so copy stays left of helix; slightly wider column gap at desktop

## Update (proof body copy removed)
- **`src/components/home/chapters/HomeChapterProof.jsx`** — removed partner body paragraph
- **`src/lib/homeInfluxContent.js`** — removed `HOME_INFLUX_PARTNER.body`

## Update (proof W monogram)
- **`src/components/home/chapters/HomeChapterProof.jsx`** — `HomeChapterMonogram` behind headline (W from title)
- **`src/index.css`** — proof copy monogram sizing/position (PopArt big-letter pattern)
- **`src/hooks/useHomeSequentialReveals.js`** — scroll-triggered rainbow wipe for proof monogram

## Update (proof W monogram sharpness)
- Monogram moved outside `data-home-reveal` (parent transform was blurring gradient letter); uses shared `home-popart-section__monogram` class + copy inner padding like brand

## Update (proof copy foot box)
- **`src/index.css`** — copy block on grid row 2, cols 2→end (L-foot band per user markup); wider stretch layout, W + headline sit in lower horizontal zone

## Update (proof script stat labels)
- **`src/lib/homeInfluxContent.js`** — `scriptLabel` on all three proof stat labels
- **`src/components/home/HomeProofRingStat.jsx`** — `home-proof-stat-label--script` class
- **`src/index.css`** — Dancing Script + pink→orange gradient (matches expertise subtitle)

## Update (proof logo clearance)
- **`src/index.css`** — `--home-proof-logo-clearance` left inset on `.home-proof-split` so rings clear fixed nav lockup; light top padding at 1024px+

## Update (proof copy left column)
- **`src/index.css`** — 4-col grid: copy col 1 (left, below logo), rings cols 2–3; removed split logo-clearance padding
- **`src/components/home/chapters/HomeChapterProof.jsx`** — copy block first in DOM (mobile stack order)

## Update (90 ring position)
- **`src/index.css`** — 90-days ring moved to grid row 2 (aligned with 3× ring)

## Update (proof ring canvas layout)
- **`src/index.css`** — rings on absolute-positioned canvas (organic offsets), not grid-aligned columns
- **`src/components/home/chapters/HomeChapterProof.jsx`** — `home-proof-stat-canvas` wrapper

## Update (100+ label placement)
- **`src/index.css`** — “New patients per month” above 100+ ring; more vertical separation from 3× ring; per-stat z-index

## Update (100+ ring position up)
- **`src/index.css`** — negative `top` on 100+ canvas stat; canvas top padding so label isn’t clipped

## Update (ring draw sync with count-up)
- **`src/hooks/useDnaStyleCountUp.js`** — blue ring `stroke-dashoffset` updated in same rAF loop as numerals
- **`src/components/shared/DnaStyleStatRing.jsx`** — `progressRef` on progress circle
- **`src/styles/dna-style-stat-ring.css`** — removed CSS-only ring animation (JS-driven draw)

## Update (ring draw sync fix v2)
- Ring resolved via `container.querySelector` fallback; `pathLength="1"` normalized dash (`1` → `0` offset) for full revolution; init in `useLayoutEffect`
