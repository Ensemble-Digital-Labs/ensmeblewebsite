import { useMemo, useState } from 'react'
import Container from '../components/ui/Container'
import CaseStudyImpactCard from '../components/case-studies/CaseStudyImpactCard'
import CaseStudyFilterBar from '../components/case-studies/CaseStudyFilterBar'
import { caseStudies, caseStudyFilters } from '../lib/content'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import { BackgroundPathsParallaxLayer } from '../components/ui/BackgroundPaths'
import { cn } from '../lib/utils'

const PAGE_SIZE = 6

function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)

  const filteredStudies = useMemo(() => {
    const list =
      activeFilter === 'All'
        ? [...caseStudies]
        : caseStudies.filter(
            (study) =>
              study.category === activeFilter ||
              study.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())),
          )

    list.sort((a, b) =>
      sortOrder === 'newest' ? b.id - a.id : a.id - b.id,
    )
    return list
  }, [activeFilter, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredStudies.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageStudies = filteredStudies.slice(
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
        <header className="mx-auto max-w-3xl text-center" aria-label="Case studies">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
            Our work
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/72 sm:text-lg">
            Outcomes from healthcare practices we have helped grow — filter by discipline or
            explore the full portfolio.
          </p>
        </header>

        <section className="mt-10 px-0 sm:mt-12 lg:mt-14" aria-label="Case study listings">
          <CaseStudyFilterBar
            filters={caseStudyFilters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            dark
          />

          {pageStudies.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:gap-x-8">
              {pageStudies.map((study) => (
                <CaseStudyImpactCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-white/65">No case studies match this filter.</p>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Case study pagination"
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

export default CaseStudies
