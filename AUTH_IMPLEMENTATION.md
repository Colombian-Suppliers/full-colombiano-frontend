# Authentication Implementation - MOCK VERSION

This document describes the authentication system implementation with mock services for local development.

## ✅ Implemented Features

### Pages

1. **Login Page** (`/login`)
   - Email and password authentication
   - "Remember me" checkbox
   - Forgot password link
   - Email verification status handling
   - Automatic role-based redirection

2. **Register Page** (`/register`)
   - Multi-step registration flow
   - Buyer registration (3 steps)
   - Seller registration - Natural person (5 steps)
   - Seller registration - Juridical person (6 steps)
   - Geographic data integration (departments/cities)
   - Form validation
   - Progress bar

### Mock Services

All services are currently using **mock data** and will need to be replaced with real API calls when the backend is ready.

#### 1. Authentication Service (`src/lib/hooks/useAuth.ts`)

```typescript
// MOCK: Simulates login with 1.5s delay
await login({ email, password, remember });

// MOCK: Simulates registration with 2s delay
await register(formData);

// MOCK: Simulates logout with 0.5s delay
await logout();
```

**Mock Behavior:**
- Always succeeds after simulated delay
- Returns mock user data
- Stores in Zustand auth store
- Persists to localStorage

#### 2. Geographic Service (`src/lib/services/geo.service.ts`)

```typescript
// MOCK: Returns Colombian departments
const departments = await geoApiService.getDepartments();

// MOCK: Returns cities for a department
const cities = await geoApiService.getCities(departmentId);
```

**Mock Data:**
- 24 Colombian departments
- Cities for major departments (Antioquia, Atlántico, Bogotá, Valle, etc.)
- 0.5s simulated delay

### State Management

**Zustand Store** (`src/lib/store/authStore.ts`)
- User data
- Authentication tokens
- Session expiration
- Remember me functionality
- Persisted to localStorage

### Utilities

1. **Toast Messages** (`src/utils/toastMessages.ts`)
   - Spanish language messages
   - Success, error, and alert messages
   - Centralized message management

2. **Toast Utils** (`src/utils/toastUtils.tsx`)
   - Wrapper for react-hot-toast
   - Consistent styling
   - Success, error, alert, info toasts

3. **Routes Config** (`src/config/routes.config.ts`)
   - Centralized route definitions
   - Type-safe route constants

## 🔄 Backend Integration TODO

When the backend is ready, replace the following:

### 1. Update `src/lib/hooks/useAuth.ts`

```typescript
// Replace mock login
const login = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  storeLogin(data, credentials.remember);
  return data;
};

// Replace mock register
const register = async (formData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  const data = await response.json();
  return data;
};
```

### 2. Update `src/lib/services/geo.service.ts`

```typescript
// Replace mock getDepartments
async getDepartments() {
  const response = await fetch('/api/geo/departments');
  return response.json();
}

// Replace mock getCities
async getCities(departmentId: string) {
  const response = await fetch(`/api/geo/cities/${departmentId}`);
  return response.json();
}
```

### 3. Add API Configuration

Create `src/lib/api/auth.service.ts`:

```typescript
import { httpClient } from './httpClient';

export const authService = {
  login: async (credentials) => {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data) => {
    const response = await httpClient.post('/auth/register', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await httpClient.post('/auth/logout');
    return response.data;
  },
};
```

## 🧪 Testing the Mock Implementation

### Test Login

1. Navigate to `http://localhost:3001/login`
2. Enter any email and password
3. Click "Iniciar sesión"
4. Wait for 1.5s simulation
5. You'll be redirected based on mock role (vendor → dashboard, customer → marketplace)

### Test Registration

1. Navigate to `http://localhost:3001/register`
2. Select account type (Buyer or Seller)
3. Fill out the multi-step form
4. Geographic data will load with 0.5s delay
5. Submit the form
6. Wait for 2s simulation
7. You'll be redirected to login page

## 📋 Registration Flow

### Buyer Flow (3 steps)
1. **Step 1:** Account type selection
2. **Step 2:** Personal information (name, document)
3. **Step 3:** Credentials (email, password, terms)

### Seller - Natural Person Flow (5 steps)
1. **Step 1:** Account type selection
2. **Step 2:** Person type selection
3. **Step 3:** Store information
4. **Step 4:** Personal information
5. **Step 5:** Credentials

### Seller - Juridical Person Flow (6 steps)
1. **Step 1:** Account type selection
2. **Step 2:** Person type selection
3. **Step 3:** Store information
4. **Step 4:** Company information
5. **Step 5:** Legal representative information
6. **Step 6:** Credentials

## 🎨 UI Components Used

All components are already migrated from `cosp-app`:

- `Button` - Primary action buttons
- `Input` - Text input fields
- `PasswordInput` - Password fields with show/hide toggle
- `FormField` - Form field wrapper with label and error
- `Card` - Container component
- `RegisterStep*` - Multi-step registration components

## 🔐 Security Notes

**Current Mock Implementation:**
- ⚠️ No real authentication
- ⚠️ No token validation
- ⚠️ No password hashing
- ⚠️ No rate limiting
- ⚠️ No CSRF protection

**When Integrating Backend:**
- ✅ Implement JWT token validation
- ✅ Add refresh token mechanism
- ✅ Implement password strength validation
- ✅ Add rate limiting
- ✅ Implement CSRF tokens
- ✅ Add email verification flow
- ✅ Implement password reset flow

## 📝 Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## 🚀 Next Steps

1. **Backend Development**
   - Create authentication endpoints
   - Implement user registration
   - Add email verification
   - Create password reset flow

2. **Frontend Integration**
   - Replace mock services with real API calls
   - Add error handling
   - Implement loading states
   - Add form validation with Zod schemas

3. **Testing**
   - Add unit tests for auth hooks
   - Add integration tests for auth flows
   - Add E2E tests with Playwright

4. **Security**
   - Implement token refresh
   - Add session management
   - Implement logout on all devices
   - Add two-factor authentication (optional)

## 📚 Related Files

- `/src/app/(auth)/login/page.tsx` - Login page
- `/src/app/(auth)/register/page.tsx` - Register page
- `/src/lib/hooks/useAuth.ts` - Auth hook (MOCK)
- `/src/lib/services/geo.service.ts` - Geographic service (MOCK)
- `/src/lib/store/authStore.ts` - Zustand auth store
- `/src/utils/toastMessages.ts` - Toast messages
- `/src/utils/toastUtils.tsx` - Toast utilities
- `/src/config/routes.config.ts` - Route constants

## 🎯 Mock vs Real Comparison

| Feature | Mock (Current) | Real (TODO) |
|---------|---------------|-------------|
| Login | Simulated delay, always succeeds | Real API call, validation |
| Register | Simulated delay, always succeeds | Real API call, email verification |
| Logout | Clears local state | Invalidates server session |
| Departments | Hardcoded list | API endpoint |
| Cities | Hardcoded list | API endpoint |
| Tokens | Mock JWT string | Real JWT with expiration |
| Validation | Client-side only | Client + Server validation |
| Errors | Generic messages | Specific API error codes |

---

**Status:** 🟡 Mock Implementation - Ready for Backend Integration

**Last Updated:** December 29, 2025

