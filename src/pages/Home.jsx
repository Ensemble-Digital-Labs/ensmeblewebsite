/**
 * Homepage: scroll-driven atmosphere in `layout.jsx` (`HomeAtmosphereCanvas`).
 * Legacy full homepage: `/home-v1` (`HomeV1.jsx`). Neo hollow typography variant: `/home-v2` (`HomeV2.jsx`).
 */

import { useState } from 'react'
import { cn } from '../lib/utils'
import Loader from '../components/Loader'
import HomePageDnaCanvas from '../components/home/HomePageDnaCanvas'
import HomePageSections from '../components/home/HomePageSections'
import HomeStoryViewport from '../components/home/HomeStoryViewport'
import {
  HOME_PAGE_DNA_HELIX_ENABLED,
  HOME_PAGE_HELIX_VARIANT,
} from '../lib/homeDnaFeature'
import { useHomeHelixIntro } from '../hooks/useHomeHelixIntro'
import {
  isHomeIntroLoaderDone,
  markHomeIntroLoaderDone,
} from '../lib/homeLoaderGate'

function Home() {
  const [loaderComplete, setLoaderComplete] = useState(() => isHomeIntroLoaderDone())
  const useRibbonHelix =
    HOME_PAGE_DNA_HELIX_ENABLED && HOME_PAGE_HELIX_VARIANT === 'ribbon'
  const useDocumentHelix =
    HOME_PAGE_DNA_HELIX_ENABLED && HOME_PAGE_HELIX_VARIANT === 'document'

  useHomeHelixIntro(loaderComplete)

  return (
    <>
      {!loaderComplete && (
        <Loader
          onComplete={() => {
            markHomeIntroLoaderDone()
            setLoaderComplete(true)
          }}
        />
      )}
      <div
        id="home-scroll-root"
        className={cn(
          'home-influx-deck relative z-[1] text-white',
          useRibbonHelix && 'home-influx-deck--helix-rail',
        )}
        aria-label="Home"
        data-intro-ready={loaderComplete ? '' : undefined}
      >
        {useDocumentHelix ? (
          <HomePageDnaCanvas introReady={loaderComplete} />
        ) : null}
        <HomeStoryViewport>
          <HomePageSections introReady={loaderComplete} helixRail={useRibbonHelix} />
        </HomeStoryViewport>
      </div>
    </>
  )
}

export default Home
