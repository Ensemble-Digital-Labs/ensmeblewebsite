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
})
