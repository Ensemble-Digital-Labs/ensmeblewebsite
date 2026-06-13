import { Link } from 'react-router-dom'

import { ArrowRight } from 'lucide-react'

import { caseStudies } from '../../../lib/content'

import { HOME_INFLUX_WORK } from '../../../lib/homeInfluxContent'

import { HOME_WORK_IMAGES } from '../../../lib/homeImagery'

import { HomePhoto } from '../influx/HomePhoto'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomeChapterMonogram from '../HomeChapterMonogram'

import { InfluxLead, InfluxSectionTitle, InfluxTextLink } from '../influx/HomeInfluxPrimitives'

export default function HomeChapterWork({ df, stacked = false, fillViewport = false }) {
  const featured = caseStudies[0]
  const stripItems = caseStudies.slice(1, 5)

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-work"
      ariaLabel="Selected work"
      bleed
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />

      <div className="relative">
        <HomeChapterMonogram title={HOME_INFLUX_WORK.title} />

        <div className="relative z-[1]" data-home-mask-group>
          <div className="max-w-3xl">
            <InfluxSectionTitle>{HOME_INFLUX_WORK.title}</InfluxSectionTitle>
          </div>

          <InfluxLead className="mt-5 max-w-2xl">{HOME_INFLUX_WORK.body}</InfluxLead>
        </div>
      </div>

      {featured ? (
        <div data-home-reveal className="relative z-[1] mt-10">
          <Link
            to={`/case-studies/${featured.slug}`}
            className="home-influx-browser group relative block overflow-hidden rounded-2xl border border-white/15 no-underline md:rounded-3xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 truncate text-[10px] font-medium text-white/40">{HOME_INFLUX_WORK.scrollHint}</span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <HomePhoto
                src={HOME_WORK_IMAGES.featured}
                alt={`${featured.client} website preview`}
                objectPosition="50% 12%"
                sizes="(max-width: 1024px) 100vw, 900px"
                className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="border-t border-white/10 bg-gradient-to-t from-[#0a0f1c] to-transparent p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">{featured.client}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70 md:text-base">{featured.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-200">
                View case study <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      ) : null}

      {stripItems.length ? (
        <div className="relative z-[1] mt-6 md:mt-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 sm:mb-4">More work</p>
          <ul className="home-work-strip -mx-1 flex gap-4 overflow-x-auto px-1 pb-2 md:gap-5">
            {stripItems.map((cs, i) => (
              <li key={cs.slug} className="home-work-strip__item w-[min(82vw,320px)] shrink-0 sm:w-[280px]" data-home-reveal>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="home-influx-card flex h-full flex-col overflow-hidden rounded-[15px] border border-white/12 bg-white/[0.05] no-underline transition-colors hover:border-white/25"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10">
                    <HomePhoto
                      src={HOME_WORK_IMAGES.secondary[i] ?? cs.image}
                      alt=""
                      objectPosition="50% 12%"
                      sizes="320px"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-bold text-white">{cs.client}</h4>
                    <p className="mt-1 line-clamp-2 text-xs text-white/60">{cs.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div data-home-reveal className="relative z-[1] mt-8">
        <InfluxTextLink to="/case-studies">View all case studies</InfluxTextLink>
      </div>
    </HomeDeckSectionShell>
  )
}
