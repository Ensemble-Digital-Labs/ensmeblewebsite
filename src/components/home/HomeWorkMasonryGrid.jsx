import { Link } from 'react-router-dom'
import { HomePhoto } from './influx/HomePhoto'

/** Asymmetric masonry — reference-style portfolio grid (5 tiles). */
const MASONRY_TILE_COUNT = 5

/**
 * @param {{ studies: Array<{ slug: string, client: string, excerpt: string, image: string }> }} props
 */
export default function HomeWorkMasonryGrid({ studies }) {
  const tiles = studies.slice(0, MASONRY_TILE_COUNT)

  if (!tiles.length) return null

  return (
    <ul className="home-work-masonry relative z-[1] list-none p-0">
      {tiles.map((study, index) => (
        <li
          key={study.slug}
          className={`home-work-masonry__tile home-work-masonry__tile--${index}`}
          data-home-reveal
        >
          <Link
            to={`/case-studies/${study.slug}`}
            className="home-work-masonry__link group block h-full no-underline"
          >
            <div className="home-work-masonry__frame">
              <div className="home-work-masonry__media">
                <HomePhoto
                  src={study.image}
                  alt={`${study.client} case study preview`}
                  objectPosition="50% 50%"
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 32vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                />
                <div className="home-work-masonry__overlay" aria-hidden />
                <div className="home-work-masonry__caption">
                  <span className="home-work-masonry__client">{study.client}</span>
                  <span className="home-work-masonry__cta">
                    <span className="ensemble-logo-gradient-text home-work-masonry__cta-label">
                      Explore this
                    </span>
                    <svg
                      className="ensemble-logo-gradient-cta-icon home-work-masonry__cta-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
