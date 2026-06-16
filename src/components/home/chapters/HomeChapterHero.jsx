import { cn } from '../../../lib/utils'

import { HOME_INFLUX_HERO } from '../../../lib/homeInfluxContent'

import { useHomeHeroEntrance } from '../../../hooks/useHomeHeroEntrance'

import HomeHeroTitle from '../HomeHeroTitle'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import {
  InfluxPrimaryButton,
} from '../influx/HomeInfluxPrimitives'

export default function HomeChapterHero({
  df,
  stacked = false,
  fillViewport = false,
  introReady = true,
  helixRail = false,
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
      bandAlign="start"
      className={cn(
        'home-hero-section overflow-x-clip overflow-y-visible',
        (fillViewport || !stacked) && 'min-h-[100svh] min-h-[100dvh]',
        helixRail && 'home-hero-section--helix-rail',
      )}
    >
      <div
        className={cn(
          'home-hero-layout relative z-[1] flex w-full flex-1 flex-col justify-start px-4 sm:px-6 lg:px-8',
          helixRail
            ? 'home-hero-layout--helix-rail mx-auto max-w-3xl items-center text-center lg:max-w-none lg:items-start lg:text-left'
            : 'mx-auto max-w-3xl items-center text-center lg:max-w-4xl',
        )}
      >
        <div
          className={cn(
            'home-hero-center relative z-[2] w-full',
            helixRail ? 'lg:max-w-[min(100%,48rem)]' : '',
          )}
        >
          <HomeHeroTitle helixRail={helixRail} className={helixRail ? 'lg:mx-0 lg:mr-auto' : undefined} />

          <div
            className={cn(
              'mt-6 flex flex-col gap-3 xs:mt-7 xs:flex-row xs:flex-wrap sm:mt-8',
              helixRail
                ? 'items-center justify-center lg:items-start lg:justify-start'
                : 'items-center justify-center',
            )}
          >
            <div data-home-hero-cta className="min-w-0">
              <InfluxPrimaryButton
                to={HOME_INFLUX_HERO.primaryCta.link}
                className="home-hero-cta-pill"
              >
                <span className="home-hero-cta-pill__text">{HOME_INFLUX_HERO.primaryCta.text}</span>
              </InfluxPrimaryButton>
            </div>
            <div data-home-hero-cta className="min-w-0">
              <InfluxPrimaryButton
                to={HOME_INFLUX_HERO.secondaryCta.link}
                className="home-hero-cta-pill"
              >
                <span className="home-hero-cta-pill__text">{HOME_INFLUX_HERO.secondaryCta.text}</span>
              </InfluxPrimaryButton>
            </div>
          </div>

          <div
            data-home-hero-scroll-hint
            className={cn(
              'home-hero-scroll-hint',
              helixRail ? 'items-center lg:items-start' : 'items-center',
            )}
            aria-hidden
          >
            <span>Scroll to explore</span>
            <span className="home-hero-scroll-hint__line" />
          </div>
        </div>
      </div>
    </HomeDeckSectionShell>
  )
}
