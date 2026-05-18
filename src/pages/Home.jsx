/**
 * Homepage: scroll-driven atmosphere in `layout.jsx` (`HomeAtmosphereCanvas`).
 * Legacy full homepage: `/home-v1` (`HomeV1.jsx`). Neo hollow typography variant: `/home-v2` (`HomeV2.jsx`).
 */

import HomePageSections from '../components/home/HomePageSections'
import { HomePixelTransitionProvider } from '../components/home/HomePixelTransition'
import HomeStoryViewport from '../components/home/HomeStoryViewport'

function Home() {
  return (
    <HomePixelTransitionProvider>
      <div id="home-scroll-root" className="relative z-[1] text-white" aria-label="Home">
        <HomeStoryViewport>
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <HomePageSections />
          </div>
        </HomeStoryViewport>
      </div>
    </HomePixelTransitionProvider>
  )
}

export default Home
