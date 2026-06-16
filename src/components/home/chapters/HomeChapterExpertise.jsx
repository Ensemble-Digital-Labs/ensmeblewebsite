import { HOME_INFLUX_EXPERTISE } from '../../../lib/homeInfluxContent'

import { HOME_EXPERTISE_OVERLAY_IMAGES, HOME_EXPERTISE_VISUAL } from '../../../lib/homeImagery'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomePopArtSectionLayout from '../HomePopArtSectionLayout'

export default function HomeChapterExpertise({ df, stacked = false, fillViewport = false }) {
  const [titleLine, ...restLines] = HOME_INFLUX_EXPERTISE.lines
  const subtitle = restLines.join(' ')

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-expertise"
      ariaLabel="Our expertise"
      bleed
      className="home-popart-chapter py-12 md:py-20 lg:py-24"
    >
      <DeckMeshBackdrop />

      <HomePopArtSectionLayout
        reverse
        title={titleLine}
        subtitle={subtitle}
        body={HOME_INFLUX_EXPERTISE.lead}
        cta={{ to: '/services', label: 'Explore all services', hoverLabel: 'Our services' }}
        visual={{
          main: HOME_EXPERTISE_VISUAL,
          overlayTop: HOME_EXPERTISE_OVERLAY_IMAGES.top,
          overlayBottom: HOME_EXPERTISE_OVERLAY_IMAGES.bottom,
        }}
      />
    </HomeDeckSectionShell>
  )
}
