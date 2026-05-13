import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import StandardCTA from '../StandardCTA'

/**
 * Dark, premium inner page — aligned with home bands (`#050816`, growth rose labels, display headings).
 * @param {{ doc: { path: string, eyebrow: string, title: string, summary: string, sections: Array<{ title?: string, body: string }>, tags?: string[], noIndex?: boolean, relatedLinks?: Array<{ to: string, title: string, description: string }> } }} props
 */
function MarketingDocLayout({ doc }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${doc.title} · Ensemble Digital Labs`
    return () => {
      document.title = prev
    }
  }, [doc.title])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(233,78,119,0.1)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgba(99,102,241,0.06)_0%,transparent_45%)]"
        aria-hidden
      />

      <Container className="relative z-[1] pb-20 pt-24 sm:pb-24 sm:pt-28 lg:pt-32">
        <nav className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          <Link to="/" className="transition-colors hover:text-rose-200/90">
            Home
          </Link>
          <span className="mx-2 opacity-50" aria-hidden>
            /
          </span>
          {doc.path.startsWith('/ai/') ? (
            <>
              <Link to="/ai" className="transition-colors hover:text-rose-200/90">
                AI
              </Link>
              <span className="mx-2 opacity-50" aria-hidden>
                /
              </span>
            </>
          ) : null}
          <span className="text-white/55">{doc.eyebrow}</span>
        </nav>

        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-200/90 sm:text-left sm:text-xs">
          {doc.eyebrow}
        </p>
        <h1 className="section-heading-neon growth-gradient-text mb-5 max-w-4xl text-center text-[clamp(1.65rem,4.5vw,2.75rem)] leading-tight sm:text-left">
          {doc.title}
        </h1>
        <p className="mb-10 max-w-3xl text-center text-base leading-relaxed text-zinc-400 sm:text-left sm:text-lg">
          {doc.summary}
        </p>

        {Array.isArray(doc.relatedLinks) && doc.relatedLinks.length > 0 ? (
          <div className="mb-12 max-w-4xl">
            <h2 className="font-display mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200/90">
              Capability playbooks
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {doc.relatedLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group block rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 no-underline transition hover:border-rose-400/35 hover:bg-white/[0.06]"
                  >
                    <span className="font-display text-base font-semibold text-white group-hover:text-rose-100/95">
                      {item.title}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {doc.tags?.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:justify-start">
            {doc.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="max-w-3xl space-y-8 pt-10">
          {doc.sections.map((section, i) => (
            <div key={i}>
              {section.title ? (
                <h2 className="font-display mb-3 text-lg font-semibold text-white/95 sm:text-xl">{section.title}</h2>
              ) : null}
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex max-w-xl flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-14">
          <StandardCTA
            to="/free-practice-audit"
            variant="tech"
            className="!min-h-[48px] !rounded-xl !px-6 !py-3 !text-sm !font-semibold !normal-case !tracking-wide !shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_-12px_rgba(233,78,119,0.35)]"
          >
            Free practice audit
          </StandardCTA>
          <StandardCTA
            to="/contact"
            variant="outline"
            className="!min-h-[48px] !rounded-xl !border-white/25 !bg-white/[0.04] !px-6 !py-3 !text-sm !font-semibold !text-white/95 !normal-case !tracking-wide hover:!border-white/40"
          >
            Book a strategy call
          </StandardCTA>
          <Link
            to="/services"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-rose-400/40 hover:text-white"
          >
            Explore services
          </Link>
        </div>

        {doc.noIndex ? (
          <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-white/35 sm:text-left">
            Draft / legal placeholder — noindex in production per counsel
          </p>
        ) : null}
      </Container>
    </div>
  )
}

export default MarketingDocLayout
