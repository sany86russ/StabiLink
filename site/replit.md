# StabiLink Landing Page

## Overview

StabiLink is a modern single-page landing website built with React and Express.js. The application provides a platform for users to access services without restrictions, featuring a sleek design with light/dark theme support and animated elements. The site includes subscription functionality for users to sign up for services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Animation**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas for request/response validation

### Component Structure
- Modern flat design with 2025 aesthetics
- Responsive design for all screen sizes
- Custom animated components (NetworkCanvas, TypewriterText, AnimatedCounter)
- Theme switching (light/dark mode)
- Scroll-triggered reveal animations

## Key Components

### Frontend Components
1. **Landing Page (`/pages/home.tsx`)**
   - Hero section with animated network background
   - Typewriter text animation
   - Pricing section with toggle
   - Subscription form
   - User counter display
   - Testimonials and features

2. **Custom UI Components**
   - `NetworkCanvas`: Interactive particle network background
   - `TypewriterText`: Animated typing effect
   - `AnimatedCounter`: Number counting animation
   - `ScrollReveal`: Scroll-triggered animations
   - `ThemeProvider`: Light/dark theme management

3. **UI Library**: Complete shadcn/ui component set including buttons, forms, cards, dialogs, and more

### Backend API Endpoints
1. **POST /api/subscribe**: User subscription endpoint
2. **GET /api/users-count**: Returns current subscriber count

### Database Schema
- **users**: User authentication (id, username, password)
- **subscriptions**: User subscriptions (id, name, email, createdAt)

## Data Flow

1. **User Subscription Flow**:
   - User fills subscription form
   - Form validation using Zod schemas
   - POST request to `/api/subscribe`
   - Data stored in PostgreSQL via Drizzle ORM
   - Success/error feedback via toast notifications

2. **User Count Display**:
   - Real-time counter fetched from `/api/users-count`
   - Animated counter component displays subscriber count
   - Starts with ~12,000 base subscribers

3. **Theme Management**:
   - Theme state managed in React context
   - Persisted to localStorage
   - CSS variables updated dynamically

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Framework**: Radix UI primitives via shadcn/ui
- **Animation**: Framer Motion
- **Validation**: Zod
- **Fonts**: Inter font family from Google Fonts

### Development Tools
- **ORM**: Drizzle with drizzle-kit for migrations
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `drizzle-kit push`

### Environment Setup
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Development Mode
- Vite dev server with HMR
- Express server with auto-restart
- Integrated development experience

### Production Mode
- Static file serving from `dist/public`
- Express server serves API and static files
- Database migrations auto-applied

### Deployment Considerations
- Designed for Replit environment
- Includes Replit-specific plugins and configurations
- Development banner for external access
- Runtime error overlay for debugging

## Key Features

1. **Modern Design**: Flat-futurism style with neon accents
2. **Responsive**: Works on all device sizes
3. **Animated**: Smooth transitions and scroll animations
4. **Accessible**: Proper ARIA labels and keyboard navigation
5. **Fast**: Optimized build with code splitting
6. **Type-Safe**: Full TypeScript coverage
7. **Scalable**: Modular component architecture