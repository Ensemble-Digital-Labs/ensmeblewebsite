import { HOME_INFLUX_PARTNER, HOME_PROOF_STATS } from '../../../lib/homeInfluxContent'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomeChapterMonogram from '../HomeChapterMonogram'

import HomeMaskReveal from '../HomeMaskReveal'

export default function HomeChapterProof({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-proof"
      ariaLabel="Practice outcomes"
      className="py-8 md:py-12"
    >
      <DeckMeshBackdrop />

      <div
        data-home-reveal
        className="home-influx-light-band relative flex flex-col items-center overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10"
      >
        <HomeChapterMonogram letter="P" className="left-1/2 top-2 -translate-x-1/2 md:left-auto md:translate-x-0" />

        <div className="relative z-[1]" data-home-mask-group>
          <HomeMaskReveal as="p" className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {HOME_INFLUX_PARTNER.line}
          </HomeMaskReveal>
        </div>

        <ul
          data-home-count-group
          className="relative z-[1] mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {HOME_PROOF_STATS.map((stat, i) => (
            <li
              key={stat.label}
              data-home-reveal
              className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="font-display text-3xl font-extrabold tracking-tight text-cyan-200 sm:text-4xl">
                <span data-home-count-up={stat.value}>{stat.value}</span>
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 sm:text-[11px]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </HomeDeckSectionShell>
  )
}
