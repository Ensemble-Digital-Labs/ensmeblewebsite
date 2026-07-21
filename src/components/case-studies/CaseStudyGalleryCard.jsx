import { forwardRef } from 'react'
import NavPixelLink from '../NavPixelLink'
import { cn } from '../../lib/utils'

/** Short display word for large in-card typography (DNA Capital “Clover” style). */
export function getCaseStudyDisplayName(client = '') {
  const parts = client.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2 && parts[0].length >= 3) return parts[0]
  return client
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

const CaseStudyGalleryCard = forwardRef(function CaseStudyGalleryCard({ study, className }, ref) {
  const detailPath = `/case-studies/${study.slug}`
  const displayName = getCaseStudyDisplayName(study.client)

  return (
    <article ref={ref} className={cn('case-studies-gallery-card', className)}>
      <NavPixelLink to={detailPath} className="case-studies-gallery-card__link" aria-label={`${study.client} case study`}>
        <div className="case-studies-gallery-card__title-wrap">
          <span className="case-studies-gallery-card__title-line" aria-hidden />
          <span className="case-studies-gallery-card__title">{study.client.toUpperCase()}</span>
        </div>

        <div className="case-studies-gallery-card__background" aria-hidden />

        <img
          src={study.logo || study.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="case-studies-gallery-card__logo"
        />
        <span className="case-studies-gallery-card__wordmark">{displayName}</span>

        <div className="case-studies-gallery-card__learn-more">
          <span className="case-studies-gallery-card__learn-label">Learn more</span>
          <LearnMoreArrow />
        </div>
      </NavPixelLink>
    </article>
  )
})

export default CaseStudyGalleryCard
