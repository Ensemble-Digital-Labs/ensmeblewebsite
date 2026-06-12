import { Link } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { parallaxShowcaseContent } from '../../../lib/content'
import { HOME_WHY_ENSEMBLE } from '../../../lib/homePageCopy'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel } from '../HomeDeckPrimitives'

const COMPARE_ROWS = [
  {
    label: 'Owns marketing + product + IT',
    agency: false,
    vendor: false,
    ensemble: true,
  },
  {
    label: 'Accountable for patient demand',
    agency: 'partial',
    vendor: false,
    ensemble: true,
  },
  {
    label: 'HIPAA-aware delivery',
    agency: 'partial',
    vendor: true,
    ensemble: true,
  },
  {
    label: 'Single roadmap & reporting',
    agency: false,
    vendor: false,
    ensemble: true,
  },
]

function CompareCell({ value }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-emerald-400" strokeWidth={2.5} aria-hidden />
  }
  if (value === 'partial') {
    return <span className="text-xs font-semibold text-amber-300/90">Partial</span>
  }
  return <X className="mx-auto h-5 w-5 text-white/25" strokeWidth={2} aria-hidden />
}

export default function HomeChapterWho({ df }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-who"
      ariaLabel="Why Ensemble"
      bleed
      viewportBand
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        eyebrow="Why us"
        title={`${parallaxShowcaseContent.headlineLine1} ${parallaxShowcaseContent.headlineLine2}`}
        lead={parallaxShowcaseContent.lead}
      />

      <div data-home-reveal className="mt-8 overflow-hidden rounded-2xl border border-white/12 md:mt-10 md:rounded-3xl">
        <div className="grid grid-cols-4 bg-white/[0.06] text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-xs">
          <div className="col-span-1 p-3 sm:p-4" />
          <div className="p-3 text-center sm:p-4">Agency</div>
          <div className="p-3 text-center sm:p-4">IT vendor</div>
          <div className="bg-cyan-500/15 p-3 text-center text-cyan-100/90 sm:p-4">Ensemble</div>
        </div>
        {COMPARE_ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-4 border-t border-white/[0.08] text-sm text-white/80"
          >
            <div className="col-span-1 flex items-center p-3 text-xs leading-snug text-white/70 sm:p-4 sm:text-sm">
              {row.label}
            </div>
            <div className="flex items-center justify-center border-l border-white/[0.06] p-3 sm:p-4">
              <CompareCell value={row.agency} />
            </div>
            <div className="flex items-center justify-center border-l border-white/[0.06] p-3 sm:p-4">
              <CompareCell value={row.vendor} />
            </div>
            <div
              className={cn(
                'flex items-center justify-center border-l border-cyan-400/20 bg-cyan-500/[0.08] p-3 sm:p-4',
              )}
            >
              <CompareCell value={row.ensemble} />
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_WHY_ENSEMBLE.map((item) => (
          <li key={item.title} data-home-reveal>
            <DeckPanel className="h-full p-4">
              <h3 className="font-display text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.line}</p>
            </DeckPanel>
          </li>
        ))}
      </ul>

      <Link
        data-home-reveal
        to="/contact"
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white"
      >
        Start the conversation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </HomeDeckSectionShell>
  )
}
