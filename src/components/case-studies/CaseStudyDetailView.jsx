import Container from '../ui/Container'
import StandardCTA from '../StandardCTA'
import HomePopArtRevText from '../home/HomePopArtRevText'
import HomeDeckSectionShell from '../home/HomeDeckSectionShell'
import { DeckMeshBackdrop, DeckPanel, DeckStepBadge } from '../home/HomeDeckPrimitives'
import { usePopArtScrollReveals } from '../../hooks/usePopArtScrollReveals'
import { cn } from '../../lib/utils'

const STORY_SECTIONS = [
  { step: '01', title: 'The challenge', key: 'challenge' },
  { step: '02', title: 'Our approach', key: 'approach' },
  { step: '03', title: 'The results', key: 'results' },
]

function CaseStudyTags({ tags, className }) {
  if (!tags?.length) return null
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function CaseStudyDetailNotFound() {
  usePopArtScrollReveals({ immediate: true })

  return (
    <div className="case-study-detail home-influx-deck relative z-[1] flex min-h-[60vh] items-center pb-16 pt-28 text-white sm:pt-32 lg:pt-36">
      <Container>
        <DeckPanel className="mx-auto max-w-lg p-10 text-center">
          <h1 className="font-display text-3xl font-bold text-white">Case study not found</h1>
          <p className="mt-4 text-base leading-relaxed text-white/68">
            The project you&apos;re looking for isn&apos;t in our portfolio yet.
          </p>
          <div className="mt-8 flex justify-center">
            <StandardCTA to="/case-studies" variant="tech">
              Back to case studies
            </StandardCTA>
          </div>
        </DeckPanel>
      </Container>
    </div>
  )
}

export default function CaseStudyDetailView({ study }) {
  usePopArtScrollReveals({ immediate: true })

  return (
    <div className="case-study-detail home-influx-deck relative z-[1] text-white">
      {/* Hero */}
      <section className="case-study-detail__hero relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-16 lg:pt-36">
        <DeckMeshBackdrop className="opacity-80" />
        <Container className="relative z-10">
          <div className="case-study-detail__hero-grid lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
            <header className="max-w-2xl lg:max-w-none" aria-label={study.title}>
              <CaseStudyTags tags={study.tags} className="mb-6 justify-center sm:justify-start" />

              <h1 className="case-study-detail__title text-center font-display text-[clamp(2rem,calc(1rem+4vw),3.5rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-left">
                <HomePopArtRevText delay={0} headline>
                  {study.title}
                </HomePopArtRevText>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-center text-[clamp(1rem,0.35rem+1.1vw),1.2rem)] leading-[1.65] text-white/72 sm:mx-0 sm:text-left">
                {study.excerpt}
              </p>

              <DeckPanel accent className="mx-auto mt-8 inline-flex w-full max-w-sm items-center gap-4 p-5 sm:mx-0 sm:max-w-none sm:w-auto">
                <div>
                  <p className="font-display text-3xl font-extrabold leading-none text-transparent bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] bg-clip-text sm:text-4xl">
                    {study.primaryMetric.value}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white/60">{study.primaryMetric.label}</p>
                </div>
              </DeckPanel>
            </header>

            <div className="case-study-detail__hero-visual relative mx-auto mt-10 w-full max-w-md lg:mt-0 lg:max-w-none">
              <div className="case-study-detail__hero-frame relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-white/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)]">
                <img
                  src={study.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <HomeDeckSectionShell
        id="case-study-story"
        ariaLabel="Project story"
        bleed
        className="case-study-detail__story py-10 md:py-14"
      >
        <DeckMeshBackdrop />
        <div className="case-study-detail__story-grid grid gap-4 md:gap-5 lg:grid-cols-3">
          {STORY_SECTIONS.map((section) => (
            <DeckPanel key={section.key} className="flex h-full flex-col p-6 md:p-7">
              <div className="flex items-center gap-3">
                <DeckStepBadge step={section.step} />
                <h2 className="font-display text-lg font-bold text-white md:text-xl">{section.title}</h2>
              </div>
              <p className="mt-5 flex-1 text-base leading-relaxed text-white/72">{study[section.key]}</p>
            </DeckPanel>
          ))}
        </div>
      </HomeDeckSectionShell>

      {/* Metrics */}
      <HomeDeckSectionShell
        id="case-study-metrics"
        ariaLabel="Key metrics"
        bleed
        className="case-study-detail__metrics pb-16 py-10 md:pb-20 md:py-14"
      >
        <header className="mb-8 max-w-2xl md:mb-10">
          <h2 className="font-display text-[clamp(1.75rem,calc(1rem+2.5vw),2.25rem)] font-extrabold leading-tight text-white">
            Key metrics
          </h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {study.metrics.map((metric, index) => (
            <DeckPanel key={metric.label} className="p-6 text-center md:p-7">
              <p className="font-display text-3xl font-extrabold text-transparent bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] bg-clip-text md:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-base font-semibold text-white">{metric.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/62">{metric.description}</p>
              <span className="sr-only">{`Metric ${index + 1}`}</span>
            </DeckPanel>
          ))}
        </div>
      </HomeDeckSectionShell>
    </div>
  )
}
