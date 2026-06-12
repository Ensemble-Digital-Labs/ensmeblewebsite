import { cn } from '../../../lib/utils'

import { HOME_INFLUX_HERO } from '../../../lib/homeInfluxContent'

import { useHomeHeroEntrance } from '../../../hooks/useHomeHeroEntrance'

import HomeHeroTitle from '../HomeHeroTitle'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import {
  InfluxPrimaryButton,
  InfluxSecondaryButton,
} from '../influx/HomeInfluxPrimitives'

export default function HomeChapterHero({
  df,
  stacked = false,
  fillViewport = false,
  introReady = true,
}) {
  useHomeHeroEntrance(introReady)

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      id="home-hero"
      ariaLabel="Hero"
      bleed
      viewportBand={fillViewport || !stacked}
      bandAlign="center"
      className={cn(
        'home-hero-section overflow-x-clip overflow-y-visible',
        (fillViewport || !stacked) && 'min-h-[100svh] min-h-[100dvh]',
      )}
    >
      <div className="home-hero-layout relative z-[1] mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="home-hero-center relative z-[2] w-full text-center">
          <HomeHeroTitle />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 xs:flex-row xs:flex-wrap">
            <div data-home-hero-cta className="min-w-0">
              <InfluxPrimaryButton to={HOME_INFLUX_HERO.primaryCta.link}>
                {HOME_INFLUX_HERO.primaryCta.text}
              </InfluxPrimaryButton>
            </div>
            <div data-home-hero-cta className="min-w-0">
              <InfluxSecondaryButton to={HOME_INFLUX_HERO.secondaryCta.link}>
                {HOME_INFLUX_HERO.secondaryCta.text}
              </InfluxSecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </HomeDeckSectionShell>
  )
}
