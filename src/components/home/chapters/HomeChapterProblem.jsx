import { Link } from 'react-router-dom'
import { homeProblemContent } from '../../../lib/content'
import { growthPrimaryHero, growthHeroCtaArrow } from '../../../lib/growthCtaClasses'
import { cn } from '../../../lib/utils'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel } from '../HomeDeckPrimitives'

const PAIN_ACCENTS = [
  'border-l-rose-400/90',
  'border-l-amber-400/85',
  'border-l-orange-400/85',
  'border-l-fuchsia-400/80',
]

export default function HomeChapterProblem({ df }) {
  const problemPains = homeProblemContent.pains.slice(0, 4)

  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-problem"
      ariaLabel="Practice growth gaps"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        eyebrow={homeProblemContent.eyebrow}
        title={`${homeProblemContent.headlineLine1} ${homeProblemContent.headlineLine2}`}
        lead={homeProblemContent.lead}
      />

      <ul className="mt-8 space-y-3 md:mt-10">
        {problemPains.map((pain, i) => (
          <li key={pain.title} data-home-reveal>
            <DeckPanel
              className={cn(
                'flex gap-4 border-l-[3px] p-5 sm:gap-6 sm:p-6',
                PAIN_ACCENTS[i],
              )}
            >
              <span className="font-display text-3xl font-extrabold leading-none text-white/15 sm:text-4xl" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-bold text-white">{pain.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/68">{pain.text}</p>
              </div>
            </DeckPanel>
          </li>
        ))}
      </ul>

      <div data-home-reveal className="mt-8 md:mt-10">
        <Link to="/free-practice-audit" className={cn(growthPrimaryHero, 'no-underline')}>
          <span>See how we fix this</span>
          <span className={growthHeroCtaArrow} aria-hidden>→</span>
        </Link>
      </div>
    </HomeDeckSectionShell>
  )
}
