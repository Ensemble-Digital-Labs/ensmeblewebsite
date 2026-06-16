import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { homeRoadmapContent } from '../../../lib/content'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel, DeckStepBadge } from '../HomeDeckPrimitives'

export default function HomeChapterRoadmap({ df }) {
  const roadmapPhases = homeRoadmapContent.phases.map((phase) => ({
    ...phase,
    itemsShort: phase.items.slice(0, 3),
  }))

  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-roadmap"
      ariaLabel="Ninety day roadmap"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        eyebrow={homeRoadmapContent.eyebrow}
        title={homeRoadmapContent.headline}
        lead={homeRoadmapContent.lead}
      />

      <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-stretch md:gap-3">
        {roadmapPhases.map((phase, i) => (
          <div key={phase.title} className="flex min-w-0 flex-1 flex-col md:flex-row md:items-stretch">
            <DeckPanel dataHomeReveal className="flex flex-1 flex-col p-6 md:p-7">
              <div className="flex items-center gap-3">
                <DeckStepBadge step={i + 1} />
                <h3 className="font-display text-base font-bold text-white md:text-lg">{phase.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                {phase.itemsShort.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/72 md:text-base">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </DeckPanel>
            {i < roadmapPhases.length - 1 ? (
              <div
                className="hidden shrink-0 items-center px-1 text-cyan-400/40 md:flex"
                aria-hidden
              >
                <ArrowRight className="h-5 w-5" />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <p data-home-reveal className="mt-8 text-center text-sm leading-relaxed text-white/55 md:mt-10 md:text-base">
        Longer engagements build the 12-month engine, {' '}
        <Link to="/about" className="font-semibold text-cyan-200 hover:text-white hover:underline">
          how we work
        </Link>
      </p>
    </HomeDeckSectionShell>
  )
}
