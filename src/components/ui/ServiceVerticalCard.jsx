import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import ContextualIcon, { ContextualIconFrame } from './ContextualIcon'

const CTA_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/**
 * Services-page vertical card — gradient border shell, glass body, ambient image, hover CTA.
 */
export default function ServiceVerticalCard({
  title,
  description,
  to,
  accent,
  image,
  icon: Icon,
  contextIcon,
  linkLabel = 'Explore this service',
  compact = false,
  interactive = true,
  showCta = true,
  imagePosition = 'center center',
  className,
}) {
  const elevatedIcon = contextIcon?.src ? contextIcon : null
  const shellClass = cn(
    'group relative block',
    interactive ? 'no-underline' : 'cursor-default',
    compact ? 'h-auto' : 'h-full',
    className,
  )

  const cardInner = (
      <div
        className={cn(
          'relative rounded-[3rem] bg-gradient-to-br p-[1px] transition-all duration-700',
          compact ? 'h-auto' : 'h-full',
          accent,
          'group-hover:translate-y-[-6px] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)] motion-reduce:group-hover:translate-y-0',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-[2.8rem] border border-white/5 bg-[#0C0E13]/80 backdrop-blur-2xl transition-all duration-700 group-hover:border-white/20 group-hover:bg-[#12141B]/90',
            compact
              ? 'h-auto'
              : 'h-full min-h-[320px] lg:min-h-[380px] xl:min-h-[400px]',
          )}
        >
          <div
            className={cn(
              'relative z-20 flex flex-col',
              compact ? 'p-7 lg:p-8' : 'h-full flex-col p-8 lg:p-9 xl:p-10',
            )}
          >
            <div
              className={cn(
                'mb-3 flex w-full items-center gap-3',
                compact ? 'justify-center' : 'flex-col items-start gap-0',
              )}
            >
              {elevatedIcon ? (
                <ContextualIconFrame
                  size={compact ? 'md' : 'lg'}
                  className={cn(
                    'shrink-0 transition-transform duration-500 group-hover:scale-105',
                    !compact && 'mb-5 xl:mb-8',
                  )}
                >
                  <ContextualIcon icon={elevatedIcon} decorative />
                </ContextualIconFrame>
              ) : Icon ? (
                <div
                  className={cn(
                    'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-110',
                    compact ? 'mb-0' : 'mb-5 xl:mb-8',
                    accent,
                  )}
                >
                  <Icon className="h-5 w-5 text-white" aria-hidden />
                </div>
              ) : null}

              <h3
                className={cn(
                  'font-display text-xl font-semibold text-white transition-colors group-hover:text-brand-primary',
                  compact && 'text-center',
                  !compact && 'mb-3 xl:mb-4 xl:text-2xl xl:font-bold',
                )}
              >
                {title}
              </h3>
            </div>

            <p
              className={cn(
                'text-base leading-relaxed text-gray-300 transition-colors group-hover:text-white',
                compact && 'w-full text-left',
                !compact && 'lg:text-[1.05rem] lg:leading-[1.7] xl:text-lg',
              )}
            >
              {description}
            </p>

            {interactive && showCta ? (
              <span
                className={cn(
                  'flex items-center gap-2',
                  compact ? 'mt-5 justify-center' : 'mt-auto',
                  'translate-y-4 opacity-0',
                  'transition-[opacity,transform] duration-[620ms] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:delay-0',
                  'group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100',
                  'motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:opacity-100',
                  '[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100',
                )}
                style={{ transitionTimingFunction: CTA_EASE }}
              >
                <span className="ensemble-logo-gradient-text text-sm font-bold tracking-[0.04em] lg:text-base">
                  {linkLabel}
                </span>
                <svg
                  className={cn(
                    'ensemble-logo-gradient-cta-icon h-4 w-4 shrink-0 lg:h-[1.125rem] lg:w-[1.125rem]',
                    '-translate-x-1.5 opacity-0',
                    'transition-[transform,opacity,color] duration-[620ms] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:delay-0',
                    'group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150',
                    'motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:opacity-100',
                    '[@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100',
                  )}
                  style={{ transitionTimingFunction: CTA_EASE }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            ) : null}
          </div>

          {image ? (
            <div className="absolute inset-0 z-0 opacity-[0.08] transition-opacity duration-1000 group-hover:opacity-[0.22]">
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: imagePosition }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
        </div>
      </div>
  )

  if (interactive && to) {
    return (
      <Link to={to} className={shellClass}>
        {cardInner}
      </Link>
    )
  }

  return (
    <div className={shellClass} aria-label={title}>
      {cardInner}
    </div>
  )
}
