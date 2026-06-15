import { HOME_EXPERTISE_CARDS, HOME_INFLUX_EXPERTISE } from '../../../lib/homeInfluxContent'

import { HOME_EXPERTISE_CONTEXTUAL_OVERLAYS } from '../../../lib/ensemble2026Icons'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomePopArtSectionLayout from '../HomePopArtSectionLayout'

import HomeExpertiseCard from '../influx/HomeExpertiseCard'

import { InfluxTextLink } from '../influx/HomeInfluxPrimitives'

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
        cta={{ to: '/services', label: 'Explore all services' }}
        visual={{
          main: {
            src: HOME_EXPERTISE_CARDS[0]?.image,
            position: HOME_EXPERTISE_CARDS[0]?.imagePosition ?? '50% 25%',
          },
          overlayTop: {
            src: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.top.src,
            position: '50% 50%',
            fit: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.top.fit ?? 'cover',
            alt: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.top.alt,
            variant: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.top.variant,
          },
          overlayBottom: {
            src: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.bottom.src,
            position: '50% 50%',
            fit: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.bottom.fit ?? 'cover',
            alt: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.bottom.alt,
            variant: HOME_EXPERTISE_CONTEXTUAL_OVERLAYS.bottom.variant,
          },
        }}
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {HOME_EXPERTISE_CARDS.map((card, index) => (
            <li key={card.id} data-home-reveal>
              <HomeExpertiseCard card={card} accentIndex={index} />
            </li>
          ))}
        </ul>

        <div data-home-reveal className="mt-10 text-center md:text-left">
          <InfluxTextLink to="/services">View full capabilities</InfluxTextLink>
        </div>
      </HomePopArtSectionLayout>
    </HomeDeckSectionShell>
  )
}
