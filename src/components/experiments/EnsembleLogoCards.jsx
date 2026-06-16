import { useId } from 'react'
import {
  ENSEMBLE_LOGO_GRADIENTS,
  ENSEMBLE_LOGO_LEFT_PATH,
  ENSEMBLE_LOGO_LEFT_TRANSFORM,
  ENSEMBLE_LOGO_MASK_ASPECT,
  ENSEMBLE_LOGO_RIGHT_PATH,
  ENSEMBLE_LOGO_RIGHT_TRANSFORM,
  ENSEMBLE_LOGO_ROW_BANDS,
  ENSEMBLE_LOGO_VIEWBOX,
  ensembleLogoRowClipRect,
} from '../../data/ensembleLogoPaths'

function LogoGradients({ id }) {
  const { left, right } = ENSEMBLE_LOGO_GRADIENTS

  return (
    <>
      <linearGradient
        id={`${id}-left`}
        x1={left.x1}
        y1={left.y1}
        x2={left.x2}
        y2={left.y2}
        gradientUnits="objectBoundingBox"
      >
        {left.stops.map((stop) => (
          <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
      <linearGradient
        id={`${id}-right`}
        x1={right.x1}
        y1={right.y1}
        x2={right.x2}
        y2={right.y2}
        gradientUnits="objectBoundingBox"
      >
        {right.stops.map((stop) => (
          <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
    </>
  )
}

/**
 * Six cards = three horizontal bands × two official path halves.
 * Shape is exact — each card is a clipped slice of the real SVG geometry.
 */
export default function EnsembleLogoCards({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const vb = ENSEMBLE_LOGO_VIEWBOX

  return (
    <svg
      className={`ensemble-logo-cards__svg ${className}`.trim()}
      style={{ aspectRatio: ENSEMBLE_LOGO_MASK_ASPECT }}
      viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ensemble logo mark built from six path slices"
    >
      <defs>
        <LogoGradients id={id} />
        {ENSEMBLE_LOGO_ROW_BANDS.map((row) => {
          const rect = ensembleLogoRowClipRect(row)
          return (
            <clipPath key={`clip-${row.row}`} id={`${id}-clip-row-${row.row}`}>
              <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} />
            </clipPath>
          )
        })}
      </defs>

      {ENSEMBLE_LOGO_ROW_BANDS.map((row) => (
        <g
          key={`card-left-${row.row}`}
          className={`ensemble-logo-cards__card ensemble-logo-cards__card--left ensemble-logo-cards__card--row-${row.row}`}
          clipPath={`url(#${id}-clip-row-${row.row})`}
        >
          <path
            d={ENSEMBLE_LOGO_LEFT_PATH}
            transform={ENSEMBLE_LOGO_LEFT_TRANSFORM}
            fill={`url(#${id}-left)`}
          />
        </g>
      ))}

      {ENSEMBLE_LOGO_ROW_BANDS.map((row) => (
        <g
          key={`card-right-${row.row}`}
          className={`ensemble-logo-cards__card ensemble-logo-cards__card--right ensemble-logo-cards__card--row-${row.row}`}
          clipPath={`url(#${id}-clip-row-${row.row})`}
        >
          <path
            d={ENSEMBLE_LOGO_RIGHT_PATH}
            transform={ENSEMBLE_LOGO_RIGHT_TRANSFORM}
            fill={`url(#${id}-right)`}
          />
        </g>
      ))}
    </svg>
  )
}
