import { motion, useReducedMotion } from 'framer-motion'
import { HOME_HERO_ATMOSPHERE_STYLE } from '../../lib/homeAtmosphereScenes'
import { cn } from '../../lib/utils'

/**
 * Animated curved paths (reference: floating line field).
 * Pairs with Ensemble light theme — growth rose/slate strokes.
 */
function FloatingPaths({ position, className }) {
  const reduceMotion = useReducedMotion()

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${
      216 - i * 6
    } ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${
      875 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    /** Stable “random” duration per path (avoids Math.random on each render) */
    duration: 18 + (i % 11) * 1.4,
  }))

  /* Paths use coordinates roughly x ∈ [-560, 720], y ∈ [-200, 880] — old viewBox 696×316 clipped almost everything */
  const vb = '-560 -220 1320 1120'

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className={cn('h-full w-full', className ?? 'text-brand-primary')}
        viewBox={vb}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden
      >
        <title>Background paths</title>
        {paths.map((path) =>
          reduceMotion ? (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width * 1.25}
              strokeOpacity={Math.min(0.55, 0.12 + path.id * 0.024)}
              fill="none"
            />
          ) : (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width * 1.25}
              strokeOpacity={Math.min(0.55, 0.12 + path.id * 0.024)}
              initial={{ pathLength: 0.35 }}
              animate={{
                pathLength: 1,
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
          )
        )}
      </svg>
    </div>
  )
}

/**
 * Full-bleed layer for use inside `ParallaxDepth` `layer1` or any `relative` section.
 * `tone="light"` — soft #FAFAFA base; `tone="dark"` — home hero plum atmosphere + paths.
 */
export function BackgroundPathsParallaxLayer({ tone = 'light', pathsOnly = false }) {
  const pathStroke =
    tone === 'dark'
      ? 'text-[#c4b5fd]/35'
      : 'text-brand-primary'

  const pathField = (
    <div className="absolute inset-0">
      <FloatingPaths position={1} className={pathStroke} />
      <FloatingPaths position={-1} className={pathStroke} />
    </div>
  )

  if (tone === 'dark') {
    return (
      <>
        {!pathsOnly && (
          <div className="absolute inset-0" style={HOME_HERO_ATMOSPHERE_STYLE} aria-hidden />
        )}
        {pathField}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
          aria-hidden
        />
      </>
    )
  }

  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#f6fafc] to-bg-secondary/90"
        aria-hidden
      />
      <div className="absolute inset-0">
        <FloatingPaths position={1} className={pathStroke} />
        <FloatingPaths position={-1} className={pathStroke} />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/15 to-transparent"
        aria-hidden
      />
    </>
  )
}

export default BackgroundPathsParallaxLayer
