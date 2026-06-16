import { useEffect, useId, useRef } from 'react'
import { gsap } from 'gsap'
import {
  ENSEMBLE_LOGO_GRADIENTS,
  ENSEMBLE_LOGO_LEFT_PATH,
  ENSEMBLE_LOGO_LEFT_TRANSFORM,
  ENSEMBLE_LOGO_MASK_ASPECT,
  ENSEMBLE_LOGO_RIGHT_PATH,
  ENSEMBLE_LOGO_RIGHT_TRANSFORM,
  ENSEMBLE_LOGO_VIEWBOX,
} from '../../data/ensembleLogoPaths'
import { prefersReducedMotion } from '../../lib/utils'

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

/** Official Ensemble E mark — SVG paths + brand gradients. */
export default function EnsembleLogoMark({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const rootRef = useRef(null)
  const vb = ENSEMBLE_LOGO_VIEWBOX

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const left = root.querySelector('.ensemble-logo-mark__left')
    const right = root.querySelector('.ensemble-logo-mark__right')
    if (!left || !right) return

    gsap.killTweensOf([left, right])

    if (prefersReducedMotion()) {
      gsap.set([left, right], { opacity: 1, x: 0, y: 0 })
      return
    }

    gsap.set(left, { opacity: 0, x: -14, transformOrigin: 'right center' })
    gsap.set(right, { opacity: 0, x: 14, transformOrigin: 'left center' })

    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.72 } })
      .to(left, { opacity: 1, x: 0 }, 0.04)
      .to(right, { opacity: 1, x: 0 }, 0.1)
  }, [])

  return (
    <div
      ref={rootRef}
      className={`ensemble-logo-mark ${className}`.trim()}
      role="img"
      aria-label="Ensemble Digital Labs logo mark"
    >
      <svg
        className="ensemble-logo-mark__svg"
        style={{ aspectRatio: ENSEMBLE_LOGO_MASK_ASPECT }}
        viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <LogoGradients id={id} />
        </defs>

        <g className="ensemble-logo-mark__left">
          <path
            d={ENSEMBLE_LOGO_LEFT_PATH}
            transform={ENSEMBLE_LOGO_LEFT_TRANSFORM}
            fill={`url(#${id}-left)`}
          />
        </g>
        <g className="ensemble-logo-mark__right">
          <path
            d={ENSEMBLE_LOGO_RIGHT_PATH}
            transform={ENSEMBLE_LOGO_RIGHT_TRANSFORM}
            fill={`url(#${id}-right)`}
          />
        </g>
      </svg>
    </div>
  )
}
