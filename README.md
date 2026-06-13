# Premium Digital Marketing Agency Website

A modern, high-performance website built with Vite + React, featuring premium animations and canvas effects.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Three.js** - 3D graphics
- **PixiJS** - 2D WebGL rendering
- **Theatre.js** - Animation timeline control

## Project Structure

```
src/
├── app/              # App shell and layout
├── pages/            # Page components
├── components/
│   ├── sections/     # Section components (Hero, Services, etc.)
│   └── ui/           # Reusable UI components
├── lib/              # Utilities and constants
├── animations/       # GSAP animation helpers
└── canvas/           # Three.js, PixiJS, Theatre.js components
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Git remotes

| Remote | Repository |
|--------|------------|
| **`ensemble`** | [Ensemble-Digital-Labs/ensmeblewebsite](https://github.com/Ensemble-Digital-Labs/ensmeblewebsite) — **team repo (push here)** |
| **`origin`** | [giachinh1/ensemblev2](https://github.com/giachinh1/ensemblev2) — personal fork |

```bash
git push ensemble staging   # team staging
git push ensemble main      # team main
```

## Build

```bash
npm run build
```

## Licenses & credits

See [CREDITS.md](./CREDITS.md) for third-party libraries and their licenses.

## Features

- ✅ Mobile-first responsive design (375px - 1440px)
- ✅ Lazy-loaded canvas components
- ✅ Reduced motion support
- ✅ No horizontal scrolling
- ✅ Production-ready code quality
