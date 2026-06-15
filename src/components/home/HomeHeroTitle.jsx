import { cn } from '../../lib/utils'
import { HOME_INFLUX_HERO } from '../../lib/homeInfluxContent'

/** Hero h1 — Ensemble editorial display (light Fraunces lockup). */
export default function HomeHeroTitle({ className, helixRail = false }) {
  return (
    <h1
      className={cn(
        'home-hero-title mx-auto text-white',
        helixRail && 'home-hero-title--helix-rail',
        className,
      )}
    >
      {HOME_INFLUX_HERO.lines.map((line, i) => (
        <span key={`line-${i}`} className="home-hero-line-mask">
          <span data-home-hero-line style={{ '--line-i': i }}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  )
}
