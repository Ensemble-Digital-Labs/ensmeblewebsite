import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { ctaContent } from '../../lib/content'

function SimpleCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-primary to-brand-secondary">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {ctaContent.headline}
          </h2>
          <p className="text-lg sm:text-xl text-white text-opacity-90 mb-8 leading-relaxed">
            {ctaContent.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={ctaContent.primaryCTA.link}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-primary hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                {ctaContent.primaryCTA.text}
              </Button>
            </Link>
            <Link to={ctaContent.secondaryCTA.link}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-primary hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                {ctaContent.secondaryCTA.text}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SimpleCTA
