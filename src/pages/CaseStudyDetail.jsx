import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { caseStudies } from '../lib/content'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import CaseStudyDetailView, {
  CaseStudyDetailNotFound,
} from '../components/case-studies/CaseStudyDetailView'

function CaseStudyDetailShell({ children }) {
  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      transparentBackdrop
      className="relative z-[1] box-border min-h-screen w-full"
    >
      {children}
    </ParallaxDepth>
  )
}

function CaseStudyDetail() {
  const { slug } = useParams()
  const study = caseStudies.find((s) => s.slug === slug)

  useEffect(() => {
    const prev = document.title
    document.title = study
      ? `${study.client} · Case Study · Ensemble Digital Labs`
      : 'Case Study · Ensemble Digital Labs'
    return () => {
      document.title = prev
    }
  }, [study])

  if (!study) {
    return (
      <CaseStudyDetailShell>
        <CaseStudyDetailNotFound />
      </CaseStudyDetailShell>
    )
  }

  return (
    <CaseStudyDetailShell>
      <CaseStudyDetailView study={study} />
    </CaseStudyDetailShell>
  )
}

export default CaseStudyDetail
