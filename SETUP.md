# Setup Instructions

## Installation

Run the following command to install all dependencies:

```bash
npm install
```

## Dependencies List

### Production Dependencies
- `react` (^18.2.0) - React UI library
- `react-dom` (^18.2.0) - React DOM renderer
- `gsap` (^3.12.5) - Animation library
- `three` (^0.161.0) - 3D graphics library
- `pixi.js` (^7.3.3) - 2D WebGL rendering
- `@theatre/core` (^0.7.3) - Animation timeline control
- `@theatre/r3f` (^0.7.3) - Theatre.js React Three Fiber integration

### Development Dependencies
- `@types/react` (^18.2.55) - TypeScript types for React
- `@types/react-dom` (^18.2.19) - TypeScript types for React DOM
- `@vitejs/plugin-react` (^4.2.1) - Vite React plugin
- `autoprefixer` (^10.4.17) - CSS autoprefixer
- `postcss` (^8.4.35) - CSS post-processor
- `tailwindcss` (^3.4.1) - Utility-first CSS framework
- `vite` (^5.1.0) - Build tool and dev server

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

✅ Mobile-first responsive design (375px - 1440px)
✅ Lazy-loaded canvas components (Three.js, PixiJS)
✅ Reduced motion support (respects `prefers-reduced-motion`)
✅ No horizontal scrolling at any breakpoint
✅ Production-ready code quality
✅ Clean, maintainable architecture
