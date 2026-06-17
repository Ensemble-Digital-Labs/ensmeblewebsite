import AboutHero from '../components/sections/AboutHero'
import MissionValues from '../components/sections/MissionValues'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'

function About() {
  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      transparentBackdrop
      className="relative z-[1] box-border min-h-screen w-full text-white"
    >
      <AboutHero />
      <MissionValues />
      <WhyChooseUs />
    </ParallaxDepth>
  )
}

export default About
