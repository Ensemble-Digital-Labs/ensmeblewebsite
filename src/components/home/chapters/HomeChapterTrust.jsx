import { heroContent } from '../../../lib/content'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import HomeSectionHeader from '../HomeSectionHeader'
import { DeckMeshBackdrop, DeckPanel } from '../HomeDeckPrimitives'

export default function HomeChapterTrust({ df }) {
  const stats = heroContent.stats
  const [featured...rest] = stats

  return (
    <HomeDeckSectionShell
      deckFrame={df}
      deckInnerOverflowVisible={df}
      id="home-trust"
      ariaLabel="Trust"
      viewportBand
      className="py-8 md:py-12"
    >
      <DeckMeshBackdrop />
      <HomeSectionHeader
        title="Numbers your leadership team can act on"
        lead="Credibility, velocity, and measurable growth, not vanity dashboards."
        className="mx-auto text-center md:max-w-2xl"
        titleClassName="md:text-center"
        leadClassName="mx-auto md:text-center"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {featured ? (
          <DeckPanel
            accent
            dataHomeReveal
            className="flex flex-col justify-center p-8 sm:col-span-2 sm:min-h-[220px] lg:col-span-5 lg:row-span-2 lg:min-h-[280px] lg:p-10"
          >
            <p className="font-display text-[clamp(3rem,calc(1rem+8vw),4.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white">
              {featured.value}
            </p>
            <p className="mt-3 max-w-[14rem] text-xs font-bold uppercase tracking-[0.2em] text-white/55">
              {featured.label}
            </p>
          </DeckPanel>
        ) : null}

        {rest.map((s) => (
          <DeckPanel
            key={s.label}
            dataHomeReveal
            className="flex flex-col justify-center p-6 sm:min-h-[140px] lg:col-span-3 lg:min-h-[130px]"
          >
            <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-[2.75rem]">
              {s.value}
            </p>
            <p className="mt-2 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white/50">{s.label}</p>
          </DeckPanel>
        ))}

      </div>
    </HomeDeckSectionShell>
  )
}
