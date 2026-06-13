import { HOME_INFLUX_PROCESS } from '../../../lib/homeInfluxContent'

import { homeRoadmapContent } from '../../../lib/content'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import { InfluxCard, InfluxSectionTitle } from '../influx/HomeInfluxPrimitives'



export default function HomeChapterProcess({ df, stacked = false, fillViewport = false }) {

  return (

    <HomeDeckSectionShell

      deckFrame={df && !stacked}

      deckInnerOverflowVisible={df && !stacked}

      stacked={stacked}

      viewportBand={fillViewport}

      id="home-process"

      ariaLabel="How we work"

      className="py-10 md:py-16"

    >

      <DeckMeshBackdrop />

      <div data-home-reveal className="max-w-2xl">

        <InfluxSectionTitle>{homeRoadmapContent.headline}</InfluxSectionTitle>

      </div>



      <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {HOME_INFLUX_PROCESS.map((phase) => (

          <li key={phase.step}>

            <InfluxCard className="h-full !p-5 sm:!p-6">

              <span className="font-display text-3xl font-extrabold text-white/15">{phase.step}</span>

              <h3 className="mt-3 font-display text-lg font-bold capitalize text-white">{phase.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-white/68">{phase.line}</p>

            </InfluxCard>

          </li>

        ))}

      </ol>

    </HomeDeckSectionShell>

  )

}


