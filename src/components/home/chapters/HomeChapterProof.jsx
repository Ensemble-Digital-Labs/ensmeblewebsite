import { HOME_INFLUX_PARTNER, HOME_PROOF_STATS } from '../../../lib/homeInfluxContent'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomeChapterMonogram from '../HomeChapterMonogram'
import HomeProofRingStat from '../HomeProofRingStat'

export default function HomeChapterProof({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-proof"
      ariaLabel="Practice outcomes"
      className="home-proof-chapter py-10 md:py-12 lg:py-0"
    >
      <DeckMeshBackdrop />

      <div className="home-proof-split">
        <div className="home-proof-copy">
          <HomeChapterMonogram
            title={HOME_INFLUX_PARTNER.title}
            className="home-proof-copy__monogram home-popart-section__monogram"
            delay={0}
          />
          <div className="home-proof-copy__inner" data-home-reveal>
            <h2 className="home-proof-copy__title">{HOME_INFLUX_PARTNER.title}</h2>
          </div>
        </div>

        <ul className="home-proof-stat-list home-proof-stat-canvas" aria-label="Practice outcome metrics">
          {HOME_PROOF_STATS.map((stat, i) => (
            <HomeProofRingStat
              key={stat.label}
              value={stat.value}
              label={stat.displayLabel}
              scriptLabel={stat.scriptLabel}
              staggerIndex={i}
            />
          ))}
        </ul>
      </div>
    </HomeDeckSectionShell>
  )
}
