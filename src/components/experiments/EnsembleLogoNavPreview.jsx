import EnsembleLogoNav from '../EnsembleLogoNav'

/** `/experiments` — same component as live fullscreen nav logo menu. */
export default function EnsembleLogoNavPreview(props) {
  return (
    <EnsembleLogoNav
      ariaLabel="Nav logo preview"
      iconSize={30}
      labelFontSize={8.75}
      textYLift={0}
      {...props}
    />
  )
}
