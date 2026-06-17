import Container from '../ui/Container'
import HomePopArtRevText from '../home/HomePopArtRevText'
import HomeDeckSectionShell from '../home/HomeDeckSectionShell'
import { DeckMeshBackdrop, DeckPanel } from '../home/HomeDeckPrimitives'
import { usePopArtScrollReveals } from '../../hooks/usePopArtScrollReveals'
import { cn } from '../../lib/utils'

/**
 * Home-deck legal page — privacy, terms, and similar policy docs.
 * @param {{ doc: import('../../data/site/buildPage.js').SitePageDoc }} props
 */
export default function LegalDocView({ doc }) {
  usePopArtScrollReveals({ immediate: true })

  return (
    <div className="legal-doc-page home-influx-deck relative z-[1] text-white">
      <section className="legal-doc-page__hero relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-36">
        <DeckMeshBackdrop className="opacity-80" />
        <Container className="relative z-10">
          <header className="max-w-3xl">
            <h1 className="font-display text-center text-[clamp(1.85rem,calc(0.75rem+3.8vw),3.25rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white sm:text-left">
              <HomePopArtRevText delay={0.06} headline>
                {doc.title}
              </HomePopArtRevText>
            </h1>

            {doc.tags?.length ? (
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="mx-auto mt-8 max-w-2xl text-center text-[clamp(1rem,0.35rem+1.1vw),1.125rem)] leading-[1.65] text-white/72 sm:mx-0 sm:text-left">
              {doc.summary}
            </p>
          </header>
        </Container>
      </section>

      <HomeDeckSectionShell
        id="legal-content"
        ariaLabel={doc.title}
        bleed
        className="legal-doc-page__content pb-12 md:pb-16"
      >
        <DeckMeshBackdrop />
        <div className="mx-auto max-w-3xl space-y-4 md:space-y-5">
          {doc.sections.map((section, index) => (
            <DeckPanel key={section.title ?? index} className="p-6 md:p-8">
              {section.title ? (
                <h2 className="font-display text-lg font-bold leading-tight text-white md:text-xl">
                  {section.title}
                </h2>
              ) : null}
              <p
                className={cn(
                  'text-base leading-relaxed text-white/72',
                  section.title ? 'mt-4' : '',
                )}
              >
                {section.body}
              </p>
            </DeckPanel>
          ))}
        </div>
      </HomeDeckSectionShell>
    </div>
  )
}
