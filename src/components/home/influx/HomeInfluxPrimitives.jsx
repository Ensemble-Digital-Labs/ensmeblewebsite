import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/utils'
import HomeMaskReveal from '../HomeMaskReveal'

/** Influx-style headlines on Ensemble dark deck. */
export function InfluxDisplayTitle({
  lines,
  className,
  accentIndex = 1,
  as: Tag = 'h2',
  maskLoad = false,
}) {
  const arr = Array.isArray(lines) ? lines : []
  const lineLg = 'text-[clamp(2.5rem,calc(0.85rem+7.2vw),5.5rem)] leading-[1.1]'
  const lineMd = 'text-[clamp(2.25rem,calc(0.75rem+6.5vw),4.75rem)] leading-[1.08]'
  const lineSm = 'text-[clamp(2rem,calc(0.55rem+5.8vw),4.25rem)] leading-[1.08]'

  const lineNodes = arr.map((line, i) => (
    <HomeMaskReveal
      key={`${line}-${i}`}
      load={maskLoad}
      delay={i * 0.14}
      innerClassName={cn(
        i === 0 && cn(lineMd, 'font-extrabold'),
        i === 1 &&
          cn(
            lineLg,
            'font-extrabold',
            accentIndex === i
              ? 'home-influx-gradient-text bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] bg-clip-text text-transparent'
              : null,
          ),
        i >= 2 && cn(lineSm, 'font-bold text-white/95'),
      )}
    >
      {line}
    </HomeMaskReveal>
  ))

  return (
    <Tag
      className={cn(
        'font-display font-bold tracking-[-0.03em] text-[var(--ifx-ink,#fff)]',
        className,
      )}
    >
      {maskLoad ? lineNodes : <span data-home-mask-group>{lineNodes}</span>}
    </Tag>
  )
}

export function InfluxSectionTitle({ children, className }) {
  return (
    <h2
      className={cn(
        'font-display text-[clamp(1.75rem,calc(0.5rem+4vw),3rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--ifx-ink,#fff)]',
        className,
      )}
    >
      <HomeMaskReveal>{children}</HomeMaskReveal>
    </h2>
  )
}

export function InfluxEyebrow({ children, className }) {
  return (
    <HomeMaskReveal
      as="p"
      className={cn(
        'text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/75 sm:text-xs',
        className,
      )}
    >
      {children}
    </HomeMaskReveal>
  )
}

export function InfluxLead({ children, className }) {
  return (
    <HomeMaskReveal
      as="p"
      delay={0.08}
      className={cn(
        'max-w-2xl text-[clamp(1rem,0.35rem+1.1vw,1.125rem)] leading-[1.65] text-[var(--ifx-muted,rgba(255,255,255,0.72))]',
        className,
      )}
    >
      {children}
    </HomeMaskReveal>
  )
}

export function InfluxCard({ children, className, href, dataHomeReveal = true }) {
  const body = (
    <div
      {...(dataHomeReveal ? { 'data-home-reveal': true } : {})}
      className={cn(
        'home-influx-card overflow-hidden rounded-[15px] border border-white/[0.12]',
        'bg-gradient-to-br from-white/[0.1] to-white/[0.03] backdrop-blur-md',
        'p-6 sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
  if (href) {
    return (
      <Link to={href} className="block no-underline">
        {body}
      </Link>
    )
  }
  return body
}

export function InfluxTextLink({ to, children, className }) {
  return (
    <Link
      data-home-reveal
      to={to}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition-colors hover:text-white',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}

export function InfluxPrimaryButton({ to, children, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] px-8 py-3 text-sm font-bold text-white no-underline shadow-lg transition-opacity hover:opacity-95 sm:text-base',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function InfluxSecondaryButton({ to, children, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-bold text-white no-underline transition-colors hover:bg-white/[0.08] sm:text-base',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function InfluxLightBand({ children, className }) {
  return (
    <div
      className={cn(
        'home-influx-light-band rounded-2xl border border-white/[0.14] px-5 py-8 sm:rounded-3xl sm:px-8 sm:py-10 md:px-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
