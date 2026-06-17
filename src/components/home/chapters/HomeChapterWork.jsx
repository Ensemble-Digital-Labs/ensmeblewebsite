import { caseStudies } from '../../../lib/content'
import { HOME_INFLUX_WORK } from '../../../lib/homeInfluxContent'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import { DeckMeshBackdrop } from '../HomeDeckPrimitives'
import HomeWorkMasonryGrid from '../HomeWorkMasonryGrid'
import HomePopArtCircleCta from '../HomePopArtCircleCta'
import HomeChapterMonogram from '../HomeChapterMonogram'
import { InfluxLead } from '../influx/HomeInfluxPrimitives'

export default function HomeChapterWork({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-work"
      ariaLabel="Our works"
      bleed
      className="home-work-chapter py-6 md:py-8 lg:py-0"
    >
      <DeckMeshBackdrop />

      <div className="home-work-chapter__layout">
        <div
          className="home-work-chapter__header home-popart-section relative"
          data-home-popart-section
          data-popart-sequence
        >
          <HomeChapterMonogram
            title={HOME_INFLUX_WORK.title}
            className="home-work-chapter__monogram home-popart-section__monogram"
          />
          <div className="home-popart-section__copy relative z-[1]">
            <div className="home-popart-section__copy-inner relative z-[1]">
              <h2 className="home-work-chapter__headline font-display font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                {HOME_INFLUX_WORK.title}
              </h2>
              <InfluxLead className="home-work-chapter__lead mt-3 max-w-2xl md:mt-3.5">
                {HOME_INFLUX_WORK.body}
              </InfluxLead>
            </div>
          </div>
        </div>

        <div className="home-work-chapter__portfolio">
          <HomeWorkMasonryGrid studies={caseStudies} />

          <div className="home-work-chapter__cta home-popart-section__cta relative z-[1]" data-home-reveal>
            <HomePopArtCircleCta
              to="/case-studies"
              label="View all case studies"
              hoverLabel="Case studies"
            />
          </div>
        </div>
      </div>
    </HomeDeckSectionShell>
  )
}
