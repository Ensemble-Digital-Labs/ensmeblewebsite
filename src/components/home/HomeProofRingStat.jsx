import { useRef } from 'react'
import { cn } from '../../lib/utils'
import DnaStyleStatRing from '../shared/DnaStyleStatRing'
import { parseDnaCountStat, useDnaStyleCountUp } from '../../hooks/useDnaStyleCountUp'

export default function HomeProofRingStat({ value, label, scriptLabel = false, className, style, staggerIndex = 0 }) {
  const parsed = parseDnaCountStat(value)
  const ringProgressRef = useRef(null)
  const { valueRef, containerRef, isActive } = useDnaStyleCountUp(value, '', {
    syncWithHomeScroll: true,
    staggerDelay: staggerIndex * 120,
    ringProgressRef,
  })

  return (
    <li
      ref={containerRef}
      className={cn('home-proof-stat home-proof-stat--ring', className)}
      style={style}
    >
      <DnaStyleStatRing
        active={isActive}
        progressRef={ringProgressRef}
        valueRef={valueRef}
        className="home-proof-stat-ring"
      >
        {parsed ? `0${parsed.suffix}` : value}
      </DnaStyleStatRing>
      <p className={cn('home-proof-stat-label', scriptLabel && 'home-proof-stat-label--script')}>{label}</p>
    </li>
  )
}
