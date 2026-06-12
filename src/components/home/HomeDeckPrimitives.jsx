import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/** Soft gradient wash behind a deck chapter (no HUD chrome). */
export function DeckMeshBackdrop({ className }) {
  return (
    <div
      className={cn(
        'home-deck-mesh-backdrop pointer-events-none absolute inset-0 -z-[1] overflow-hidden',
        className,
      )}
      aria-hidden
    >
      <div className="absolute -left-[20%] top-[10%] h-[55%] w-[55%] rounded-full bg-cyan-500/[0.07] blur-3xl" />
      <div className="absolute -right-[15%] bottom-[5%] h-[45%] w-[50%] rounded-full bg-[color:var(--color-growth-from)]/[0.06] blur-3xl" />
    </div>
  )
}

/** Glass panel — `accent` adds gradient border ring. */
export function DeckPanel({
  children,
  className,
  variant = 'dark',
  accent = false,
  dataHomeReveal = false,
  as: Tag = 'div',
  ...props
}) {
  return (
    <Tag
      {...(dataHomeReveal ? { 'data-home-reveal': true } : {})}
      className={cn(
        'relative rounded-2xl backdrop-blur-md md:rounded-3xl',
        variant === 'dark' &&
          'border border-white/[0.12] bg-gradient-to-br from-white/[0.09] to-white/[0.03] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)]',
        variant === 'light' &&
          'border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/95 text-slate-900 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.35)]',
        variant === 'highlight' &&
          'border border-cyan-400/35 bg-gradient-to-br from-cyan-500/[0.14] to-[#0a1628]/80 shadow-[0_28px_70px_-32px_rgba(34,211,238,0.25)]',
        accent &&
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:content-[""] before:[background:linear-gradient(135deg,rgba(34,211,238,0.45),rgba(251,191,36,0.25),rgba(34,211,238,0.2))] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function DeckStepBadge({ step, className }) {
  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] text-xs font-extrabold text-white shadow-lg',
        className,
      )}
    >
      {step}
    </span>
  )
}

export function DeckGhostButton({ to, children, className, ...props }) {
  return (
    <Link
      to={to}
      data-home-reveal
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/[0.12] sm:text-base',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
