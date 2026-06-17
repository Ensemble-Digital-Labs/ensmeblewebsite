import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

/** DNA Capital companies grid card — logo, name, learn more. */
export default function CaseStudyPortfolioCard({ study, className }) {
  const detailPath = `/case-studies/${study.slug}`

  return (
    <li className={cn('case-studies-portfolio-card', className)}>
      <Link to={detailPath} className="case-studies-portfolio-card__link">
        <div className="case-studies-portfolio-card__logo-wrap">
          <img
            src={study.logo || study.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="case-studies-portfolio-card__logo"
          />
        </div>
        <p className="case-studies-portfolio-card__name">{study.client}</p>
        <span className="case-studies-portfolio-card__cta">Learn more</span>
      </Link>
    </li>
  )
}
