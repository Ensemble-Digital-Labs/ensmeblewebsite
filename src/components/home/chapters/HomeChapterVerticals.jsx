import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { services } from '../../../data/services'
import { HOME_SECTION_LEADS } from '../../../lib/homePageCopy'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel } from '../HomeDeckPrimitives'

const VERTICAL_PATHS = [
  '/services/software-product',
  '/services/it-infrastructure',
  '/services/websites-local-seo',
  '/services/performance-marketing',
  '/services/creative-production',
]

export default function HomeChapterVerticals({ df }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-verticals"
      ariaLabel="Services"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <HomeSectionHeader
          eyebrow="Services"
          title="Five verticals. One growth partner."
          lead={HOME_SECTION_LEADS.verticals}
          className="max-w-lg"
        />
        <Link
          data-home-reveal
          to="/services"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-500/20 sm:self-auto"
        >
          All services
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <ul className="mt-8 flex flex-col gap-3 md:mt-10">
        {services.map((v, idx) => (
          <li key={v.id} data-home-reveal>
            <Link
              to={VERTICAL_PATHS[idx] ?? '/services'}
              className="group block no-underline"
            >
              <DeckPanel
                className={cn(
                  'flex flex-col gap-4 p-5 transition-[transform,border-color] duration-300 sm:flex-row sm:items-center sm:gap-6 sm:p-6',
                  'hover:-translate-y-0.5 hover:border-cyan-400/30 motion-reduce:hover:translate-y-0',
                )}
              >
                <div className="flex items-center gap-4 sm:w-[min(100%,280px)] sm:shrink-0">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-white/[0.06] text-2xl"
                    aria-hidden
                  >
                    {v.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
                      {v.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white sm:text-xl">{v.title}</h3>
                  </div>
                </div>
                <div className="min-w-0 flex-1 border-t border-white/[0.08] pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
                  {v.outcomeLine ? (
                    <p className="text-sm font-semibold text-cyan-100/90">{v.outcomeLine}</p>
                  ) : null}
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65 sm:text-base">
                    {v.description}
                  </p>
                </div>
                <span
                  className="hidden font-display text-5xl font-extrabold text-white/[0.06] sm:block"
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-cyan-300/80 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-60" aria-hidden />
              </DeckPanel>
            </Link>
          </li>
        ))}
      </ul>
    </HomeDeckSectionShell>
  )
}
