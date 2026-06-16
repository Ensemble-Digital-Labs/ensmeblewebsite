import { useId } from 'react'
import { cn } from '../../lib/utils'
import { RING_PROGRESS_PATH } from '../../hooks/useDnaStyleCountUp'

/**
 * DNA Capital–style stat ring — progress arc is a path (reliable dash draw) with gradient stroke.
 */
export default function DnaStyleStatRing({ active = false, progressRef, valueRef, className, children }) {
  const gradientId = useId().replace(/:/g, '')

  return (
    <div className={cn('dna-style-stat-ring', active && 'is-active', className)}>
      <svg className="dna-style-stat-ring__svg" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="42%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#3b5bdb" />
          </linearGradient>
        </defs>
        <circle className="dna-style-stat-ring__track" cx="50" cy="50" r="46" vectorEffect="non-scaling-stroke" />
        <path
          ref={progressRef}
          className="dna-style-stat-ring__progress"
          d={RING_PROGRESS_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
        />
      </svg>
      <span ref={valueRef} className="dna-style-stat-ring__value">
        {children}
      </span>
    </div>
  )
}
