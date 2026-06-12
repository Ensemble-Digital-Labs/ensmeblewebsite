/**
 * Homepage: scroll-driven atmosphere in `layout.jsx` (`HomeAtmosphereCanvas`).
 * Legacy full homepage: `/home-v1` (`HomeV1.jsx`). Neo hollow typography variant: `/home-v2` (`HomeV2.jsx`).
 */

import { useState } from 'react'
import Loader from '../components/Loader'
import HomePageDnaCanvas from '../components/home/HomePageDnaCanvas'
import HomePageSections from '../components/home/HomePageSections'
import HomeStoryViewport from '../components/home/HomeStoryViewport'
import {
  isHomeIntroLoaderDone,
  markHomeIntroLoaderDone,
} from '../lib/homeLoaderGate'

function Home() {
  const [loaderComplete, setLoaderComplete] = useState(() => isHomeIntroLoaderDone())

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
        className="home-influx-deck relative z-[1] text-white"
        aria-label="Home"
        data-intro-ready={loaderComplete ? '' : undefined}
      >
        <HomePageDnaCanvas />
        <HomeStoryViewport>
          <HomePageSections introReady={loaderComplete} />
        </HomeStoryViewport>
      </div>
    </>
  )
}

export default Home
