import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { ctaContent } from '../../lib/content'

function CTABand() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0c1829] via-[#881337] to-[color:var(--color-growth-to)]">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="cta-band-heading-glow font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            {ctaContent.headline}
          </h2>
          <p className="text-lg sm:text-xl text-white text-opacity-90 mb-8 leading-relaxed">
            {ctaContent.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={ctaContent.primaryCTA.link}>
              <Button size="lg" variant="primary">
                {ctaContent.primaryCTA.text}
              </Button>
            </Link>
            <Link to={ctaContent.secondaryCTA.link}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/45 hover:border-white/60 hover:bg-white/[0.12]"
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

export default CTABand
