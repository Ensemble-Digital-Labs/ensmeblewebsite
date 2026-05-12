import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'

function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#050816] pt-28 pb-20 text-white">
      <Container>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">404</p>
        <h1 className="section-heading-neon mb-4 text-3xl sm:text-4xl">Page not found</h1>
        <p className="mb-8 max-w-md text-zinc-400">
          This URL is not in the Ensemble build yet, or the link may be outdated.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-xl border border-teal-400/40 bg-teal-500/10 px-5 py-3 text-sm font-semibold text-teal-100 transition-colors hover:border-teal-300/60 hover:bg-teal-500/15"
        >
          Back to home
        </Link>
      </Container>
    </div>
  )
}

export default NotFound
