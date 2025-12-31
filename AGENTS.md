# Repository Guidelines

## Scope and layout
- This AGENTS.md applies to `full-colombiano-frontend/` and below.
- Key directories: `src/app/` (routes), `src/components/` (UI), `src/core/domain/` (domain layer), `src/lib/api/` (API clients), `src/lib/store/` (Zustand), `.storybook/` (Storybook), `public/` (static assets).

## Build, Test, and Development Commands
- Install: `npm install`.
- Dev server: `npm run dev` (http://localhost:3000).
- Build + run: `npm run build` then `npm run start`.
- Quality: `npm run lint`, `npm run type-check`, `npm run format`.
- Tests: `npm run test`, `npm run test:e2e` (run `npm run e2e:install` once), `npm run storybook` for UI docs.

## Coding Style & Naming Conventions
- TypeScript + Tailwind; 2-space indent with Prettier/ESLint as source of truth.
- PascalCase component filenames, camelCase hooks/utils, kebab-case assets.
- Keep domain rules in `src/core/domain/` and API access in `src/lib/api/`.

## Testing Guidelines
- Unit tests use Vitest; prefer focused tests for domain and UI logic.
- E2E tests use Playwright and follow `playwright.config.ts`.

## Environment & Security Notes
- Use `.env.local` with `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_ENVIRONMENT`, `NEXT_PUBLIC_SITE_URL`.
- Do not commit secrets; only public values should use `NEXT_PUBLIC_`.
