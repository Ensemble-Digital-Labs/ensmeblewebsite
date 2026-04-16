import ServicesHero from '../components/sections/ServicesHero'
import ServicesGrid from '../components/sections/ServicesGrid'
import HowWeHelpClients from '../components/sections/ServiceTiers' // How our services help: Essentials / Growth / Dominate
import HowWeWork from '../components/sections/HowWeWork'
import FAQ from '../components/sections/FAQ'

function Services() {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesGrid />
      <HowWeHelpClients />
      <HowWeWork />
      <FAQ />
    </div>
  )
}

export default Services
