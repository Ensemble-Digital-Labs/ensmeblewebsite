import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Hero from '../components/sections/Hero'
import Page2 from '../components/sections/Page2'
import Carousel3D from '../components/sections/Carousel3D'
import Page4 from '../components/sections/Page4'
import Page5 from '../components/sections/Page5'
import { prefersReducedMotion } from '../lib/utils'

function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      
      {loaderComplete && (
        <div className="relative">
          {/* Match poppr page structure exactly */}
          <Hero /> {/* page1 */}
          <Page2 /> {/* page2 - Selected Work header */}
          <Carousel3D /> {/* page3 - 3D carousel */}
          <Page4 /> {/* page4 - Featured Insights */}
          <Page5 /> {/* page5 - Let's make great work together */}
        </div>
      )}
    </>
  )
}

export default Home
