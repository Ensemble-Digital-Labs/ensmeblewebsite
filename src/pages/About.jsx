import AboutHero from '../components/sections/AboutHero'
import MissionValues from '../components/sections/MissionValues'
import Team from '../components/sections/Team'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Page5 from '../components/sections/Page5'

function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionValues />
      <Team />
      <WhyChooseUs />
      <Page5 layout="page" />
    </div>
  )
}

export default About
