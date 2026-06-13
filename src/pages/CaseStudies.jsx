import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CaseStudiesV2DnaCanvas from '../components/case-studies-v2/CaseStudiesV2DnaCanvas'
import CaseStudyPortfolioFilters from '../components/case-studies/CaseStudyPortfolioFilters'
import CaseStudyPortfolioGalleryV2 from '../components/case-studies-v2/CaseStudyPortfolioGalleryV2'
import { useCaseStudiesGalleryFiltersIntro } from '../hooks/useCaseStudiesGalleryIntro'
import { caseStudies } from '../lib/content'
import { filterCaseStudies } from '../lib/caseStudiesPortfolioFilters'
import '../styles/case-studies-portfolio.css'
import '../styles/case-studies-portfolio-v2.css'

const DEFAULT_FILTERS = {
  discipline: 'All',
  capability: 'All',
  outcome: 'All',
}

function CaseStudies() {
  const location = useLocation()
  const pageReplayKey = location.key
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filteredStudies = useMemo(
    () => filterCaseStudies(caseStudies, filters),
    [filters],
  )

  const handleFilterChange = (groupId, value) => {
    setFilters((prev) => ({ ...prev, [groupId]: value }))
  }

  useCaseStudiesGalleryFiltersIntro(pageReplayKey)

  return (
    <div
      id="case-studies-portfolio"
      className="case-studies-portfolio case-studies-portfolio-v2"
    >
      <CaseStudiesV2DnaCanvas />

      <section
        className="case-studies-portfolio__stage case-studies-portfolio-v2__stage"
        aria-label="Case Studies Gallery"
      >
        <h1 className="case-studies-portfolio__page-heading">CASE STUDIES GALLERY</h1>
        <CaseStudyPortfolioFilters filters={filters} onChange={handleFilterChange} variant="dropdown" />
        <CaseStudyPortfolioGalleryV2 studies={filteredStudies} />
      </section>
    </div>
  )
}

export default CaseStudies
