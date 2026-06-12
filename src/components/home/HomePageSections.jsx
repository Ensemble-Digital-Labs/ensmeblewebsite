/**
 * Homepage: all sections in one continuous `#main` scroll (no act cutoffs).
 */

import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeDeckActs'
import { useHomeSequentialReveals } from '../../hooks/useHomeSequentialReveals'
import { useHomePopArtRevText } from '../../hooks/useHomePopArtRevText'
import HomeChapterHero from './chapters/HomeChapterHero'
import HomeChapterBrand from './chapters/HomeChapterBrand'
import HomeChapterExpertise from './chapters/HomeChapterExpertise'
import HomeChapterProof from './chapters/HomeChapterProof'
import HomeChapterTestimonials from './chapters/HomeChapterTestimonials'
import HomeChapterPassion from './chapters/HomeChapterPassion'
import HomeChapterWork from './chapters/HomeChapterWork'
import HomeChapterProcess from './chapters/HomeChapterProcess'
import HomeChapterCapabilities from './chapters/HomeChapterCapabilities'
import HomeChapterCta from './chapters/HomeChapterCta'

const CHAPTER_COMPONENTS = {
  'home-hero': HomeChapterHero,
  'home-brand': HomeChapterBrand,
  'home-expertise': HomeChapterExpertise,
  'home-proof': HomeChapterProof,
  'home-testimonials': HomeChapterTestimonials,
  'home-passion': HomeChapterPassion,
  'home-work': HomeChapterWork,
  'home-process': HomeChapterProcess,
  'home-capabilities': HomeChapterCapabilities,
  'home-cta': HomeChapterCta,
}

export default function HomePageSections({ introReady = true }) {
  useHomeSequentialReveals()
  useHomePopArtRevText(introReady)

  return (
    <div id="home-sections" className="home-blank-canvas relative w-full">
      {HOME_NARRATIVE_SECTIONS.map(({ id: sectionId }) => {
        const Chapter = CHAPTER_COMPONENTS[sectionId]
        if (!Chapter) return null
        const isHero = sectionId === 'home-hero'
        return (
          <Chapter
            key={sectionId}
            df={false}
            stacked={false}
            fillViewport={isHero}
            {...(isHero ? { introReady } : {})}
          />
        )
      })}
    </div>
  )
}
