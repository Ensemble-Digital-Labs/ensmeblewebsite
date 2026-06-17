import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { aiHubContent } from '../../lib/aiHubContent'

function AiPlaybookDetails() {
  const { capabilities } = aiHubContent

  return (
    <section className="relative overflow-hidden pb-20 lg:pb-28">
      <Container>
        <SectionHeading
          title="Capability playbooks"
          subtitle="How we deploy"
          className="relative z-10 mb-10 lg:mb-14"
          invert
        />

        <div className="relative z-10 space-y-6 lg:space-y-8">
          {capabilities.map((capability) => (
            <article
              key={capability.id}
              id={`ai-${capability.id}`}
              className="scroll-mt-28 rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:border-[color:var(--color-growth-from)]/25 sm:p-8 lg:rounded-[2.5rem] lg:p-10"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-growth-from)]/85">
                {capability.eyebrow}
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold leading-tight text-white lg:text-3xl">
                {capability.title}
              </h3>

              {capability.bullets?.length ? (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-base text-white/72">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)]"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {capability.body ? (
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/68 lg:text-lg">
                  {capability.body}
                </p>
              ) : null}

              {capability.tags?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {capability.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default AiPlaybookDetails
