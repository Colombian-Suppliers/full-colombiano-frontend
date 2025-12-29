# Migration Guide: Vite + React to Next.js + TypeScript

This document outlines the migration from the `cosp-app` repository (Vite + React) to the `full-colombiano-frontend` repository (Next.js + TypeScript).

## Table of Contents

1. [Overview](#overview)
2. [Architecture Changes](#architecture-changes)
3. [Project Structure](#project-structure)
4. [Key Changes](#key-changes)
5. [Migration Steps](#migration-steps)
6. [Development Workflow](#development-workflow)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Overview

### From
- **Framework**: Vite + React 18
- **Language**: JavaScript (JSX)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Testing**: Vitest + Playwright

### To
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Routing**: Next.js App Router (file-based)
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand (migrated to TypeScript)
- **Testing**: Vitest + Playwright
- **Design System**: Storybook 8

## Architecture Changes

### 1. Clean Architecture Maintained

The domain-driven design and clean architecture principles have been preserved:

```
src/
├── core/
│   └── domain/
│       ├── entities/     # Domain entities (User, Product, Order)
│       └── value-objects/ # Value objects (Email, Money, Address)
├── lib/
│   ├── api/              # API layer (services, httpClient)
│   └── store/            # State management (Zustand stores)
├── components/
│   └── ui/               # Design system components
└── app/                  # Next.js App Router pages
```

### 2. Component Architecture

All UI components have been:
- Converted to TypeScript with proper type definitions
- Organized in a modular structure (Component/index.ts pattern)
- Documented with Storybook stories
- Maintained with the same styling and functionality

## Project Structure

### Old Structure (cosp-app)
```
cosp-app/
├── src/
│   ├── api/
│   ├── components/
│   ├── core/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

### New Structure (full-colombiano-frontend)
```
full-colombiano-frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/           # Design system
│   ├── core/
│   │   └── domain/       # Business logic
│   ├── lib/
│   │   ├── api/          # API services
│   │   └── store/        # State management
│   └── test/             # Test utilities
├── .storybook/           # Storybook configuration
├── next.config.js
├── tsconfig.json
└── package.json
```

## Key Changes

### 1. TypeScript Migration

All JavaScript files have been converted to TypeScript:

**Before (JavaScript)**:
```javascript
const Button = ({ children, variant = 'primary', ...props }) => {
  return <button className={clsx('btn', variant)} {...props}>{children}</button>
};
```

**After (TypeScript)**:
```typescript
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    return <button ref={ref} className={clsx('btn', variant)} {...props}>{children}</button>
  }
);
```

### 2. Routing Changes

**Before (React Router)**:
```javascript
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

**After (Next.js App Router)**:
```
app/
├── page.tsx              # / route
├── login/
│   └── page.tsx          # /login route
└── dashboard/
    └── page.tsx          # /dashboard route
```

### 3. API Client

The HTTP client has been adapted for Next.js:

- Server-side rendering support
- Proper handling of `localStorage` (client-side only)
- TypeScript interfaces for all API responses

### 4. State Management

Zustand stores migrated to TypeScript with proper typing:

```typescript
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (userData: LoginData) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;
```

### 5. Design System with Storybook

All UI components now have:
- TypeScript definitions
- Storybook stories for documentation
- Comprehensive prop types
- Usage examples

## Migration Steps

### Step 1: Install Dependencies

```bash
cd full-colombiano-frontend
npm install
```

### Step 2: Environment Configuration

Create environment files:

```bash
# .env.local (for local development)
NEXT_PUBLIC_API_URL=https://api.fullcolombiano.com
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 4: Run Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server
npm run storybook        # Start Storybook

# Building
npm run build            # Build for production
npm run start            # Start production server
npm run build-storybook  # Build Storybook

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # Run TypeScript compiler
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
```

### Code Structure Guidelines

1. **Components**: Use the folder structure pattern
   ```
   components/ui/Button/
   ├── Button.tsx
   ├── Button.stories.tsx
   └── index.ts
   ```

2. **Types**: Define interfaces for all props
   ```typescript
   export interface ComponentProps {
     // ... props
   }
   ```

3. **Exports**: Use named exports from index files
   ```typescript
   export { Button } from './Button';
   export type { ButtonProps } from './Button';
   ```

## Deployment

### Docker Build

The project includes a multi-stage Dockerfile optimized for Next.js:

```bash
# Build for staging
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api-stg.colombiansupply.com \
  --build-arg NEXT_PUBLIC_ENVIRONMENT=staging \
  -t colombian-frontend:staging .

# Build for production
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.colombiansupply.com \
  --build-arg NEXT_PUBLIC_ENVIRONMENT=production \
  -t colombian-frontend:production .
```

### Docker Compose

```bash
# Staging
docker-compose -f docker-compose.staging.yml up -d

# Production
docker-compose -f docker-compose.production.yml up -d
```

### CI/CD

The GitHub Actions workflows have been updated to:
1. Run linting and type checking
2. Run tests
3. Build the Next.js application
4. Create Docker image
5. Deploy to VPS

## Troubleshooting

### Common Issues

#### 1. Module Resolution Errors

If you see import errors, check `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 2. Hydration Errors

Next.js may show hydration errors if server and client HTML don't match. Common causes:
- Using `localStorage` during SSR
- Date/time formatting differences
- Random values in components

**Solution**: Use `useEffect` for client-only code:

```typescript
useEffect(() => {
  // Client-only code here
}, []);
```

#### 3. API Calls Failing

Ensure environment variables are prefixed with `NEXT_PUBLIC_`:

```bash
NEXT_PUBLIC_API_URL=https://api.fullcolombiano.com
```

#### 4. Storybook Not Loading Styles

Make sure Tailwind CSS is imported in `.storybook/preview.ts`:

```typescript
import '../src/app/globals.css';
```

### Performance Optimization

1. **Image Optimization**: Use Next.js `<Image>` component
2. **Code Splitting**: Automatic with Next.js App Router
3. **Font Optimization**: Use `next/font` for web fonts
4. **Bundle Analysis**: Run `npm run build` to see bundle sizes

## Next Steps

### Pending Migrations

The following areas still need to be migrated from `cosp-app`:

1. **Pages**: Convert all page components to Next.js App Router
   - Landing page
   - Authentication pages (Login, Register, etc.)
   - Dashboard pages (Buyer/Seller)
   - Product pages

2. **Layouts**: Create Next.js layouts
   - MainLayout
   - DashboardLayout
   - AuthLayout

3. **Hooks**: Migrate custom hooks
4. **Utils**: Migrate utility functions
5. **Assets**: Copy images and static files

### Recommended Approach

1. Start with simple pages (static content)
2. Move to dynamic pages (with data fetching)
3. Implement layouts
4. Add middleware for authentication
5. Optimize images and assets

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

## Support

For questions or issues during migration:
1. Check this documentation
2. Review the existing migrated code
3. Consult the team
4. Create an issue in the repository

