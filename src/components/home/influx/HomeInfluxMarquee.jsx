import { cn } from '../../../lib/utils'

export default function HomeInfluxMarquee({ items, className }) {
  const list = items?.length ? items : []
  const doubled = [...list, ...list]

  return (
    <div
      data-home-reveal
      className={cn(
        'relative overflow-hidden py-3',
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-8 motion-reduce:animate-none">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-white/45 sm:text-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
