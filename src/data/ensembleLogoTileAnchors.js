/**
 * Wing-axis layout — icons fixed at mirrored spine distances; labels sit outward.
 * Text anchors to the icon edge (end=left, start=right) so gap is exact, not estimated.
 */

import { ENSEMBLE_LOGO_ROW_BANDS } from './ensembleLogoPaths'

export const ENSEMBLE_LOGO_NAV_ICON_SIZE = 40
const UNIFORM_LABEL_ICON_GAP = 5

/** Where labels sit within each row band (0 = top edge, 1 = bottom edge) */
export const ENSEMBLE_LOGO_ROW_BAND_Y = {
  1: 0.84,
  2: 0.77,
  3: 0.65,
}

/** Shared wing tilt per row — left gets +angle, right gets −angle */
export const ENSEMBLE_LOGO_ROW_WING_ANGLES = {
  1: 27,
  2: 27,
  3: 27,
}

/** Positive values lift icons up (viewBox units); labels stay on row band Y */
export const ENSEMBLE_LOGO_ROW_ICON_Y_LIFT = {
  1: 7,
  2: 7,
  3: 7,
}

/** Positive values lift labels up (viewBox units); icons unchanged */
export const ENSEMBLE_LOGO_ROW_TEXT_Y_LIFT = {
  1: 5,
  2: 5,
  3: 5,
}

export const ENSEMBLE_LOGO_TILE_ANCHORS = {
  'left-1': { pivotX: 0.25, iconAlong: 35 },
  'left-2': { pivotX: 0.25, iconAlong: 35 },
  'left-3': { pivotX: 0.25, iconAlong: 35 },
  'right-1': { pivotX: 0.75, iconAlong: -35 },
  'right-2': { pivotX: 0.75, iconAlong: -35 },
  'right-3': { pivotX: 0.75, iconAlong: -35 },
}

export const ENSEMBLE_LOGO_TILE_ACCENTS = {
  blue: '#1fa7f2',
  orange: '#ffaf53',
  teal: '#3da993',
  coral: '#f77b74',
  lime: '#d4c42a',
  purple: '#a857e5',
}

export function ensembleLogoTileLayout(key, viewBox, options = {}) {
  const anchor = ENSEMBLE_LOGO_TILE_ANCHORS[key]
  if (!anchor) return null

  const iconSize = options.iconSize ?? ENSEMBLE_LOGO_NAV_ICON_SIZE
  const iconHalf = iconSize / 2

  const row = Number(key.split('-')[1])
  const rowBand = ENSEMBLE_LOGO_ROW_BANDS.find((band) => band.row === row)
  const bandY = ENSEMBLE_LOGO_ROW_BAND_Y[row] ?? 0.5
  const pivotYFraction = rowBand
    ? rowBand.y0 + (rowBand.y1 - rowBand.y0) * bandY
    : 0.5

  const pivotX = viewBox.x + viewBox.width * anchor.pivotX
  const pivotY = viewBox.y + viewBox.height * pivotYFraction
  const isLeft = key.startsWith('left')
  const { iconAlong } = anchor
  const magnitude = ENSEMBLE_LOGO_ROW_WING_ANGLES[row] ?? 0
  const wingRotate = isLeft ? magnitude : -magnitude
  const iconYLift = ENSEMBLE_LOGO_ROW_ICON_Y_LIFT[row] ?? 0
  const textYLift = options.textYLift ?? ENSEMBLE_LOGO_ROW_TEXT_Y_LIFT[row] ?? 0
  const textCy = pivotY - textYLift
  const iconCy = pivotY - iconYLift
  const rotateCx = pivotX + iconAlong

  const textAlong = isLeft
    ? iconAlong - UNIFORM_LABEL_ICON_GAP - iconHalf
    : iconAlong + UNIFORM_LABEL_ICON_GAP + iconHalf
  const textCx = rotateCx + textAlong - iconAlong

  return {
    pivotX,
    pivotY,
    rotateCx,
    iconCy,
    textCx,
    textCy,
    wingRotate,
    textAlong,
    iconAlong,
    textAnchor: isLeft ? 'end' : 'start',
  }
}
