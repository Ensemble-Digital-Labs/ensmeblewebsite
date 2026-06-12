import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { growthPrimaryBase } from '../../lib/growthCtaClasses'

/**
 * GSH Trust–style project card: image overlaps a cream content panel,
 * category tag on photo, primary CTA + text link.
 */
export default function CaseStudyImpactCard({ study, className }) {
  const detailPath = `/case-studies/${study.slug}`

  return (
    <article
      className={cn(
        'group relative min-h-0 pb-6 sm:min-h-[380px] sm:pb-10',
        className,
      )}
    >
      <div className="relative grid w-full">
        <Link
          to={detailPath}
          className="relative z-[1] block w-fit max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`${study.title} — view case study`}
        >
          <div className="relative overflow-hidden">
            <img
              src={study.image}
              alt=""
              loading="lazy"
              className={cn(
                'h-[220px] w-[220px] max-w-[72vw] object-cover object-center',
                'grayscale-[35%] transition-all duration-500 ease-out',
                'sm:h-[260px] sm:w-[260px] md:h-[280px] md:w-[280px]',
                'group-hover:grayscale-0 group-hover:rounded-t-[7rem] md:group-hover:rounded-t-[8.5rem]',
              )}
            />
          </div>
          <span
            className={cn(
              'absolute left-4 top-[34%] z-[1] min-w-[7.5rem]',
              'bg-[#050816] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white',
              'sm:left-5 sm:text-[11px]',
            )}
          >
            {study.category}
          </span>
        </Link>

        <div
          className={cn(
            'relative z-0 -mt-6 ml-3 max-w-full',
            'bg-[#f7f6f0] px-5 pb-6 pt-10',
            'transition-shadow duration-300 ease-out',
            'sm:-mt-8 sm:ml-5 sm:px-6 sm:pb-7 sm:pt-12',
            'md:-mt-9 md:ml-14 md:pl-48 md:pr-8',
            'group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.18)]',
          )}
        >
          <Link
            to={detailPath}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <h3
              className={cn(
                'font-display text-xl font-extrabold leading-tight text-[#2b2b2b]',
                'line-clamp-2 min-h-[2.75rem] sm:text-2xl sm:leading-[1.2] sm:min-h-[3.75rem]',
              )}
            >
              {study.title}
            </h3>
          </Link>

          <p
            className={cn(
              'mt-4 max-w-[16rem] text-sm leading-relaxed text-[#2b2b2b]/90',
              'line-clamp-3 min-h-[4.5rem] sm:max-w-[14rem] sm:text-[0.9375rem]',
            )}
          >
            {study.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4">
            <Link
              to="/free-practice-audit"
              className={cn(
                growthPrimaryBase,
                'min-h-[44px] min-w-[6.5rem] px-5 py-2.5 text-xs uppercase tracking-[0.06em]',
                'group-hover:opacity-100',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              Free audit
            </Link>
            <Link
              to={detailPath}
              className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2b2b2b]',
                'underline decoration-[#2b2b2b]/50 underline-offset-4',
                'transition-colors hover:text-brand-primary hover:decoration-brand-primary',
              )}
            >
              Read case study
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
