import { useParams, Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { caseStudies } from '../lib/content'
import Page5 from '../components/sections/Page5'

function CaseStudyDetail() {
  const { slug } = useParams()
  const study = caseStudies.find(s => s.slug === slug)

  if (!study) {
    return (
      <div className="min-h-screen pt-8 pb-16 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Case Study Not Found</h1>
            <p className="text-text-secondary mb-8">The case study you're looking for doesn't exist.</p>
            <Link to="/casestudies">
              <Button variant="primary">Back to Case Studies</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-bg-primary">
        <Container>
          <Link
            to="/casestudies"
            className="inline-flex items-center text-text-secondary hover:text-brand-primary transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {study.title}
            </h1>

            {/* Client */}
            <p className="text-lg text-text-secondary mb-8">
              Client: <span className="font-semibold text-text-primary">{study.client}</span>
            </p>

            {/* Summary */}
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              {study.excerpt}
            </p>

            {/* Primary Metric */}
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-bg-card rounded-xl border border-brand-primary/20">
              <div>
                <p className="text-4xl font-bold text-brand-primary">
                  {study.primaryMetric.value}
                </p>
                <p className="text-sm text-text-muted">
                  {study.primaryMetric.label}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenge / Approach / Results Sections */}
      <section className="py-16 lg:py-24 bg-bg-secondary">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {study.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                Our Approach
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {study.approach}
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                The Results
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {study.results}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Result Metrics Cards */}
      <section className="py-16 lg:py-24 bg-bg-primary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
              Key Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {study.metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="text-center group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
                >
                  <p className="text-4xl font-bold text-brand-primary mb-2">
                    {metric.value}
                  </p>
                  <p className="text-lg font-semibold text-text-primary mb-2">
                    {metric.label}
                  </p>
                  <p className="text-sm text-text-muted">
                    {metric.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 bg-bg-secondary">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {study.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 rounded-xl overflow-hidden bg-bg-card group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`${study.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Page5 layout="page" />
    </div>
  )
}

export default CaseStudyDetail
