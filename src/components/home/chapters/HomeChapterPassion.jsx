import { HOME_INFLUX_PASSION } from '../../../lib/homeInfluxContent'

import { HOME_PASSION_IMAGE } from '../../../lib/homeImagery'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import { InfluxEyebrow, InfluxPrimaryButton } from '../influx/HomeInfluxPrimitives'

import { HomePhotoCover } from '../influx/HomePhoto'



export default function HomeChapterPassion({ df, stacked = false, fillViewport = false }) {

  return (

    <HomeDeckSectionShell

      deckFrame={df && !stacked}

      deckInnerOverflowVisible={df && !stacked}

      stacked={stacked}

      viewportBand={fillViewport}

      id="home-passion"

      ariaLabel="Our mission"

      bleed

      className="py-10 md:py-16"

    >

      <DeckMeshBackdrop />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

        <div data-home-reveal>

          <HomePhotoCover

            src={HOME_PASSION_IMAGE.src}

            alt={HOME_PASSION_IMAGE.alt}

            objectPosition={HOME_PASSION_IMAGE.position}

            overlay="left"

            className="aspect-[4/3] rounded-[20px] border border-white/[0.14] sm:aspect-[16/11] lg:aspect-[5/4]"

          />

        </div>

        <div>

          <InfluxEyebrow>{HOME_INFLUX_PASSION.eyebrow}</InfluxEyebrow>

          <p

            data-home-reveal

            className="mt-5 font-display text-[clamp(1.5rem,calc(0.5rem+3vw),2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-white"

          >

            {HOME_INFLUX_PASSION.title}

          </p>

          <div data-home-reveal className="mt-8">

            <InfluxPrimaryButton to="/about">How we work</InfluxPrimaryButton>

          </div>

        </div>

      </div>

    </HomeDeckSectionShell>

  )

}


