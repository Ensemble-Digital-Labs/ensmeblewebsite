import {
  HOME_INFLUX_CAPABILITIES,
  HOME_INFLUX_CAPABILITIES_SECTION,
} from '../../../lib/homeInfluxContent'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomeChapterMonogram from '../HomeChapterMonogram'

import HomePopArtRevText from '../HomePopArtRevText'

import ServiceVerticalCard from '../../ui/ServiceVerticalCard'

import {
  accentForServiceTitle,
  contextualIconForServiceTitle,
  findServiceByTitle,
  iconForServiceTitle,
  imageForServiceTitle,
  SERVICE_DETAIL_PAGES_LINKS_ENABLED,
} from '../../../lib/serviceVerticals'

/** Desktop 3-column wave — row-major indices split so each column has even vertical gap */
const CAPABILITY_COLUMN_INDICES = [
  [0, 3],
  [1, 4, 6],
  [2, 5],
]

export default function HomeChapterCapabilities({ df, stacked = false, fillViewport = false }) {
  const renderCapabilityCard = (cap, index) => {
    const matched = findServiceByTitle(cap.title)

    return (
      <li key={cap.title} className="home-capability-stagger-grid__cell">
        <div data-home-reveal>
          <ServiceVerticalCard
            compact
            title={cap.title}
            description={matched?.description ?? cap.line}
            to={cap.to}
            accent={accentForServiceTitle(cap.title, index)}
            image={imageForServiceTitle(cap.title, index)}
            contextIcon={contextualIconForServiceTitle(cap.title)}
            icon={contextualIconForServiceTitle(cap.title) ? undefined : iconForServiceTitle(cap.title, matched?.id)}
            interactive={SERVICE_DETAIL_PAGES_LINKS_ENABLED}
          />
        </div>
      </li>
    )
  }

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-capabilities"
      ariaLabel={HOME_INFLUX_CAPABILITIES_SECTION.title}
      bleed
      bandAlign="start"
      className="home-capabilities-chapter py-10 md:py-16"
    >
      <DeckMeshBackdrop />

      <div className="home-capabilities-chapter__layout relative">
        <div
          className="home-capabilities-chapter__header home-popart-section relative"
          data-home-popart-section
          data-popart-sequence
        >
          <HomeChapterMonogram
            title={HOME_INFLUX_CAPABILITIES_SECTION.title}
            className="home-capabilities-chapter__monogram home-popart-section__monogram"
          />
          <div className="home-popart-section__copy relative z-[1]">
            <div className="home-popart-section__copy-inner relative z-[1]">
              <h2 className="home-capabilities-chapter__headline font-display font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                <HomePopArtRevText delay={0} headline>
                  {HOME_INFLUX_CAPABILITIES_SECTION.title}
                </HomePopArtRevText>
              </h2>
            </div>
          </div>
        </div>

        <div className="home-capability-stagger-grid relative z-[1] w-full">
          {/* Tablet / mobile — flat grid */}
          <ul className="home-capability-stagger-grid__flat grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:hidden">
            {HOME_INFLUX_CAPABILITIES.map((cap, index) => renderCapabilityCard(cap, index))}
          </ul>

          {/* Desktop — 3 columns, identical gap within each column + wave offset per column */}
          <div className="home-capability-stagger-grid__cols hidden lg:grid lg:grid-cols-3">
            {CAPABILITY_COLUMN_INDICES.map((indices, colIndex) => (
              <ul
                key={colIndex}
                className={`home-capability-stagger-grid__col home-capability-stagger-grid__col--${colIndex}`}
              >
                {indices.map((cardIndex) => {
                  const cap = HOME_INFLUX_CAPABILITIES[cardIndex]
                  if (!cap) return null
                  return renderCapabilityCard(cap, cardIndex)
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </HomeDeckSectionShell>
  )
}
