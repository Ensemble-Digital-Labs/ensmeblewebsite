import { useId } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navAppTiles } from '../data/navMenuIcons'
import {
  ENSEMBLE_LOGO_LEFT_PATH,
  ENSEMBLE_LOGO_LEFT_TRANSFORM,
  ENSEMBLE_LOGO_MASK_ASPECT,
  ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS,
  ENSEMBLE_LOGO_RIGHT_PATH,
  ENSEMBLE_LOGO_RIGHT_TRANSFORM,
  ENSEMBLE_LOGO_ROW_BANDS,
  ENSEMBLE_LOGO_VIEWBOX,
  ensembleLogoRowRegionClipPoints,
  ensembleLogoTileClipRegions,
} from '../data/ensembleLogoPaths'
import {
  ENSEMBLE_LOGO_TILE_ACCENTS,
  ENSEMBLE_LOGO_NAV_ICON_SIZE,
  ensembleLogoTileLayout,
} from '../data/ensembleLogoTileAnchors'
import { usePixelTransition } from './PixelTransition'
import { shouldUsePixelNav } from '../lib/pixelNav'

const DEFAULT_ICON_SIZE = ENSEMBLE_LOGO_NAV_ICON_SIZE

function wingContentTransform(pivotX, pivotY, wingRotate) {
  return `rotate(${wingRotate} ${pivotX} ${pivotY})`
}

function isTileActive(pathname, tilePath) {
  return pathname === tilePath || pathname.startsWith(`${tilePath}/`)
}

/** Full row-band hit target — icons/labels sit outside the narrow wing path. */
function tileHitRect(column, row, viewBox) {
  const band = ENSEMBLE_LOGO_ROW_BANDS.find((entry) => entry.row === row)
  if (!band) return null

  const padY = viewBox.height * 0.03
  const y = viewBox.y + viewBox.height * band.y0 - padY
  const height = viewBox.height * (band.y1 - band.y0) + padY * 2
  const halfWidth = viewBox.width * 0.54

  if (column === 'left') {
    return {
      x: viewBox.x - viewBox.width * 0.02,
      y,
      width: halfWidth,
      height,
    }
  }

  return {
    x: viewBox.x + viewBox.width - halfWidth + viewBox.width * 0.02,
    y,
    width: halfWidth,
    height,
  }
}

function TileColorWash({ pathD, pathTransform, accent }) {
  return (
    <g className="experiments-logo-nav-preview__color-wash">
      <path
        d={pathD}
        transform={pathTransform}
        className="experiments-logo-nav-preview__shape"
        fill={accent}
      />
      <path
        d={pathD}
        transform={pathTransform}
        className="experiments-logo-nav-preview__shape-edge"
        fill="none"
        stroke={accent}
        strokeWidth={1.2}
      />
    </g>
  )
}

/**
 * Official E mark — six nav tiles with path-native hover fill (approved geometry).
 * Used in fullscreen nav and `/experiments` preview.
 */
export default function EnsembleLogoNav({
  className = '',
  onLinkClick,
  ariaLabel = 'Primary navigation',
  iconSize = DEFAULT_ICON_SIZE,
  labelFontSize,
  textYLift,
}) {
  const id = useId().replace(/:/g, '')
  const navigate = useNavigate()
  const location = useLocation()
  const pixel = usePixelTransition()
  const vb = ENSEMBLE_LOGO_VIEWBOX

  const handleTileClick = (event, tile) => {
    event.preventDefault()
    const targetPath = tile.path
    onLinkClick?.(event)

    if (shouldUsePixelNav(location.pathname, targetPath) && pixel?.navigateWithPixel) {
      void pixel.navigateWithPixel(targetPath, { fromPath: location.pathname })
      return
    }

    navigate(targetPath)
  }

  return (
    <svg
      className={`experiments-logo-nav-preview ${className}`.trim()}
      style={{ aspectRatio: ENSEMBLE_LOGO_MASK_ASPECT }}
      viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="navigation"
      aria-label={ariaLabel}
    >
      <defs>
        {navAppTiles.map((tile) => {
          const regions = ensembleLogoTileClipRegions(tile.column, tile.row, vb)
          return (
            <clipPath
              key={`clip-tile-${tile.column}-${tile.row}`}
              id={`${id}-clip-tile-${tile.column}-${tile.row}`}
            >
              {regions.map((region, index) =>
                region.kind === 'rect' ? (
                  <rect
                    key={`${tile.column}-${tile.row}-region-${index}`}
                    x={region.x}
                    y={region.y}
                    width={region.width}
                    height={region.height}
                  />
                ) : (
                  <polygon
                    key={`${tile.column}-${tile.row}-region-${index}`}
                    points={region.points}
                  />
                ),
              )}
            </clipPath>
          )
        })}
        <clipPath id={`${id}-clip-left-path`}>
          <path d={ENSEMBLE_LOGO_LEFT_PATH} transform={ENSEMBLE_LOGO_LEFT_TRANSFORM} />
        </clipPath>
        <clipPath id={`${id}-clip-right-path`}>
          <path d={ENSEMBLE_LOGO_RIGHT_PATH} transform={ENSEMBLE_LOGO_RIGHT_TRANSFORM} />
        </clipPath>
        {ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS.map((row) =>
          ['left', 'right'].map((column) => {
            const region = ensembleLogoRowRegionClipPoints(column, row, vb)
            if (!region) return null
            return (
              <clipPath
                key={`clip-row${row}-${column}`}
                id={`${id}-clip-row${row}-${column}`}
              >
                <polygon points={region} />
              </clipPath>
            )
          }),
        )}
        <clipPath id={`${id}-icon-round`} clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.5" r="0.5" />
        </clipPath>
      </defs>

      <g className="experiments-logo-nav-preview__base" aria-hidden>
        <path
          d={ENSEMBLE_LOGO_LEFT_PATH}
          transform={ENSEMBLE_LOGO_LEFT_TRANSFORM}
          className="experiments-logo-nav-preview__base-shape"
        />
        <path
          d={ENSEMBLE_LOGO_RIGHT_PATH}
          transform={ENSEMBLE_LOGO_RIGHT_TRANSFORM}
          className="experiments-logo-nav-preview__base-shape"
        />
      </g>

      {[...navAppTiles]
        .sort((a, b) => a.row - b.row)
        .map((tile) => {
          const isLeft = tile.column === 'left'
          const pathD = isLeft ? ENSEMBLE_LOGO_LEFT_PATH : ENSEMBLE_LOGO_RIGHT_PATH
          const pathTransform = isLeft
            ? ENSEMBLE_LOGO_LEFT_TRANSFORM
            : ENSEMBLE_LOGO_RIGHT_TRANSFORM
          const anchorKey = `${tile.column}-${tile.row}`
          const layout = ensembleLogoTileLayout(anchorKey, vb, { iconSize, textYLift })
          const accent = ENSEMBLE_LOGO_TILE_ACCENTS[tile.accent] ?? '#1fa7f2'
          const tileClip = `url(#${id}-clip-tile-${tile.column}-${tile.row})`
          const pathHalfClip = isLeft
            ? `url(#${id}-clip-left-path)`
            : `url(#${id}-clip-right-path)`
          const usesPathNativeFill = ENSEMBLE_LOGO_PATH_NATIVE_FILL_ROWS.includes(
            tile.row,
          )
          const rowRegionClip = usesPathNativeFill
            ? `url(#${id}-clip-row${tile.row}-${tile.column})`
            : null
          const isActive = isTileActive(location.pathname, tile.path)

          if (!layout) return null

          const hitRect = tileHitRect(tile.column, tile.row, vb)

          const iconTransform = wingContentTransform(
            layout.rotateCx,
            layout.iconCy,
            layout.wingRotate,
          )
          const textTransform = wingContentTransform(
            layout.textCx,
            layout.textCy,
            layout.wingRotate,
          )

          return (
            <g
              key={tile.id}
              className={`experiments-logo-nav-preview__slice experiments-logo-nav-preview__slice--${tile.column} experiments-logo-nav-preview__slice--row-${tile.row}`}
            >
              <a
                href={tile.path}
                className={`experiments-logo-nav-preview__link experiments-logo-nav-preview__link--${tile.accent}${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={tile.label}
                onClick={(event) => handleTileClick(event, tile)}
              >
                <g
                  className="experiments-logo-nav-preview__section-edge-wrap"
                  clipPath={usesPathNativeFill ? pathHalfClip : tileClip}
                  pointerEvents="none"
                >
                  <g clipPath={rowRegionClip ?? undefined}>
                    <path
                      d={pathD}
                      transform={pathTransform}
                      fill="none"
                      stroke={accent}
                      className="experiments-logo-nav-preview__section-edge"
                      style={{ '--tile-accent': accent }}
                    />
                  </g>
                </g>
                <g
                  className="experiments-logo-nav-preview__clip-shape"
                  clipPath={usesPathNativeFill ? pathHalfClip : tileClip}
                >
                  <g clipPath={rowRegionClip ?? undefined}>
                    <path
                      d={pathD}
                      transform={pathTransform}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={12}
                      className="experiments-logo-nav-preview__hit"
                      pointerEvents="all"
                    />
                    <TileColorWash
                      pathD={pathD}
                      pathTransform={pathTransform}
                      accent={accent}
                    />
                  </g>
                </g>
                <g className="experiments-logo-nav-preview__content" pointerEvents="none">
                  {tile.icon?.src ? (
                    <g
                      className="experiments-logo-nav-preview__icon"
                      transform={iconTransform}
                    >
                      <circle
                        cx={layout.rotateCx}
                        cy={layout.iconCy}
                        r={iconSize / 2}
                        className="experiments-logo-nav-preview__icon-bg"
                        fill={
                          tile.icon.variant === 'nav-menu'
                            ? 'transparent'
                            : 'rgba(8, 14, 28, 0.82)'
                        }
                      />
                      <image
                        href={tile.icon.src}
                        x={layout.rotateCx - iconSize / 2}
                        y={layout.iconCy - iconSize / 2}
                        width={iconSize}
                        height={iconSize}
                        preserveAspectRatio={
                          tile.icon.fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'
                        }
                        clipPath={`url(#${id}-icon-round)`}
                        className="experiments-logo-nav-preview__icon-img"
                      />
                      <circle
                        cx={layout.rotateCx}
                        cy={layout.iconCy}
                        r={iconSize / 2}
                        className="experiments-logo-nav-preview__icon-ring"
                        fill="none"
                        stroke={accent}
                        strokeWidth={1.1}
                      />
                    </g>
                  ) : null}
                  <text
                    transform={textTransform}
                    x={layout.textCx}
                    y={layout.textCy}
                    textAnchor={layout.textAnchor}
                    dominantBaseline="middle"
                    className="experiments-logo-nav-preview__label"
                    style={labelFontSize != null ? { fontSize: labelFontSize } : undefined}
                  >
                    {tile.label}
                  </text>
                </g>
                {hitRect ? (
                  <rect
                    x={hitRect.x}
                    y={hitRect.y}
                    width={hitRect.width}
                    height={hitRect.height}
                    className="experiments-logo-nav-preview__tile-hit"
                  />
                ) : null}
              </a>
            </g>
          )
        })}
    </svg>
  )
}
