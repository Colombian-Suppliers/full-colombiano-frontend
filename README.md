# Full Colombiano - Frontend

Modern e-commerce platform frontend built with Next.js, TypeScript, and Tailwind CSS.

> 📚 **Documentation**: Detailed documentation has been moved to the [full-colombiano-docs](https://github.com/Colombian-Suppliers/full-colombiano-docs) repository. See the [Documentation Index](https://github.com/Colombian-Suppliers/full-colombiano-docs/blob/main/docs/DOCUMENTATION_INDEX.md) for all available documentation.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Documentation**: Storybook
- **Testing**: Vitest + Playwright
- **Code Quality**: ESLint + Prettier
- **Deployment**: Docker + GitHub Actions

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker (for containerized deployment)

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd full-colombiano-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
full-colombiano-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ui/                 # Design system components
│   │       ├── Button/
│   │       ├── Input/
│   │       ├── Card/
│   │       └── ...
│   ├── core/
│   │   └── domain/             # Domain layer (Clean Architecture)
│   │       ├── entities/       # Business entities
│   │       └── value-objects/  # Value objects
│   ├── lib/
│   │   ├── api/                # API client and services
│   │   │   ├── httpClient.ts
│   │   │   ├── config.ts
│   │   │   └── services/
│   │   └── store/              # Zustand stores
│   │       ├── authStore.ts
│   │       └── cartStore.ts
│   └── test/                   # Test utilities
├── .storybook/                 # Storybook configuration
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🎨 Design System

The project includes a comprehensive design system documented with Storybook.

### Running Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Available Components

- **Button**: Primary UI component with multiple variants
- **Input**: Text input with label, error, and validation states
- **Card**: Container component with header, content, and footer
- **Modal**: Dialog component with backdrop
- **Spinner**: Loading indicator
- **Textarea**: Multi-line text input
- **PasswordInput**: Password field with visibility toggle

## 🧪 Testing

### Unit Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### End-to-End Tests

```bash
# Install Playwright browsers
npm run e2e:install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## 🔧 Development

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

### Code Quality

The project enforces code quality through:

- **TypeScript**: Static type checking
- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks

## 🏗️ Architecture

The project follows Clean Architecture principles:

### Domain Layer

Located in `src/core/domain/`, contains:

- **Entities**: Business objects (User, Product, Order)
- **Value Objects**: Immutable objects (Email, Money, Address)

Example:

```typescript
// User Entity
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRole
  ) {}

  isSeller(): boolean {
    return this.role === 'seller';
  }
}
```

### API Layer

Located in `src/lib/api/`, handles:

- HTTP client configuration
- API service implementations
- Request/response interceptors

Example:

```typescript
// Auth Service
export const authApiService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
  },
};
```

### State Management

Using Zustand for global state:

```typescript
// Auth Store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData.user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

## 🌍 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.fullcolombiano.com
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Environment Files

- `.env.local`: Local development
- `.env.staging`: Staging environment (not committed)
- `.env.production`: Production environment (not committed)

## 🐳 Docker

### Building the Image

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

### Running with Docker Compose

```bash
# Staging
docker-compose -f docker-compose.staging.yml up -d

# Production
docker-compose -f docker-compose.production.yml up -d
```

## 🚀 Deployment

### CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

1. **Lint and Test**: Runs on every push
2. **Build**: Creates production build
3. **Docker**: Builds and pushes Docker image
4. **Deploy**: Deploys to VPS

### Manual Deployment

```bash
# 1. Build the application
npm run build

# 2. Test the production build locally
npm run start

# 3. Build Docker image
docker build -t colombian-frontend:latest .

# 4. Deploy to server
# (See deployment documentation for details)
```

## 📚 Documentation

- [Migration Guide](./MIGRATION_GUIDE.md): Guide for migrating from Vite to Next.js
- [CI/CD Documentation](./CI_CD_README.md): Continuous Integration and Deployment setup
- [Storybook](http://localhost:6006): Component documentation (run `npm run storybook`)

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass
4. Run linting and formatting
5. Create a pull request

### Commit Convention

Follow conventional commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

## 🔒 Security

- Environment variables are never committed
- Sensitive data is encrypted
- API tokens are stored securely
- HTTPS is enforced in production

## 📝 License

[Add license information]

## 👥 Team

[Add team information]

## 📞 Support

For support, email [support@fullcolombiano.com] or create an issue in the repository.

---

**Built with ❤️ by the Full Colombiano Team**

