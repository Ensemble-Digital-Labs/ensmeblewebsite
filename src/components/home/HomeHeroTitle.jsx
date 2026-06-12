import { cn } from '../../lib/utils'
import { HOME_INFLUX_HERO } from '../../lib/homeInfluxContent'

const LINE_LG = 'text-[clamp(2.5rem,calc(0.85rem+7.2vw),5.5rem)]'
const LINE_MD = 'text-[clamp(2.25rem,calc(0.75rem+6.5vw),4.75rem)]'
const LINE_SM = 'text-[clamp(2rem,calc(0.55rem+5.8vw),4.25rem)]'

/** Hero h1 — mask wrappers reserve space for g/y/p descenders. */
export default function HomeHeroTitle({ className }) {
  const lines = HOME_INFLUX_HERO.lines

  return (
    <h1
      className={cn(
        'home-hero-title mx-auto font-display font-bold tracking-[-0.03em] text-white',
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="home-hero-line-mask">
          <span
            data-home-hero-line
            style={{ '--line-i': i }}
            className={cn(
              'block text-white',
              i === 0 && cn(LINE_MD, 'font-extrabold'),
              i === 1 &&
                cn(
                  LINE_LG,
                  'home-hero-line-accent font-extrabold',
                ),
              i >= 2 && cn(LINE_SM, 'font-bold text-white/95'),
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  )
}
