import Container from '../ui/Container'
import StandardCTA from '../StandardCTA'
import HomePopArtRevText from '../home/HomePopArtRevText'
import HomeDeckSectionShell from '../home/HomeDeckSectionShell'
import { DeckMeshBackdrop, DeckPanel, DeckStepBadge } from '../home/HomeDeckPrimitives'
import { usePopArtScrollReveals } from '../../hooks/usePopArtScrollReveals'
import { getPublishableSections } from '../../lib/blogArticleDetail'
import { cn } from '../../lib/utils'

function BlogArticleTags({ tags, className }) {
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

export function BlogArticleDetailNotFound() {
  usePopArtScrollReveals({ immediate: true })

  return (
    <div className="blog-article-detail home-influx-deck relative z-[1] flex min-h-[60vh] items-center pb-16 pt-28 text-white sm:pt-32 lg:pt-36">
      <Container>
        <DeckPanel className="mx-auto max-w-lg p-10 text-center">
          <h1 className="font-display text-3xl font-bold text-white">Article not found</h1>
          <p className="mt-4 text-base leading-relaxed text-white/68">
            This insight isn&apos;t published yet — browse the latest articles on our blog.
          </p>
          <div className="mt-8 flex justify-center">
            <StandardCTA to="/blog" variant="tech">
              Back to insights
            </StandardCTA>
          </div>
        </DeckPanel>
      </Container>
    </div>
  )
}

/**
 * Individual blog article — layout aligned with case study detail pages.
 * @param {{ doc: { title: string, summary: string, sections: Array<{ title?: string, body: string }>, tags?: string[] }, meta: { image: string, category?: string } }} props
 */
export default function BlogArticleDetailView({ doc, meta }) {
  usePopArtScrollReveals({ immediate: true })

  const sections = getPublishableSections(doc.sections)
  const displayTags = (doc.tags ?? []).filter((tag) => tag !== 'BLOG')

  return (
    <div className="blog-article-detail home-influx-deck relative z-[1] text-white">
      {/* Hero */}
      <section className="blog-article-detail__hero relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-16 lg:pt-36">
        <DeckMeshBackdrop className="opacity-80" />
        <Container className="relative z-10">
          <div className="blog-article-detail__hero-grid lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
            <header className="max-w-2xl lg:max-w-none" aria-label={doc.title}>
              <BlogArticleTags tags={displayTags} className="mb-6 justify-center sm:justify-start" />

              <h1 className="blog-article-detail__title text-center font-display text-[clamp(2rem,calc(1rem+4vw),3.5rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-left">
                <HomePopArtRevText delay={0} headline>
                  {doc.title}
                </HomePopArtRevText>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-center text-[clamp(1rem,0.35rem+1.1vw),1.2rem)] leading-[1.65] text-white/72 sm:mx-0 sm:text-left">
                {doc.summary}
              </p>
            </header>

            <div className="blog-article-detail__hero-visual relative mx-auto mt-10 w-full max-w-md lg:mt-0 lg:max-w-none">
              <div className="blog-article-detail__hero-frame relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-white/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)]">
                <img
                  src={meta.image}
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

      {/* Article body */}
      {sections.length > 0 ? (
        <HomeDeckSectionShell
          id="blog-article-body"
          ariaLabel="Article content"
          bleed
          className="blog-article-detail__body pb-16 py-10 md:pb-20 md:py-14"
        >
          <DeckMeshBackdrop />
          <div className="blog-article-detail__body-grid grid gap-4 md:gap-5">
            {sections.map((section, index) => (
              <DeckPanel key={`${section.title ?? 'section'}-${index}`} className="flex h-full flex-col p-6 md:p-7 lg:p-8">
                {section.title ? (
                  <div className="flex items-center gap-3">
                    <DeckStepBadge step={String(index + 1).padStart(2, '0')} />
                    <h2 className="font-display text-lg font-bold text-white md:text-xl">{section.title}</h2>
                  </div>
                ) : null}
                <p
                  className={cn(
                    'text-base leading-relaxed text-white/72 md:text-lg',
                    section.title ? 'mt-5' : '',
                  )}
                >
                  {section.body}
                </p>
              </DeckPanel>
            ))}
          </div>
        </HomeDeckSectionShell>
      ) : null}
    </div>
  )
}
