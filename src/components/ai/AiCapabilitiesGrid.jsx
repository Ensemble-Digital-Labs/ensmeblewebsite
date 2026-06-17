import { Brain } from 'lucide-react'
import Container from '../ui/Container'
import ServiceVerticalCard from '../ui/ServiceVerticalCard'
import { aiHubContent } from '../../lib/aiHubContent'
import {
  accentForServiceTitle,
  contextualIconForServiceTitle,
  iconForServiceTitle,
  imageForServiceTitle,
} from '../../lib/serviceVerticals'

function AiCapabilitiesGrid() {
  const { capabilities } = aiHubContent

  return (
    <section className="relative overflow-hidden pb-24 pt-8 lg:pb-32 lg:pt-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {capabilities.map((capability, index) => (
            <ServiceVerticalCard
              key={capability.id}
              title={capability.title}
              description={capability.subtitle}
              accent={accentForServiceTitle(capability.title, index)}
              image={capability.image || imageForServiceTitle(capability.title, index)}
              imagePosition={capability.imagePosition}
              contextIcon={contextualIconForServiceTitle(capability.title)}
              icon={
                contextualIconForServiceTitle(capability.title)
                  ? undefined
                  : iconForServiceTitle(capability.title, undefined) ?? Brain
              }
              interactive={false}
              showCta={false}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default AiCapabilitiesGrid
