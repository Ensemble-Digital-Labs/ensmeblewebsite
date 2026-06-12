import ServicesHero from '../components/sections/ServicesHero'
import ServicesGrid from '../components/sections/ServicesGrid'
import HowWeHelpClients from '../components/sections/ServiceTiers'
import HowWeWork from '../components/sections/HowWeWork'
import FAQ from '../components/sections/FAQ'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'

function Services() {
  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      layer1={<BackgroundPathsParallaxLayer tone="dark" pathsOnly />}
      className="relative z-[1] box-border min-h-screen w-full text-white"
    >
      <ServicesHero />
      <ServicesGrid />
      <HowWeHelpClients />
      <HowWeWork />
      <FAQ />
    </ParallaxDepth>
  )
}

export default Services
