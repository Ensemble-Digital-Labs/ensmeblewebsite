import { Link } from 'react-router-dom'
import { HomePhoto } from './influx/HomePhoto'
import { cn } from '../../lib/utils'

/** Asymmetric masonry — reference-style portfolio grid (5 tiles). */
const MASONRY_TILE_COUNT = 5

/** AIPSTL framing tweak — desktop/laptop only (see index.css). */
const AIPSTL_SLUG = 'aipstl-member-acquisition-strategy'
const STL_IOIR_SLUG = 'stl-ioir-clinics-interventional-oncology'

/** Large left tile — case study link disabled on laptop until pages are ready. */
const LAPTOP_STATIC_TILE_INDEX = 0

/** AIPSTL leads in the large left masonry block; STL IOIR takes the former AIPSTL slot. */
function orderMasonryTiles(studies) {
  const picked = studies.slice(0, MASONRY_TILE_COUNT)
  const aipstl = picked.find((study) => study.slug === AIPSTL_SLUG)
  const stlIoir = picked.find((study) => study.slug === STL_IOIR_SLUG)

  if (!aipstl || !stlIoir) return picked

  const middle = picked.filter(
    (study) => study.slug !== AIPSTL_SLUG && study.slug !== STL_IOIR_SLUG,
  )

  return [aipstl, ...middle, stlIoir]
}

function MasonryTileSurface({ study, aipstlTile, stlIoirTile }) {
  return (
    <div className="home-work-masonry__frame">
      <div className="home-work-masonry__media">
        <HomePhoto
          src={study.image}
          alt={`${study.client} case study preview`}
          objectPosition="center"
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 32vw"
          className={`home-work-masonry__photo object-contain${aipstlTile ? ' home-work-masonry__photo--aipstl' : ''}${stlIoirTile ? ' home-work-masonry__photo--stl-ioir' : ' lg:object-cover lg:group-hover:scale-[1.02]'} transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100`}
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
  )
}

/**
 * @param {{ studies: Array<{ slug: string, client: string, excerpt: string, image: string }> }} props
 */
export default function HomeWorkMasonryGrid({ studies }) {
  const tiles = orderMasonryTiles(studies)

  if (!tiles.length) return null

  return (
    <ul className="home-work-masonry relative z-[1] list-none p-0">
      {tiles.map((study, index) => {
        const aipstlTile = study.slug === AIPSTL_SLUG
        const stlIoirTile = study.slug === STL_IOIR_SLUG
        const detailPath = `/case-studies/${study.slug}`
        const isLaptopStaticTile = index === LAPTOP_STATIC_TILE_INDEX
        const linkClass = 'home-work-masonry__link group block h-full no-underline'

        return (
        <li
          key={study.slug}
          className={`home-work-masonry__tile home-work-masonry__tile--${index}${aipstlTile ? ' home-work-masonry__tile--aipstl' : ''}${stlIoirTile ? ' home-work-masonry__tile--stl-ioir' : ''}${isLaptopStaticTile ? ' home-work-masonry__tile--laptop-static' : ''}`}
          data-home-reveal
        >
          {isLaptopStaticTile ? (
            <>
              <Link to={detailPath} className={cn(linkClass, 'lg:hidden')}>
                <MasonryTileSurface
                  study={study}
                  aipstlTile={aipstlTile}
                  stlIoirTile={stlIoirTile}
                />
              </Link>
              <div
                className={cn(linkClass, 'home-work-masonry__link--static hidden lg:block')}
                aria-label={`${study.client} case study preview`}
              >
                <MasonryTileSurface
                  study={study}
                  aipstlTile={aipstlTile}
                  stlIoirTile={stlIoirTile}
                />
              </div>
            </>
          ) : (
            <Link to={detailPath} className={linkClass}>
              <MasonryTileSurface
                study={study}
                aipstlTile={aipstlTile}
                stlIoirTile={stlIoirTile}
              />
            </Link>
          )}
        </li>
        )
      })}
    </ul>
  )
}
