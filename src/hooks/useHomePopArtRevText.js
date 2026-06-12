import { usePopArtScrollReveals } from './usePopArtScrollReveals'

/** Home PopArt sections — rev-text on scroll; giant letters via `setupHomePopArtMotion`. */
export function useHomePopArtRevText(introReady = true) {
  usePopArtScrollReveals({ scope: '#main', enabled: introReady })
}
