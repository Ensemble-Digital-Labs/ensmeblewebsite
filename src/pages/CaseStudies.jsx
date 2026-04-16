import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { caseStudies, caseStudyFilters } from '../lib/content'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'

function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filteredStudies = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter(study => 
        study.category === activeFilter || 
        study.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      )

  const handleCardClick = (slug) => {
    navigate(`/case-studies/${slug}`)
  }

  return (
    <ParallaxDepth
      variant="default"
      tone="light"
      layer1={<BackgroundPathsParallaxLayer />}
      className="box-border min-h-screen min-h-[100svh] w-full pt-8 pb-16 sm:pb-20"
    >
      <Container>
        <SectionHeading
          title="Case Studies"
          subtitle="Our Work"
          className="mb-8 lg:mb-12"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12 lg:mb-16">
          {caseStudyFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-primary ${
                activeFilter === filter
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5'
                  : 'bg-bg-card text-text-secondary hover:bg-bg-card hover:text-text-primary hover:border-brand-primary/50 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredStudies.map((study) => (
            <Card
              key={study.id}
              hover
              className="flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
              onClick={() => handleCardClick(study.slug)}
            >
              {/* Image */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-bg-secondary">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {study.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                  {study.title}
                </h3>

                {/* Client */}
                <p className="text-sm text-text-muted mb-3">
                  {study.client}
                </p>

                {/* Excerpt */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                  {study.excerpt}
                </p>

                {/* Metric Badge */}
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-brand-primary">
                      {study.primaryMetric.value}
                    </p>
                    <p className="text-xs text-text-muted">
                      {study.primaryMetric.label}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No case studies found for this filter.</p>
          </div>
        )}
      </Container>
    </ParallaxDepth>
  )
}

export default CaseStudies
