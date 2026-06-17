import Container from '../ui/Container'
import ServiceVerticalCard from '../ui/ServiceVerticalCard'
import { services } from '../../data/services'
import {
  contextualIconForServiceTitle,
  iconForServiceTitle,
  pathForServiceId,
  accentForServiceTitle,
  imageForServiceTitle,
  SERVICE_DETAIL_PAGES_LINKS_ENABLED,
} from '../../lib/serviceVerticals'

function ServicesGrid() {
  return (
    <section className="relative overflow-hidden pb-24 pt-8 lg:pb-32 lg:pt-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {services.map((service, index) => (
            <ServiceVerticalCard
              key={service.id}
              title={service.title}
              description={service.description}
              to={pathForServiceId(service.id)}
              accent={service.accent ?? accentForServiceTitle(service.title, index)}
              image={service.image ?? imageForServiceTitle(service.title, index)}
              contextIcon={contextualIconForServiceTitle(service.title)}
              icon={contextualIconForServiceTitle(service.title) ? undefined : iconForServiceTitle(service.title, service.id)}
              interactive={SERVICE_DETAIL_PAGES_LINKS_ENABLED}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ServicesGrid
