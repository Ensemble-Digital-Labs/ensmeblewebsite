import { HOME_INFLUX_PASSION } from '../../../lib/homeInfluxContent'
import { HOME_PASSION_OVERLAY_IMAGES, HOME_PASSION_VISUAL } from '../../../lib/homeImagery'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import { DeckMeshBackdrop } from '../HomeDeckPrimitives'
import HomePopArtSectionLayout from '../HomePopArtSectionLayout'

export default function HomeChapterPassion({ df, stacked = false, fillViewport = false }) {
  const [titleLine, ...restLines] = HOME_INFLUX_PASSION.lines
  const subtitle = restLines.join(' ')

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-passion"
      ariaLabel="Our mission"
      bleed
      className="home-popart-chapter py-12 md:py-20 lg:py-24"
    >
      <DeckMeshBackdrop />

      <HomePopArtSectionLayout
        title={titleLine}
        subtitle={subtitle}
        body={HOME_INFLUX_PASSION.body}
        cta={{ to: '/about', label: 'How we work', hoverLabel: 'Our process' }}
        visual={{
          main: HOME_PASSION_VISUAL,
          overlayTop: HOME_PASSION_OVERLAY_IMAGES.top,
          overlayBottom: HOME_PASSION_OVERLAY_IMAGES.bottom,
          overlayLeft: HOME_PASSION_OVERLAY_IMAGES.left,
          overlayRight: HOME_PASSION_OVERLAY_IMAGES.right,
        }}
      />
    </HomeDeckSectionShell>
  )
}
