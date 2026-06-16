import { HOME_INFLUX_BRAND } from '../../../lib/homeInfluxContent'

import { HOME_BRAND_IMAGE, HOME_BRAND_OVERLAY_IMAGES } from '../../../lib/homeImagery'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomePopArtSectionLayout from '../HomePopArtSectionLayout'

export default function HomeChapterBrand({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-brand"
      ariaLabel="About Ensemble"
      bleed
      className="home-popart-chapter py-12 md:py-20 lg:py-24"
    >
      <DeckMeshBackdrop />

      <HomePopArtSectionLayout
        title={HOME_INFLUX_BRAND.term}
        subtitle={HOME_INFLUX_BRAND.definition}
        body={HOME_INFLUX_BRAND.body}
        cta={{ to: '/about', label: 'Read our story', hoverLabel: 'Our story' }}
        visual={{
          main: {
            src: HOME_BRAND_IMAGE.src,
            alt: HOME_BRAND_IMAGE.alt,
            position: HOME_BRAND_IMAGE.position,
          },
          overlayTop: HOME_BRAND_OVERLAY_IMAGES.top,
          overlayBottom: HOME_BRAND_OVERLAY_IMAGES.bottom,
        }}
      />
    </HomeDeckSectionShell>
  )
}
