# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio/resume website built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features animated loading sequences, theme switching, and responsive design.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Application Structure

- **Next.js App Router**: Uses the App Router pattern with route-based pages in `src/app/`
- **Component Organization**:
  - `src/components/site/`: Main site components (home, projects, navbar, contact)
  - `src/components/loaders/`: Loading animations (TerminalLoader, DigitalCascade, LoadingManager, ContentRevealer)
  - `src/components/theme/`: Theme system (ThemeProvider, theme toggle)
  - `src/components/ui/`: shadcn/ui components (Button, Card, Badge, etc.)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming, custom animations in `src/styles/animations.css`

### Loading Animation System

The app uses a multi-stage loading sequence managed by `LoadingManager`:

1. **TerminalLoader**: Initial terminal-style loading screen with progress bar and typing animation
2. **DigitalCascade**: Transition effect with "digital rain" animation
3. **ContentRevealer**: Staggered fade-in for page content

The loading sequence is session-based - uses `sessionStorage` to show animations only on first visit per session. LoadingManager redirects non-homepage routes to "/" after loading completes.

### Theme System

- Custom ThemeProvider supporting "light", "dark", and "system" themes
- Theme state managed via React Context (`useTheme` hook)
- CSS variables in `globals.css` using OKLCH color space
- Dark mode class applied to `html` element

### Framer Motion Integration

Extensive use of framer-motion for animations:
- `ContentRevealer`: Wrapper component for fade-in animations with configurable delay/duration
- Projects page: Scroll-triggered animations with different behavior for mobile (whileInView) vs desktop (inactive/hover states)
- Home page: Staggered animations for skills, cards, and sections

### UI Component Pattern

Uses shadcn/ui pattern:
- Components in `src/components/ui/` built on Radix UI primitives
- `cn()` utility in `src/lib/utils.ts` combines clsx and tailwind-merge for className handling
- Consistent variant-based styling with class-variance-authority

### Routing

- `/` - Home page (biography, skills, featured projects)
- `/projects` - Full projects showcase with animated cards
- `/about` - About and contact information
- Navigation handled by `Navbar` component with mobile responsive menu

## Key Implementation Details

### Projects Component

- Detects mobile vs desktop via `useState` and resize listener
- On mobile: Uses `whileInView` with `once: false` for scroll-triggered animations
- On desktop: Uses `inactive`/`hover` states for interactive card animations
- Each project has a gradient "splash" background with custom clip-path SVG
- Color scheme per project using HSL color generation

### Navbar

- Responsive design with mobile hamburger menu
- Theme toggle integrated
- Uses Radix UI Navigation Menu for desktop, Sheet for mobile

### TypeScript

- Strict typing throughout
- Interface definitions for component props
- Type imports from `next`, `react`, `framer-motion`

## Styling Conventions

- Tailwind CSS v4 with `@import "tailwindcss"` and `@import "tw-animate-css"`
- Custom theme using `@theme inline` directive
- Dark mode variants with `@custom-variant dark (&:is(.dark *))`
- Responsive breakpoints: mobile-first approach
- Custom animations defined in `src/styles/animations.css`
- Color transitions use `color-transition` class

## Important Notes

- Next.js runs with Turbopack in development (`--turbopack` flag)
- Uses Geist Sans and Geist Mono fonts from Google Fonts
- `suppressHydrationWarning` on `<html>` element for theme system
- Loading animations have configurable timing (minDisplayTime, duration props)
- SessionStorage used for tracking first-time loading animation display
