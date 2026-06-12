import AboutHero from '../components/sections/AboutHero'
import MissionValues from '../components/sections/MissionValues'
import Team from '../components/sections/Team'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'

function About() {
  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      layer1={<BackgroundPathsParallaxLayer tone="dark" pathsOnly />}
      className="relative z-[1] box-border min-h-screen w-full text-white"
    >
      <AboutHero />
      <MissionValues />
      <Team />
      <WhyChooseUs />
    </ParallaxDepth>
  )
}

export default About
