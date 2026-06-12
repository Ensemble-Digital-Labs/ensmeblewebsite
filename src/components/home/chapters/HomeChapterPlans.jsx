import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { growthSecondaryHero } from '../../../lib/growthCtaClasses'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel } from '../HomeDeckPrimitives'

const PLAN_CARDS = [
  {
    tier: '01',
    title: 'Local Foundation',
    line: 'GBP, local SEO, citations, and review velocity — credibility first.',
    to: '/plans/local-foundation',
  },
  {
    tier: '02',
    title: 'Growth Engine',
    line: 'Paid + organic demand with bi-weekly reporting and governed creative tests.',
    to: '/plans/growth-engine',
    popular: true,
  },
  {
    tier: '03',
    title: 'Market Leader',
    line: 'Automation, predictive targeting, and full-market orchestration where ROI fits.',
    to: '/plans/market-leader',
  },
]

export default function HomeChapterPlans({ df }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-plans"
      ariaLabel="Plans"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        eyebrow="Plans"
        title="Pick a ladder, not a laundry list"
        lead="Start where your market is — then scale demand with a partner who owns the full stack."
        className="mx-auto text-center md:max-w-2xl"
        titleClassName="md:text-center"
        leadClassName="mx-auto md:text-center"
      />

      <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
        {PLAN_CARDS.map((plan) => (
          <li key={plan.to} data-home-reveal className="flex">
            <Link to={plan.to} className="group flex w-full no-underline">
              <DeckPanel
                accent={plan.popular}
                className={cn(
                  'flex w-full flex-col p-6 transition-transform duration-300 md:p-7',
                  plan.popular && 'md:-translate-y-2 md:shadow-[0_32px_80px_-36px_rgba(34,211,238,0.35)] motion-reduce:md:translate-y-0',
                )}
              >
                {plan.popular ? (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : (
                  <span className="mb-4 font-display text-sm font-bold text-white/35">{plan.tier}</span>
                )}
                <h3 className="font-display text-xl font-bold text-white">{plan.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/72 md:text-base">{plan.line}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-200 group-hover:text-white">
                  View plan
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </DeckPanel>
            </Link>
          </li>
        ))}
      </ul>

      <div data-home-reveal className="mt-8 flex justify-center md:mt-10">
        <Link to="/plans" className={cn(growthSecondaryHero, 'no-underline')}>
          Compare all plans
        </Link>
      </div>
    </HomeDeckSectionShell>
  )
}
