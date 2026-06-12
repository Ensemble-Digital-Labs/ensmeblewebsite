import { Sparkles, ShieldCheck, CircleDot } from 'lucide-react'
import { heroPracticeOutcomeFeatures } from '../../../lib/content'
import { HOME_SECTION_LEADS } from '../../../lib/homePageCopy'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel, DeckStepBadge } from '../HomeDeckPrimitives'

const FEATURE_ICONS = { Sparkles, ShieldCheck, CircleDot }

export default function HomeChapterPillars({ df }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-pillars"
      ariaLabel="How we grow"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        eyebrow="How we grow"
        title="A three-step engine for practice growth"
        lead={HOME_SECTION_LEADS.pillars}
      />

      <ol className="relative mt-10 space-y-0 md:mt-12">
        <div
          className="absolute bottom-4 left-[1.125rem] top-4 hidden w-px bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent md:block"
          aria-hidden
        />
        {heroPracticeOutcomeFeatures.map((feature, i) => {
          const Icon = FEATURE_ICONS[feature.iconKey] ?? Sparkles
          return (
            <li key={feature.id} className="relative md:pl-14">
              <div className="absolute left-0 top-6 hidden md:block">
                <DeckStepBadge step={String(i + 1).padStart(2, '0')} />
              </div>
              <DeckPanel dataHomeReveal className="mb-4 p-6 md:mb-6 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-200 md:hidden">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                      Phase {i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">{feature.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/72">{feature.description}</p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-cyan-200/90 sm:flex">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                </div>
              </DeckPanel>
            </li>
          )
        })}
      </ol>
    </HomeDeckSectionShell>
  )
}
