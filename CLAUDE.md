# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Errands portfolio showcase built with React, TypeScript, Vite, and shadcn/ui. It's a single-page application with routing for portfolio display, project details, and a dashboard. The project was created with Lovable (https://lovable.dev) and features smooth scrolling interactions and 3D graphics.

## Development Commands

### Running the Project
```bash
# Frontend only
npm run dev          # Start Vite dev server on port 8080

# Backend only
npm run server       # Start Express API server on port 3001

# Full Stack Development (recommended)
npm run dev:fullstack # Start both frontend and backend concurrently

# Production
npm run build        # Build frontend for production
npm start            # Start production server (serves built frontend + API)

# Other commands
npm run build:dev    # Development build (includes development mode tooling)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend & Database

**API Server:**
- Express.js server running on port 3001
- SQLite database (`server/database.sqlite`)
- RESTful API endpoints at `/api/*`

**Database Schema:**
- `projects` - Portfolio projects (id, title, description, image, category, created_at)
- `videos` - Video gallery items (id, title, url, description, created_at)
- `contacts` - Contact form submissions (id, name, email, message, created_at)

**API Endpoints:**
```
Projects:
GET    /api/projects     - Get all projects
GET    /api/projects/:id - Get single project
POST   /api/projects     - Create project
PUT    /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project

Videos:
GET    /api/videos       - Get all videos
GET    /api/videos/:id   - Get single video
POST   /api/videos       - Create video
PUT    /api/videos/:id   - Update video
DELETE /api/videos/:id   - Delete video

Contacts:
GET    /api/contacts     - Get all contacts
POST   /api/contacts     - Create contact
DELETE /api/contacts/:id - Delete contact
```

**API Client:**
All API calls are centralized in `src/lib/api.ts` with TypeScript types.
The frontend uses TanStack Query for data fetching and caching.

## Architecture

### Routing Structure
The app uses React Router with the following routes (defined in `src/App.tsx`):
- `/` - Main portfolio page (Index)
- `/project/:id` - Individual project detail page
- `/dashboard` - Dashboard page
- `*` - 404 Not Found page

**Important**: All custom routes must be added ABOVE the catch-all `*` route in `src/App.tsx`.

### Global Providers
The application is wrapped with these providers (in order):
1. `QueryClientProvider` - TanStack Query for data fetching
2. `TooltipProvider` - shadcn/ui tooltips
3. `BrowserRouter` - React Router
4. Toast notifications via both Radix UI Toaster and Sonner

### Page Structure
The main landing page (`src/pages/Index.tsx`) is composed of sections in this order:
1. `ScrollingBackground3D` - Fixed 3D background with scroll-reactive logo
2. `Navigation` - Top navigation bar
3. `Hero` - Hero section
4. `About` - About section
5. `Projects` - Projects showcase
6. `Videos` - Video gallery
7. `Contact` - Contact form/information
8. `Footer` - Footer

### Key Features

#### Smooth Scrolling
The project uses Lenis for smooth scrolling. The `useLenis` hook (`src/hooks/useLenis.ts`) is initialized in the Index page and provides:
- 1.2s scroll duration
- Custom easing function
- Synchronized with requestAnimationFrame
- Mobile-optimized touch scrolling

#### 3D Background
`ScrollingBackground3D.tsx` renders an animated 3D logo using React Three Fiber that:
- Rotates based on scroll position (4 full rotations over page height)
- Has three layered meshes for depth effect
- Uses custom shaders to make white/light backgrounds transparent
- Includes glow effects with colors `#6366f1` (indigo) and `#8b5cf6` (violet)
- Fixed position, pointer-events disabled, 40% opacity

### Styling & Design System

#### Theme Configuration
All design tokens are defined in `src/index.css` using CSS custom properties:
- Colors defined as HSL values (no `hsl()` wrapper in definitions)
- Both light and dark mode color schemes
- Custom gradients: `--gradient-primary`, `--gradient-accent`, `--gradient-hero`
- Shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`
- Transition: `--transition-smooth`

#### Color Palette
- Primary: Rose/coral tones (355° hue)
- Accent: Blue tones (210° hue)
- Background (light): White
- Background (dark): Deep blue-gray

#### Component Library
Uses shadcn/ui components extensively. All UI components are in `src/components/ui/`. The project includes the full shadcn/ui component set.

### Path Aliases
The `@` alias maps to `./src/` and is configured in:
- `vite.config.ts`
- `tsconfig.json`

Use `@/` for all imports within src (e.g., `@/components/Hero`).

### TypeScript Configuration
Notable compiler options in `tsconfig.json`:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`
- `allowJs: true`

The project has relaxed TypeScript strictness, but prefer type-safe code when making changes.

### Asset Management
Images and assets are imported directly in components (e.g., `errandsLogo` in `ScrollingBackground3D.tsx`). Assets are stored in `src/assets/`.

## Working with 3D Graphics

When modifying `ScrollingBackground3D.tsx`:
- The component uses Three.js via `@react-three/fiber`
- Scroll position is tracked with native `window.scrollY` events
- Animation loop uses `useFrame` from React Three Fiber
- Custom shader materials are used for transparency effects
- Always test scroll performance on both desktop and mobile

## Common Patterns

### Adding New Sections to Landing Page
1. Create component in `src/components/`
2. Import and add to `src/pages/Index.tsx` in the appropriate position
3. Ensure it's inside the `relative z-10` wrapper div (content above 3D background)

### Creating New Routes
1. Add route component to `src/pages/`
2. Import in `src/App.tsx`
3. Add `<Route>` element ABOVE the `*` catch-all route

### Using Design Tokens
Prefer using Tailwind classes that reference CSS custom properties (e.g., `bg-primary`, `text-foreground`) over hardcoded colors. Use utility classes like `gradient-hero` for custom gradients.

## Deployment

### Production Build
1. Build the frontend: `npm run build`
2. The production server will serve both the built frontend and API: `npm start`
3. Set environment variable `NODE_ENV=production`

### Environment Variables
- `PORT` - Server port (default: 3001)
- `VITE_API_URL` - API base URL for frontend (default: http://localhost:3001/api)

### Hosting Considerations
- The SQLite database file (`server/database.sqlite`) persists data locally
- For cloud deployment, consider:
  - Using a persistent volume for the database
  - Or migrating to PostgreSQL/MySQL for production
- The built app is a single Node.js server serving both frontend and API
- Deploy as a standard Node.js application
