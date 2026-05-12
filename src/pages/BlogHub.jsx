import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import { blogArticleSummaries } from '../data/site/index.js'

/** `/blog` — article index from sitemap v2 (theme matches home dark sections). */
function BlogHub() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(34,211,238,0.1)_0%,transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-[1] pb-20 pt-24 sm:pt-28">
        <nav className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          <Link to="/" className="hover:text-cyan-200/90">
            Home
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-white/55">Blog</span>
        </nav>

        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90 sm:text-left sm:text-xs">
          Insights
        </p>
        <h1 className="section-heading-neon mb-4 text-center text-[clamp(1.75rem,5vw,2.85rem)] leading-tight sm:text-left">
          AI healthcare marketing insights
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-zinc-400 sm:mx-0 sm:text-left sm:text-lg">
          SEO guides, patient acquisition, HIPAA compliance, and AI strategy — written for operators building modern practices.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link
            to="/blog/category/ai-healthcare-technology"
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            AI & healthcare technology
          </Link>
          <Link
            to="/blog/category/hipaa-compliance"
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            HIPAA & compliance
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogArticleSummaries.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/blog/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display mb-2 text-lg font-semibold leading-snug text-white group-hover:text-rose-100 sm:text-xl">
                  {a.title}
                </h2>
                <p className="mt-auto text-sm leading-relaxed text-zinc-500">{a.excerpt}</p>
                <span className="mt-4 text-xs font-semibold text-teal-300/90">Read article →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

export default BlogHub
