/**
 * Production build + zip for GoDaddy: public_html/ensembledigilabs.com
 * Output: deploy/ensembledigilabs.com-godaddy-production.zip
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const deployDir = path.join(root, 'deploy')
const zipName = 'ensembledigilabs.com-godaddy-production.zip'
const zipPath = path.join(deployDir, zipName)

console.log('Building production bundle…')
execSync('npm run build', { cwd: root, stdio: 'inherit' })

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('Build failed: dist/index.html missing')
  process.exit(1)
}

if (!fs.existsSync(path.join(dist, '.htaccess'))) {
  console.error('Missing dist/.htaccess — ensure public/.htaccess exists')
  process.exit(1)
}

/** Large local-only brand reels — keep out of GoDaddy zip (~833 MB). */
const GODADDY_EXCLUDE_VIDEOS = [
  'assets/videos/ensemble-brand-reel-primary.mp4',
  'assets/videos/ensemble-brand-reel-short.mp4',
  'assets/videos/ensemble-event-conference.mp4',
]

for (const rel of GODADDY_EXCLUDE_VIDEOS) {
  const filePath = path.join(dist, rel)
  if (!fs.existsSync(filePath)) continue
  const mb = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1)
  fs.unlinkSync(filePath)
  console.log(`Excluded from GoDaddy zip: ${rel} (${mb} MB)`)
}

fs.mkdirSync(deployDir, { recursive: true })
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath)

const isWindows = process.platform === 'win32'
if (isWindows) {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${dist}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: 'inherit' },
  )
} else {
  execSync(`cd "${dist}" && zip -r "${zipPath}" .`, { stdio: 'inherit' })
}

const stats = fs.statSync(zipPath)
console.log('')
console.log('GoDaddy production zip ready:')
console.log(`  ${zipPath}`)
console.log(`  ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
console.log('')
console.log('Upload: extract all files into public_html/ensembledigilabs.com')
console.log('URL:    https://ensembledigilabs.com')
