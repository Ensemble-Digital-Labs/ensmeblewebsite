import { useMemo, useState } from 'react'
import Container from '../components/ui/Container'
import BlogImpactCard from '../components/blog/BlogImpactCard'
import CaseStudyFilterBar from '../components/case-studies/CaseStudyFilterBar'
import { blogArticleSummaries } from '../data/site/index.js'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'
import { cn } from '../lib/utils'

const PAGE_SIZE = 6

const BLOG_FILTERS = [
  'All',
  ...Array.from(
    new Set(blogArticleSummaries.flatMap((article) => article.tags)),
  ).sort(),
]

/** `/blog` — insights index; atmosphere + layout aligned with `/case-studies`. */
function BlogHub() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)

  const filteredArticles = useMemo(() => {
    const list =
      activeFilter === 'All'
        ? [...blogArticleSummaries]
        : blogArticleSummaries.filter((article) => article.tags.includes(activeFilter))

    list.sort((a, b) => {
      const order =
        blogArticleSummaries.findIndex((item) => item.slug === a.slug) -
        blogArticleSummaries.findIndex((item) => item.slug === b.slug)
      return sortOrder === 'newest' ? order : -order
    })
    return list
  }, [activeFilter, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageArticles = filteredArticles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setPage(1)
  }

  const handleSortChange = (order) => {
    setSortOrder(order)
    setPage(1)
  }

  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      layer1={<BackgroundPathsParallaxLayer tone="dark" pathsOnly />}
      className="relative z-[1] box-border min-h-screen min-h-[100svh] w-full pb-16 pt-24 text-white sm:pb-20 sm:pt-28 md:pt-32"
    >
      <Container>
        <header className="mx-auto max-w-3xl text-center" aria-label="Blog insights">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
            Insights
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
            AI healthcare marketing insights
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/72 sm:text-lg">
            SEO guides, patient acquisition, HIPAA compliance, and AI strategy — written for
            operators building modern practices.
          </p>
        </header>

        <section className="mt-10 px-0 sm:mt-12 lg:mt-14" aria-label="Blog articles">
          <CaseStudyFilterBar
            filters={BLOG_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            dark
          />

          {pageArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:gap-x-8">
              {pageArticles.map((article) => (
                <BlogImpactCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-white/65">No articles match this filter.</p>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Blog pagination"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    'flex h-11 min-w-[2.75rem] items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#14122a]',
                    n === safePage
                      ? 'bg-white text-[#14122a]'
                      : 'border border-white/20 bg-white/[0.06] text-white hover:border-white/35',
                  )}
                  aria-current={n === safePage ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </nav>
          )}
        </section>
      </Container>
    </ParallaxDepth>
  )
}

export default BlogHub
