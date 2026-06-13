import { cn } from '../../lib/utils'
import HomeMaskReveal from './HomeMaskReveal'

/**
 * Shared eyebrow + title + lead for home deck chapters (agency-style scan rhythm).
 */
export default function HomeSectionHeader({
  title,
  lead,
  action,
  className,
  titleClassName,
  leadClassName,
}) {
  return (
    <header className={cn('max-w-3xl', className)} data-home-mask-group>
      {title ? (
        <HomeMaskReveal
          as="h2"
          delay={0.08}
          className="mt-3"
          innerClassName={cn(
            'font-display text-[clamp(1.75rem,calc(1rem+2.8vw),2.25rem)] font-extrabold leading-tight text-white md:text-3xl',
            titleClassName,
          )}
        >
          {title}
        </HomeMaskReveal>
      ) : null}
      {lead ? (
        <HomeMaskReveal
          as="p"
          delay={0.16}
          className="mt-4"
          innerClassName={cn(
            'max-w-2xl text-[clamp(1rem,calc(0.35rem+1.1vw),1.25rem)] font-normal leading-[1.55] text-white/72 md:text-lg',
            leadClassName,
          )}
        >
          {lead}
        </HomeMaskReveal>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </header>
  )
}
