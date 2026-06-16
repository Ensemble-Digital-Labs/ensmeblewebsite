import EnsembleLogoNavPreview from '../components/experiments/EnsembleLogoNavPreview'
import EnsembleLogoMark from '../components/experiments/EnsembleLogoMark'
import '../styles/experiments-logo.css'
import '../styles/experiments-logo-nav-preview.css'

/** Logo lab — nav cards + icons on exact SVG geometry (preview only). */
export default function Experiments() {
  return (
    <section className="experiments-logo-lab" aria-label="Ensemble logo experiments">
      <div className="experiments-logo-lab__inner">
        <header className="experiments-logo-lab__header">
          <p className="experiments-logo-lab__eyebrow">Logo geometry lab</p>
          <h1 className="experiments-logo-lab__title">Nav cards on SVG mark</h1>
          <p className="experiments-logo-lab__subtitle">
            Six nav tiles with icons on the official path slices — preview only, not live in the menu yet.
          </p>
        </header>

        <article className="experiments-logo-lab__panel experiments-logo-lab__panel--hero">
          <p className="experiments-logo-lab__label">Nav preview (icons + labels)</p>
          <EnsembleLogoNavPreview />
        </article>

        <div className="experiments-logo-lab__compare experiments-logo-lab__compare--compact">
          <article className="experiments-logo-lab__panel">
            <p className="experiments-logo-lab__label">Reference SVG</p>
            <EnsembleLogoMark />
          </article>
        </div>
      </div>
    </section>
  )
}
