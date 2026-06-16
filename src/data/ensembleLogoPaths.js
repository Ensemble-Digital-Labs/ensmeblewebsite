/** Official Ensemble E mark paths — from `ensemble-logo.svg` */

export const ENSEMBLE_LOGO_VIEWBOX = {
  x: 640,
  y: 532,
  width: 220.17,
  height: 233.12,
}

export const ENSEMBLE_LOGO_MASK_ASPECT = `${ENSEMBLE_LOGO_VIEWBOX.width} / ${ENSEMBLE_LOGO_VIEWBOX.height}`

export const ENSEMBLE_LOGO_LEFT_PATH =
  'M7489.24-14022.364l-72.355-40.032-5.8-35.926.068.038,21.408-10.685,30.76,16.282v-12.246l-57.992-31.38-6.318-34.165.634.333-.234-.469,21.15-10.539,42.759,22.63v-12.674c-22.545-12.783-70.309-39.854-70.309-39.854l-6.014-36.5.522.308-.15-.479,23.146-7.276,85.735,48.2-.075,9.138-86.562-48.662-13.38,4.2,94.1,55.294.666,164.706Zm-25.916-47.062v-14.21l-30.867-16.338-12.8,6.39Zm0-67.332v-12.713l-42.87-22.687-12.635,6.3Z'

export const ENSEMBLE_LOGO_RIGHT_PATH =
  'M7501.712-14022.336V-14186.6l97.263-55.456-12.758-4.26-90.036,48.654.075-9.137,89.209-48.2,21.63,7.224-.518,1.552-5.675,32.678-71.515,41.624v15.389l44.232-23.166,20.713,11.28.068-.036-.008.069.012.006-.016.029-3.866,32.49-61.136,31.5v12.282l31.754-16.82,23.623,10.006-.047.112.144-.076-4.644,32.373-77.622,44.6Zm27.676-47.091,46.359-24.594-14.223-6.026-32.137,17.021Zm0-65.127,56.4-29.411-12.242-6.667-44.157,23.128Z'

export const ENSEMBLE_LOGO_LEFT_TRANSFORM = 'translate(-6746.998 14787.286)'
export const ENSEMBLE_LOGO_RIGHT_TRANSFORM = 'translate(-6746.923 14787.294)'

/** Horizontal bands where the three ribs meet the spine notches */
export const ENSEMBLE_LOGO_ROW_BANDS = [
  { row: 1, y0: 0, y1: 0.355 },
  { row: 2, y0: 0.355, y1: 0.655 },
  { row: 3, y0: 0.655, y1: 1 },
]

export const ENSEMBLE_LOGO_GRADIENTS = {
  left: {
    x1: '0.335',
    y1: '0.938',
    x2: '0.327',
    y2: '0.166',
    stops: [
      { offset: '0', color: '#f5c706' },
      { offset: '0.512', color: '#3da993' },
      { offset: '1', color: '#1fa7f2' },
    ],
  },
  right: {
    x1: '0.5',
    y1: '0.193',
    x2: '0.5',
    y2: '1',
    stops: [
      { offset: '0', color: '#ffaf53' },
      { offset: '0.404', color: '#f77b74' },
      { offset: '0.709', color: '#d755a8' },
      { offset: '1', color: '#a857e5' },
    ],
  },
}

export function ensembleLogoRowClipRect(row, viewBox = ENSEMBLE_LOGO_VIEWBOX) {
  return {
    x: viewBox.x,
    y: viewBox.y + viewBox.height * row.y0,
    width: viewBox.width,
    height: viewBox.height * (row.y1 - row.y0),
  }
}

/**
 * Outer-wing diagonal extension — slanted tips lag row bands at the outer edge only.
 * Spine / center keeps horizontal row clips (avoids over-clipping the notch).
 */
export const ENSEMBLE_LOGO_OUTER_WING_BLEED = {
  /** Row 1 bottom outer diagonal tip (row 1/2 junction wedge) */
  1: { outerY: 0.26, bandY: 0.355 },
  2: { outerY: 0.26, bandY: 0.355 },
  3: { outerY: 0.58, bandY: 0.655 },
}

/** How far inward from each outer edge the bleed reaches (fraction of viewBox width). */
export const ENSEMBLE_LOGO_OUTER_BLEED_DEPTH = 0.4

/**
 * Slanted rib bounds — outer wing edge lags spine notches (E mark geometry).
 */
export const ENSEMBLE_LOGO_RIB_OUTER_Y = {
  1: { top: 0, bottom: 0.26 },
  2: { top: 0.26, bottom: 0.58 },
  3: { top: 0.58, bottom: 1 },
}

export const ENSEMBLE_LOGO_RIB_SPINE_Y = {
  1: { top: 0, bottom: 0.355 },
  2: { top: 0.355, bottom: 0.655 },
  3: { top: 0.655, bottom: 1 },
}

export function ensembleLogoRibClipPoints(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  const outer = ENSEMBLE_LOGO_RIB_OUTER_Y[row]
  const spine = ENSEMBLE_LOGO_RIB_SPINE_Y[row]
  if (!outer || !spine) return null

  const { x, y, width, height } = viewBox
  const spineX = x + width * 0.5
  const outerX = column === 'left' ? x : x + width
  const yTopOuter = y + height * outer.top
  const yBotOuter = y + height * outer.bottom
  const yTopSpine = y + height * spine.top
  const yBotSpine = y + height * spine.bottom

  if (column === 'left') {
    return `${outerX},${yTopOuter} ${spineX},${yTopSpine} ${spineX},${yBotSpine} ${outerX},${yBotOuter}`
  }

  return `${spineX},${yTopSpine} ${outerX},${yTopOuter} ${outerX},${yBotOuter} ${spineX},${yBotSpine}`
}

/**
 * Lower wing seam — sampled from official path segments (viewBox fractions).
 * Replaces rib estimates; aligns with visible SVG bottom edge per wing.
 */
export const ENSEMBLE_LOGO_PATH_LOWER_EDGE = {
  left: {
    /** Row 1 — outer edge → spine (x = 50%) */
    1: { x1: 0.056, y1: 0.23, x2: 0.5, y2: 0.452 },
    2: { x1: 0.083, y1: 0.51, x2: 0.5, y2: 0.723 },
    3: { x1: 0.136, y1: 0.827, x2: 0.5, y2: 1.018 },
  },
  right: {
    /** Row 1 — spine → outer edge */
    1: { x1: 0.5, y1: 0.452, x2: 0.944, y2: 0.23 },
    /** Row 2 — spine → outer (approved seam: y1 0.723, y2 0.512 — do not lower without retesting row 3 bleed) */
    2: { x1: 0.5, y1: 0.723, x2: 0.925, y2: 0.512 },
    /** Row 3 — spine → outer edge (extended to x = 50%) */
    3: { x1: 0.5, y1: 1.018, x2: 0.878, y2: 0.81 },
  },
}

/** Upper wing seam — row boundary on the spine side (row 2+ = previous row lower seam). */
export const ENSEMBLE_LOGO_PATH_UPPER_EDGE = {
  left: {
    1: { x1: 0.056, y1: 0.013, x2: 0.5, y2: 0.249 },
    2: { x1: 0.056, y1: 0.23, x2: 0.5, y2: 0.452 },
    3: { x1: 0.083, y1: 0.51, x2: 0.5, y2: 0.723 },
  },
  right: {
    1: { x1: 0.5, y1: 0.249, x2: 0.944, y2: 0.013 },
    2: { x1: 0.5, y1: 0.452, x2: 0.944, y2: 0.23 },
    /** Row 3 upper = row 2 lower seam (approved: matches right row 2 lower above) */
    3: { x1: 0.5, y1: 0.723, x2: 0.925, y2: 0.512 },
  },
}

/**
 * Outer top tip — path-sampled sharp point + inner junction (row 1).
 * Previous outerY ≈ 0.061 sat below the real tip (~0.033) and left a dark gap.
 */
export const ENSEMBLE_LOGO_PATH_TOP_TIP = {
  left: {
    1: { outerX: 0, outerY: 0.033, innerX: 0.107, innerY: 0.001 },
  },
  right: {
    1: { outerX: 1, outerY: 0.033, innerX: 0.893, innerY: 0.001 },
  },
}

/** Outer left/right edge — path-sampled points along the wing silhouette. */
export const ENSEMBLE_LOGO_PATH_OUTER_EDGE = {
  left: {
    1: { x: 0.027, y: 0.19 },
    2: {
      upperX: 0.055,
      upperY: 0.364,
      reentrantX: 0.152,
      reentrantY: 0.318,
      x: 0.069,
      y: 0.437,
    },
    3: {
      upperX: 0.109,
      upperY: 0.673,
      reentrantX: 0.207,
      reentrantY: 0.628,
      x: 0.122,
      y: 0.75,
      bottomX: 0.13,
      bottomY: 0.838,
    },
  },
  right: {
    1: { x: 0.973, y: 0.179 },
    2: {
      upperX: 0.942,
      upperY: 0.373,
      reentrantX: 0.848,
      reentrantY: 0.318,
      x: 0.933,
      y: 0.443,
    },
    3: {
      upperX: 0.899,
      upperY: 0.671,
      reentrantX: 0.793,
      reentrantY: 0.666,
      x: 0.888,
      y: 0.741,
      bottomX: 0.886,
      bottomY: 0.818,
    },
  },
}

/** Rows using official path fill + per-row region clip (experiments preview). */
export const ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS = [1, 2, 3]

function edgeToViewBoxPoints(edge, viewBox) {
  const { x, y, width, height } = viewBox
  return {
    x1: x + width * edge.x1,
    y1: y + height * edge.y1,
    x2: x + width * edge.x2,
    y2: y + height * edge.y2,
  }
}

/**
 * Per-row region clip — path fill bounded by upper/lower seams + outer silhouette.
 * Row 1 bleeds above the wing tip; row 2+ upper edge is the exact previous-row lower seam.
 */
export function ensembleLogoRowRegionClipPoints(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  if (!ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS.includes(row)) return null

  const upper = ENSEMBLE_LOGO_PATH_UPPER_EDGE[column]?.[row]
  const lower = ENSEMBLE_LOGO_PATH_LOWER_EDGE[column]?.[row]
  const outerEdge = ENSEMBLE_LOGO_PATH_OUTER_EDGE[column]?.[row]
  if (!upper || !lower) return null

  const { x, y, width, height } = viewBox
  const top = edgeToViewBoxPoints(upper, viewBox)
  const bottom = edgeToViewBoxPoints(lower, viewBox)
  const bleedOuter = column === 'left' ? x - width * 0.02 : x + width * 1.02
  const spineLowerY = column === 'left' ? lower.y2 : lower.y1
  const spineLowerX = column === 'left' ? lower.x2 : lower.x1
  const spineLowerBleed = {
    x:
      x +
      width *
        (column === 'left'
          ? Math.min(spineLowerX + 0.06, 0.5)
          : Math.max(spineLowerX - 0.06, 0.5)),
    y: y + height * (spineLowerY + 0.03),
  }

  if (row === 1) {
    if (!outerEdge) return null
    const tip = ENSEMBLE_LOGO_PATH_TOP_TIP[column]?.[1]
    if (!tip) return null

    const outerTop = {
      x: x + width * tip.outerX,
      y: y + height * tip.outerY,
    }
    const outerMid = {
      x: x + width * outerEdge.x,
      y: y + height * outerEdge.y,
    }
    const bleedTop = y - height * 0.08

    if (column === 'left') {
      return [
        `${bleedOuter},${bleedTop}`,
        `${x + width * 0.5},${bleedTop}`,
        `${spineLowerBleed.x},${spineLowerBleed.y}`,
        `${bottom.x2},${bottom.y2}`,
        `${bottom.x1},${bottom.y1}`,
        `${outerMid.x},${outerMid.y}`,
        `${outerTop.x},${outerTop.y}`,
        `${bleedOuter},${outerTop.y}`,
      ].join(' ')
    }

    return [
      `${x + width * 0.5},${bleedTop}`,
      `${bleedOuter},${bleedTop}`,
      `${bleedOuter},${outerTop.y}`,
      `${outerTop.x},${outerTop.y}`,
      `${outerMid.x},${outerMid.y}`,
      `${bottom.x2},${bottom.y2}`,
      `${bottom.x1},${bottom.y1}`,
      `${spineLowerBleed.x},${spineLowerBleed.y}`,
    ].join(' ')
  }

  if (!outerEdge?.reentrantX) return null

  const outerUpper = {
    x: x + width * outerEdge.upperX,
    y: y + height * outerEdge.upperY,
  }
  const outerReentrant = {
    x: x + width * outerEdge.reentrantX,
    y: y + height * outerEdge.reentrantY,
  }
  const outerMid = {
    x: x + width * outerEdge.x,
    y: y + height * outerEdge.y,
  }
  const outerBottom =
    outerEdge.bottomX != null
      ? {
          x: x + width * outerEdge.bottomX,
          y: y + height * outerEdge.bottomY,
        }
      : null

  if (column === 'left') {
    const points = [
      `${top.x1},${top.y1}`,
      `${top.x2},${top.y2}`,
      `${spineLowerBleed.x},${spineLowerBleed.y}`,
      `${bottom.x2},${bottom.y2}`,
      `${bottom.x1},${bottom.y1}`,
    ]
    if (outerBottom) points.push(`${outerBottom.x},${outerBottom.y}`)
    points.push(
      `${outerMid.x},${outerMid.y}`,
      `${outerUpper.x},${outerUpper.y}`,
      `${outerReentrant.x},${outerReentrant.y}`,
      `${top.x1},${top.y1}`,
    )
    return points.join(' ')
  }

  const points = [
    `${top.x1},${top.y1}`,
    `${top.x2},${top.y2}`,
    `${outerUpper.x},${outerUpper.y}`,
    `${outerMid.x},${outerMid.y}`,
  ]
  if (outerBottom) points.push(`${outerBottom.x},${outerBottom.y}`)
  points.push(
    `${bottom.x2},${bottom.y2}`,
    `${bottom.x1},${bottom.y1}`,
    `${spineLowerBleed.x},${spineLowerBleed.y}`,
  )
  return points.join(' ')
}

/** @deprecated Use `ensembleLogoRowRegionClipPoints(column, 1)` */
export function ensembleLogoRow1RegionClipPoints(
  column,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  return ensembleLogoRowRegionClipPoints(column, 1, viewBox)
}

/** Row-1 wing fill — main body + outer top tip (viewBox coords). */
export function ensembleLogoWingFillPolygonPoints(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  if (row !== 1) return null

  const lower = ENSEMBLE_LOGO_PATH_LOWER_EDGE[column]?.[row]
  const tip = ENSEMBLE_LOGO_PATH_TOP_TIP[column]?.[row]
  const outerEdge = ENSEMBLE_LOGO_PATH_OUTER_EDGE[column]?.[row]
  if (!lower || !tip || !outerEdge) return null

  const { x, y, width, height } = viewBox
  const bottom = edgeToViewBoxPoints(lower, viewBox)
  const outerTop = {
    x: x + width * tip.outerX,
    y: y + height * tip.outerY,
  }
  const innerTop = {
    x: x + width * tip.innerX,
    y: y + height * tip.innerY,
  }
  const outerMid = {
    x: x + width * outerEdge.x,
    y: y + height * outerEdge.y,
  }

  const spineTopMid = {
    x: x + width * 0.496,
    y: y + height * 0.208,
  }
  const spineTopCorner = {
    x: x + width * 0.496,
    y: y + height * 0.247,
  }

  if (column === 'left') {
    return [
      `${outerTop.x},${outerTop.y}`,
      `${innerTop.x},${innerTop.y}`,
      `${spineTopMid.x},${spineTopMid.y}`,
      `${spineTopCorner.x},${spineTopCorner.y}`,
      `${bottom.x2},${bottom.y2}`,
      `${bottom.x1},${bottom.y1}`,
      `${outerMid.x},${outerMid.y}`,
    ].join(' ')
  }

  return [
    `${outerTop.x},${outerTop.y}`,
    `${innerTop.x},${innerTop.y}`,
    `${spineTopMid.x},${spineTopMid.y}`,
    `${spineTopCorner.x},${spineTopCorner.y}`,
    `${bottom.x1},${bottom.y1}`,
    `${bottom.x2},${bottom.y2}`,
    `${outerMid.x},${outerMid.y}`,
  ].join(' ')
}

/** Lower wing seam — path-aligned diagonal (outer → spine side). */
export function ensembleLogoRibLowerEdge(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  const edge = ENSEMBLE_LOGO_PATH_LOWER_EDGE[column]?.[row]
  if (!edge) return null

  const { x, y, width, height } = viewBox
  return {
    x1: x + width * edge.x1,
    y1: y + height * edge.y1,
    x2: x + width * edge.x2,
    y2: y + height * edge.y2,
  }
}

/** Main + outer bleed regions for one tile (union clip). */
export function ensembleLogoTileClipRegions(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  const regions = []

  if (row === 1) {
    const rib = ensembleLogoRibClipPoints(column, row, viewBox)
    if (rib) regions.push({ kind: 'polygon', points: rib })
  } else {
    const band = ENSEMBLE_LOGO_ROW_BANDS.find((entry) => entry.row === row)
    if (band) {
      const rect = ensembleLogoRowClipRect(band, viewBox)
      regions.push({ kind: 'rect', ...rect })
    }
  }

  const bleed = ensembleLogoOuterWingBleedClipPoints(column, row, viewBox)
  if (bleed) regions.push({ kind: 'polygon', points: bleed })

  return regions
}

export function ensembleLogoOuterWingBleedClipPoints(
  column,
  row,
  viewBox = ENSEMBLE_LOGO_VIEWBOX,
) {
  const bleed = ENSEMBLE_LOGO_OUTER_WING_BLEED[row]
  if (!bleed) return null

  const { x, y, width, height } = viewBox
  const outerX = column === 'left' ? x : x + width
  const innerX =
    column === 'left'
      ? x + width * ENSEMBLE_LOGO_OUTER_BLEED_DEPTH
      : x + width * (1 - ENSEMBLE_LOGO_OUTER_BLEED_DEPTH)
  const yDiagOuter = y + height * bleed.outerY
  const yBandInner = y + height * bleed.bandY
  const yBandOuter = y + height * bleed.bandY

  if (column === 'left') {
    return `${outerX},${yDiagOuter} ${innerX},${yBandInner} ${outerX},${yBandOuter}`
  }

  return `${innerX},${yBandInner} ${outerX},${yDiagOuter} ${outerX},${yBandOuter}`
}
