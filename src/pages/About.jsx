import AboutHero from '../components/sections/AboutHero'
import MissionValues from '../components/sections/MissionValues'
import Team from '../components/sections/Team'
import WhyChooseUs from '../components/sections/WhyChooseUs'

function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionValues />
      <Team />
      <WhyChooseUs />
    </div>
  )
}

export default About
