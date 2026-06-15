import { useParams, Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import { caseStudies } from '../lib/content'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'
import { cn } from '../lib/utils'

function CaseStudyDetailShell({ children, className }) {
  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      layer1={<BackgroundPathsParallaxLayer tone="dark" pathsOnly />}
      className={cn(
        'relative z-[1] box-border min-h-screen w-full text-white',
        className,
      )}
    >
      {children}
    </ParallaxDepth>
  )
}

function CaseStudyDetail() {
  const { slug } = useParams()
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return (
      <CaseStudyDetailShell className="flex items-center justify-center pb-16 pt-28 sm:pt-32 lg:pt-36">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
            <p className="text-white/65 mb-8">The case study you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              to="/case-studies"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-2.5 text-sm font-semibold text-white"
            >
              Back to Case Studies
            </Link>
          </div>
        </Container>
      </CaseStudyDetailShell>
    )
  }

  return (
    <CaseStudyDetailShell className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
      <Container>
        <nav aria-label="Case study navigation" className="mb-8 mt-1 flex justify-center sm:mt-2">
          <Link
            to="/case-studies"
            className="inline-flex min-h-[44px] items-center text-sm text-white/60 transition-colors hover:text-cyan-200/90"
          >
            <svg className="mr-2 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Case Studies
          </Link>
        </nav>

        <header className="mx-auto max-w-3xl text-center" aria-label={study.title}>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/90"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {study.title}
          </h1>

          <p className="mt-6 text-lg text-white/72">
            Client: <span className="font-semibold text-white">{study.client}</span>
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/72">{study.excerpt}</p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-sm">
              <div>
                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text">
                  {study.primaryMetric.value}
                </p>
                <p className="text-base text-white/60">{study.primaryMetric.label}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto mt-16 max-w-4xl space-y-16 lg:mt-20 lg:space-y-20">
          <section>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-6">The Challenge</h2>
            <p className="text-lg leading-relaxed text-white/72">{study.challenge}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-6">Our Approach</h2>
            <p className="text-lg leading-relaxed text-white/72">{study.approach}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-6">The Results</h2>
            <p className="text-lg leading-relaxed text-white/72">{study.results}</p>
          </section>
        </div>

        <section className="mx-auto mt-16 max-w-4xl lg:mt-20">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-12 text-center">Key Metrics</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
              >
                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text">
                  {metric.value}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{metric.label}</p>
                <p className="mt-2 text-base leading-relaxed text-white/60">{metric.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl lg:mt-20">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-12 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {study.gallery.map((image, index) => (
              <div
                key={image}
                className="group relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
              >
                <img
                  src={image}
                  alt={`${study.title} — image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </CaseStudyDetailShell>
  )
}

export default CaseStudyDetail
