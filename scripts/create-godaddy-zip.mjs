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
