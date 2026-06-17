import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateWebp } from './scripts/generate-webp.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Generate WebP siblings from PNG/JPEG in `public/` before dev + production builds. */
function ensembleWebpPlugin() {
  let generated = false
  return {
    name: 'ensemble-webp',
    async buildStart() {
      if (generated) return
      await generateWebp({ quiet: true })
      generated = true
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ensembleWebpPlugin(), react()],
  resolve: {
    alias: [
      {
        find: '@/components/ui/card',
        replacement: path.resolve(__dirname, 'src/components/ui/Card.jsx'),
      },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('three/examples')) return 'three'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/locomotive-scroll')) return 'scroll'
          if (id.includes('node_modules/pixi.js')) return 'pixi'
          if (id.includes('node_modules/@tsparticles') || id.includes('node_modules/tsparticles')) {
            return 'particles'
          }
          if (id.includes('node_modules/hls.js')) return 'hls'
          if (id.includes('node_modules/swiper')) return 'swiper'
          if (id.includes('node_modules/react-router')) return 'router'
        },
      },
    },
  },
})
