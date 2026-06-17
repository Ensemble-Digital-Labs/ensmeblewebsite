import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSitePage } from '../data/site/index.js'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import BlogArticleDetailView, {
  BlogArticleDetailNotFound,
} from '../components/blog/BlogArticleDetailView'
import { getBlogArticleBySlug } from '../lib/blogArticleDetail'

function BlogArticleDetailShell({ children }) {
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

function BlogArticleDetail() {
  const { articleSlug } = useParams()
  const doc = getSitePage(`/blog/${articleSlug}`)
  const meta = articleSlug ? getBlogArticleBySlug(articleSlug) : undefined

  useEffect(() => {
    const prev = document.title
    document.title = doc
      ? `${doc.title} · Insights · Ensemble Digital Labs`
      : 'Insights · Ensemble Digital Labs'
    return () => {
      document.title = prev
    }
  }, [doc])

  if (!doc || !meta) {
    return (
      <BlogArticleDetailShell>
        <BlogArticleDetailNotFound />
      </BlogArticleDetailShell>
    )
  }

  return (
    <BlogArticleDetailShell>
      <BlogArticleDetailView doc={doc} meta={meta} />
    </BlogArticleDetailShell>
  )
}

export default BlogArticleDetail
