import { cn } from '../../lib/utils'

/** Per-card asymmetric placement (wave + tilt; neutralized under motion-reduce). */
const TRUST_CARD_STAGGERS = [
  'max-sm:-translate-x-[3%] sm:translate-x-0 motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!rotate-0 motion-reduce:!scale-100 motion-reduce:!shadow-none motion-reduce:ring-0 sm:h-full md:translate-y-[0.625rem] md:-rotate-[1deg] md:self-end lg:translate-y-7 xl:translate-x-[-0.125rem]',
  'motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!rotate-0 motion-reduce:!scale-100 motion-reduce:!shadow-none motion-reduce:!ring-0 sm:h-full md:z-[2] md:-translate-y-2 md:scale-[1.035] md:shadow-[0_28px_80px_-32px_rgba(0,0,0,0.65)] lg:-translate-y-4 lg:ring-1 lg:ring-white/[0.14] xl:shadow-[0_32px_90px_-28px_rgba(0,0,0,0.55)]',
  'max-sm:translate-x-[3%] sm:translate-x-0 motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!rotate-0 motion-reduce:!scale-100 motion-reduce:!shadow-none motion-reduce:ring-0 sm:h-full md:translate-y-[1.125rem] md:rotate-[1.25deg] md:self-start lg:translate-y-10 xl:translate-x-[0.125rem]',
]

/**
 * Three glass stat cards for the home Trust band (`#home-trust`).
 * Layout: asymmetric “floating cluster” (not a flat grid row).
 * @param {{ value: string, label: string }[]} stats
 */
export default function TrustStatCards({ stats, className }) {
  const list = Array.isArray(stats) ? stats : []

  return (
    <div
      className={cn(
        'trust-stat-cards relative isolate flex flex-col flex-wrap items-center justify-center gap-4 pb-6 pt-3 xs:gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:pb-8 lg:gap-10',
        className,
      )}
    >
      {/* Soft runway behind cards — reinforces curve without loud UI chrome */}
      <div
        className="pointer-events-none absolute inset-x-[6%] top-[52%] -z-[1] h-[min(52%,340px)] rounded-[999px] bg-gradient-to-b from-cyan-500/[0.05] via-fuchsia-500/[0.06] to-transparent blur-3xl opacity-90 motion-reduce:opacity-0 sm:top-[58%] sm:inset-x-[4%] md:top-[45%]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] -z-[2] hidden h-[1px] w-[min(88%,840px)] -translate-x-1/2 sm:block md:top-[38%]"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg,transparent,rgba(34,211,238,0.15) 18%,rgba(244,114,182,0.12) 50%,rgba(34,211,238,0.15) 82%,transparent)',
        }}
      />

      {list.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'trust-stat-card home-scene-surface-dark home-scene-elevate flex min-h-[7.25rem] w-full min-w-0 max-w-xl flex-[1_1_100%] flex-col justify-center rounded-2xl border border-white/[0.12] p-5 text-center transition-[transform,box-shadow] duration-300 sm:min-h-[8rem] sm:flex-1 sm:basis-0 sm:max-w-none sm:p-6 md:min-h-[8.25rem] md:rounded-3xl md:px-5 md:py-7 lg:px-6 lg:text-left',
            TRUST_CARD_STAGGERS[i] ?? '',
          )}
        >
          <p className="font-display text-[clamp(1.875rem,calc(0.85rem+3.8vw),2.75rem)] font-extrabold leading-none tracking-[-0.02em] text-white md:text-4xl">
            {s.value}
          </p>
          <p className="mx-auto mt-3 max-w-[14rem] text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-white/50 sm:mt-3.5 sm:text-[0.625rem] sm:tracking-[0.18em] lg:mx-0">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
