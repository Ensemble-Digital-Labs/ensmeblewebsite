/** Hero-only wash + headline vignette (DNA canvas lives in `HomePageDnaCanvas`). */
export default function HomeHeroCinematicBackdrop() {
  return (
    <div
      className="home-hero-cinematic-backdrop pointer-events-none absolute inset-0 z-0 min-h-full w-full overflow-hidden"
      aria-hidden
    >
      <div className="home-hero-cinematic-backdrop__wash absolute inset-0 min-h-full w-full" />
      <div className="home-hero-cinematic-backdrop__vignette absolute inset-0 min-h-full w-full" />
    </div>
  )
}
