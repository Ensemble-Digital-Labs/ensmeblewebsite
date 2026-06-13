/** DNA Capital–style portfolio filter dimensions for `/case-studies`. */

export const CASE_STUDY_DISCIPLINE_OPTIONS = ['All', 'Healthcare', 'Web', 'Marketing', 'SEO']

export const CASE_STUDY_CAPABILITY_OPTIONS = [
  'All',
  'HIPAA',
  'SEO',
  'PPC',
  'AI',
  'Branding',
  'Booking',
]

export const CASE_STUDY_OUTCOME_OPTIONS = [
  'All',
  'Patient acquisition',
  'Web & brand',
  'Launch & growth',
]

export const CASE_STUDY_FILTER_GROUPS = [
  { id: 'discipline', label: 'Discipline', options: CASE_STUDY_DISCIPLINE_OPTIONS },
  { id: 'capability', label: 'Capability', options: CASE_STUDY_CAPABILITY_OPTIONS },
  { id: 'outcome', label: 'Outcome', options: CASE_STUDY_OUTCOME_OPTIONS },
]

export function getCaseStudyOutcome(study) {
  const label = `${study.primaryMetric?.label ?? ''} ${study.primaryMetric?.value ?? ''}`.toLowerCase()
  if (study.tags?.includes('Branding') || study.category === 'Web') return 'Web & brand'
  if (label.includes('launch') || label.includes('60 day')) return 'Launch & growth'
  return 'Patient acquisition'
}

export function filterCaseStudies(studies, filters) {
  const { discipline = 'All', capability = 'All', outcome = 'All' } = filters

  return studies.filter((study) => {
    if (discipline !== 'All' && study.category !== discipline) return false

    if (
      capability !== 'All' &&
      !study.tags?.some((tag) => tag.toLowerCase() === capability.toLowerCase())
    ) {
      return false
    }

    if (outcome !== 'All' && getCaseStudyOutcome(study) !== outcome) return false

    return true
  })
}
