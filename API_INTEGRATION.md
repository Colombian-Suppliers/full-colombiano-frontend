# API Integration Guide

## 🔗 Frontend-Backend Integration

This document explains how the frontend integrates with the backend API and maintains type safety.

## 📋 Table of Contents

- [Overview](#overview)
- [Type Generation](#type-generation)
- [API Client](#api-client)
- [Usage Examples](#usage-examples)
- [CI/CD Integration](#cicd-integration)
- [Development Workflow](#development-workflow)

## Overview

The frontend uses **automatic type generation** from the backend's OpenAPI schema to ensure type safety and contract consistency between frontend and backend.

### Key Benefits

✅ **Type Safety**: TypeScript types are automatically generated from OpenAPI schema  
✅ **Contract Sync**: Frontend always knows about backend API changes  
✅ **Auto-completion**: Full IDE support for API calls  
✅ **Error Prevention**: Compile-time errors for API mismatches  
✅ **Documentation**: Types serve as living documentation  

## Type Generation

### How It Works

1. Backend exposes OpenAPI schema at `/openapi.json`
2. Frontend script fetches the schema
3. `openapi-typescript` generates TypeScript types
4. Types are saved to `src/types/api.ts`
5. API client uses these types for all requests

### Manual Generation

```bash
# Generate types from local backend
npm run generate:api-types

# Generate types from specific backend URL
NEXT_PUBLIC_API_URL=https://api-staging.fullcolombiano.com npm run generate:api-types
```

### Automatic Generation

Types are automatically generated:
- ✅ Before every build (`npm run build`)
- ✅ Daily via GitHub Actions (2 AM)
- ✅ When backend triggers update webhook
- ✅ Manually via GitHub Actions workflow

## API Client

### Location

`src/lib/api-client.ts` - Type-safe API client

### Features

- ✅ Automatic JWT token injection
- ✅ Request/response interceptors
- ✅ Error handling
- ✅ Automatic redirect on 401
- ✅ Full TypeScript support

### Configuration

```typescript
// .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Usage

```typescript
import { api } from '@/lib/api-client';

// All methods are fully typed!
const response = await api.auth.login({
  username: 'user@example.com',
  password: 'password123'
});

// TypeScript knows the response type
console.log(response.token); // ✅ Type-safe
console.log(response.invalid); // ❌ TypeScript error
```

## Usage Examples

### Authentication

```typescript
import { api } from '@/lib/api-client';

// Login
const loginResponse = await api.auth.login({
  username: 'admin@fullcolombiano.com',
  password: 'Admin123!'
});

// Save token
localStorage.setItem('auth_token', loginResponse.token);

// Register
const registerResponse = await api.auth.register({
  email: 'newuser@example.com',
  password: 'SecurePass123!',
  first_name: 'John',
  last_name: 'Doe',
  role: 'customer',
  accept_terms: true,
  accept_privacy: true
});

// Get current user
const user = await api.auth.getCurrentUser();
console.log(user.email, user.role);
```

### Products

```typescript
import { api } from '@/lib/api-client';

// List products with filters
const products = await api.products.list({
  page: 1,
  per_page: 20,
  search: 'laptop',
  min_price: 100,
  max_price: 1000
});

// Get single product
const product = await api.products.getById(123);

// Create product (vendor only)
const newProduct = await api.products.create({
  name: 'New Product',
  price: 99.99,
  description: 'Product description',
  // ... all fields are typed!
});
```

### Orders

```typescript
import { api } from '@/lib/api-client';

// Create order
const order = await api.orders.create({
  items: [
    {
      product_id: 1,
      quantity: 2,
      price: 99.99
    }
  ],
  shipping_first_name: 'John',
  shipping_last_name: 'Doe',
  shipping_address_line_1: 'Calle 123',
  shipping_city: 'Bogotá',
  shipping_department: 'Cundinamarca',
  shipping_phone: '3001234567',
  payment_method: 'credit_card'
});

// List orders
const orders = await api.orders.list({
  page: 1,
  order_status: 'pending'
});
```

### Geographic Data

```typescript
import { api } from '@/lib/api-client';

// Get departments
const departments = await api.geo.getDepartments();

// Get cities by department
const cities = await api.geo.getCities('Cundinamarca');

// Get store categories
const categories = await api.geo.getStoreCategories();
```

## CI/CD Integration

### GitHub Actions Workflow

Located at `.github/workflows/generate-api-types.yml`

#### Triggers

1. **Repository Dispatch**: Backend can trigger update
   ```bash
   curl -X POST \
     -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/OWNER/REPO/dispatches \
     -d '{"event_type":"backend-updated"}'
   ```

2. **Manual Trigger**: Via GitHub Actions UI

3. **Scheduled**: Daily at 2 AM

#### What It Does

1. Fetches latest OpenAPI schema from staging/production
2. Generates new TypeScript types
3. Creates Pull Request if types changed
4. Notifies team of API changes

### Backend Integration

Add this to backend CI/CD after deployment:

```yaml
# Backend .github/workflows/deploy.yml
- name: Notify Frontend of API Changes
  run: |
    curl -X POST \
      -H "Authorization: token ${{ secrets.FRONTEND_REPO_TOKEN }}" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/repos/Colombian-Suppliers/full-colombiano-frontend/dispatches \
      -d '{"event_type":"backend-updated"}'
```

## Development Workflow

### 1. Backend Changes API

```bash
# Backend developer makes changes
cd full-colombiano-backend
# ... modify endpoints ...
git commit -m "feat: add new endpoint"
git push
```

### 2. Types Auto-Update

```bash
# GitHub Actions automatically:
# 1. Detects backend deployment
# 2. Generates new types
# 3. Creates PR with changes
```

### 3. Frontend Developer Reviews

```bash
# Frontend developer:
# 1. Reviews PR with type changes
# 2. Checks for breaking changes
# 3. Updates code if needed
# 4. Merges PR
```

### 4. Use New Types

```typescript
// New types are immediately available
import { api } from '@/lib/api-client';

// New endpoint with full type support
const result = await api.newFeature.doSomething();
```

## Error Handling

### API Client Errors

```typescript
import { api } from '@/lib/api-client';
import { AxiosError } from 'axios';

try {
  const user = await api.auth.getCurrentUser();
} catch (error) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      // (automatically handled by interceptor)
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access denied');
    } else {
      // Other errors
      console.error('API Error:', error.response?.data);
    }
  }
}
```

### Type Errors

```typescript
// TypeScript will catch these at compile time:

// ❌ Wrong field name
await api.auth.login({
  email: 'test@example.com',  // Error: should be 'username'
  password: '123'
});

// ❌ Missing required field
await api.products.create({
  name: 'Product'  // Error: 'price' is required
});

// ❌ Wrong type
await api.orders.list({
  page: '1'  // Error: should be number, not string
});
```

## Best Practices

### 1. Always Use Generated Types

```typescript
// ✅ Good - uses generated types
import { api } from '@/lib/api-client';
const user = await api.auth.getCurrentUser();

// ❌ Bad - manual axios call without types
import axios from 'axios';
const user = await axios.get('/api/v1/auth/me');
```

### 2. Regenerate Types After Backend Changes

```bash
# After pulling backend changes
npm run generate:api-types
```

### 3. Check Types Before Committing

```bash
npm run type-check
```

### 4. Handle Errors Gracefully

```typescript
try {
  const data = await api.someEndpoint();
  // Handle success
} catch (error) {
  // Handle error
  toast.error('Something went wrong');
}
```

### 5. Use Environment Variables

```typescript
// ✅ Good
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ❌ Bad
const API_URL = 'http://localhost:8000';
```

## Troubleshooting

### Types Not Updating

```bash
# 1. Check backend is running
curl http://localhost:8000/openapi.json

# 2. Regenerate types
npm run generate:api-types

# 3. Restart dev server
npm run dev
```

### Type Errors After Backend Update

```bash
# 1. Pull latest changes
git pull

# 2. Regenerate types
npm run generate:api-types

# 3. Fix any breaking changes in code
# 4. Run type check
npm run type-check
```

### API Client Not Working

```bash
# 1. Check environment variables
cat .env.local

# 2. Verify backend URL
echo $NEXT_PUBLIC_API_URL

# 3. Test backend directly
curl http://localhost:8000/health
```

## Additional Resources

- [Backend API Documentation](http://localhost:8000/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [Axios Documentation](https://axios-http.com/)

