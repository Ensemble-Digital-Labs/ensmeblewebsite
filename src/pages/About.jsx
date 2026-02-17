import AboutHero from '../components/sections/AboutHero'
import MissionValues from '../components/sections/MissionValues'
import Team from '../components/sections/Team'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import SimpleCTA from '../components/sections/SimpleCTA'

function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionValues />
      <Team />
      <WhyChooseUs />
      <SimpleCTA />
    </div>
  )
}

export default About
