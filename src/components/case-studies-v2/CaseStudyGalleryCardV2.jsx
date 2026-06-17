import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { getCaseStudyCardTheme } from '../../lib/caseStudyCardThemes'

/** Short display word for large in-card typography (DNA Capital “Clover” style). */
export function getCaseStudyDisplayName(client = '') {
  const parts = client.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2 && parts[0].length >= 3) return parts[0]
  return client
}

/** Compact mark for inactive carousel slides (DNA side-card logo substitute). */
export function getCaseStudyMonogram(client = '') {
  const parts = client.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
  }
  return client.slice(0, 2).toUpperCase()
}

function LearnMoreArrow() {
  return (
    <svg viewBox="0 0 15.87 8.37" className="case-studies-gallery-card__arrow" aria-hidden>
      <line x1="0.5" y1="4.17" x2="15.24" y2="4.17" />
      <line x1="15.37" y1="4.18" x2="11.44" y2="0.5" />
      <line x1="11.44" y1="7.87" x2="15.37" y2="4.18" />
    </svg>
  )
}

const CaseStudyGalleryCardV2 = forwardRef(function CaseStudyGalleryCardV2({ study, className }, ref) {
  const detailPath = `/case-studies/${study.slug}`
  const monogram = getCaseStudyMonogram(study.client)
  const cardImage = study.logo || study.image
  const hasLogo = Boolean(cardImage)
  const cardTheme = getCaseStudyCardTheme(study.slug)

  return (
    <article
      ref={ref}
      className={cn(
        'case-studies-gallery-card case-studies-gallery-card--v2',
        hasLogo && 'case-studies-gallery-card--has-logo',
        className,
      )}
      style={{
        '--csp-card-accent': cardTheme.accent,
        '--csp-card-bg-from': cardTheme.bgFrom,
        '--csp-card-bg-to': cardTheme.bgTo,
      }}
    >
      <Link to={detailPath} className="case-studies-gallery-card__link" aria-label={`${study.client} case study`}>
        <div className="case-studies-gallery-card__title-wrap">
          <span className="case-studies-gallery-card__title-line" aria-hidden />
          <span className="case-studies-gallery-card__title">{study.client.toUpperCase()}</span>
        </div>

        <div className="case-studies-gallery-card__panel">
          <div className="case-studies-gallery-card__background" aria-hidden />

          {hasLogo ? (
            <div className="case-studies-gallery-card__logo-wrap" aria-hidden>
              <img
                src={cardImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="case-studies-gallery-card__logo"
              />
            </div>
          ) : (
            <span className="case-studies-gallery-card__monogram" aria-hidden>
              {monogram}
            </span>
          )}
        </div>

        <div className="case-studies-gallery-card__learn-more">
          <span className="case-studies-gallery-card__learn-label">Learn more</span>
          <LearnMoreArrow />
        </div>
      </Link>
    </article>
  )
})

export default CaseStudyGalleryCardV2
