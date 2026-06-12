import { HOME_INFLUX_TESTIMONIALS, HOME_INFLUX_TESTIMONIALS_INTRO } from '../../../lib/homeInfluxContent'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import { InfluxDisplayTitle, InfluxEyebrow, InfluxLead } from '../influx/HomeInfluxPrimitives'

import HomeInfluxTestimonials from '../influx/HomeInfluxTestimonials'



export default function HomeChapterTestimonials({ df, stacked = false, fillViewport = false }) {

  return (

    <HomeDeckSectionShell

      deckFrame={df && !stacked}

      deckInnerOverflowVisible={df && !stacked}

      stacked={stacked}

      viewportBand={fillViewport}

      id="home-testimonials"

      ariaLabel="Client testimonials"

      className="py-10 md:py-16"

    >

      <DeckMeshBackdrop />

      <div className="text-center">

        <InfluxEyebrow>{HOME_INFLUX_TESTIMONIALS_INTRO.eyebrow}</InfluxEyebrow>

        <div data-home-reveal className="mx-auto mt-4 max-w-3xl">

          <InfluxDisplayTitle

            lines={HOME_INFLUX_TESTIMONIALS_INTRO.lines}

            accentIndex={HOME_INFLUX_TESTIMONIALS_INTRO.accentIndex}

          />

        </div>

        <InfluxLead className="mx-auto mt-5 max-w-2xl">{HOME_INFLUX_TESTIMONIALS_INTRO.lead}</InfluxLead>

      </div>

      <div className="mt-10 md:mt-12">

        <HomeInfluxTestimonials items={HOME_INFLUX_TESTIMONIALS} />

      </div>

    </HomeDeckSectionShell>

  )

}

