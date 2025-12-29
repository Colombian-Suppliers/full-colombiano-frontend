# 🔒 Type Safety Strategy

## ✅ ONLY Use Generated API Types

**Rule**: All API communication uses ONLY types generated from OpenAPI schema.

## 📋 Type Hierarchy

```
API Types (source of truth)
    ↓
Generated types (@/types/api.ts)
    ↓
Used directly in code
```

## 🎯 Implementation

### ✅ DO: Use Generated Types

```typescript
import type { paths, components } from '@/types/api';

// Extract exact API types
type LoginRequest = paths['/api/v1/auth/login']['post']['requestBody']['content']['application/json'];
type LoginResponse = paths['/api/v1/auth/login']['post']['responses']['200']['content']['application/json'];

// Use them directly
const payload: LoginRequest = {
  username: 'user@example.com',
  password: 'password123'
};

const response: LoginResponse = await api.auth.login(payload);
```

### ❌ DON'T: Create Custom API Types

```typescript
// ❌ BAD - Custom interface that might drift from API
interface LoginData {
  email: string;
  password: string;
}

// ❌ BAD - Mapping that might break when API changes
const payload = {
  username: data.email,  // What if API changes field name?
  password: data.password
};
```

## 🔄 When API Changes

### Backend Changes:
```python
# Backend adds new required field
class UserRegister(BaseModel):
    email: str
    password: str
    new_field: str  # NEW!
```

### Frontend Automatically Knows:
```bash
npm run generate:api-types

# TypeScript errors appear:
# ❌ Property 'new_field' is missing in type 'RegisterRequest'
```

### Fix Once, Works Forever:
```typescript
const payload: RegisterRequest = {
  email: formData.email,
  password: formData.password,
  new_field: formData.newField,  // Add new field
  // TypeScript ensures all required fields present
};
```

## 📁 File Structure

```
frontend/
├── src/
│   ├── types/
│   │   └── api.ts                    # ✅ Generated - DO NOT EDIT
│   ├── lib/
│   │   ├── api-client.ts             # ✅ Uses generated types
│   │   └── hooks/
│   │       └── useAuth.ts            # ✅ Uses generated types
│   └── app/
│       └── (auth)/
│           ├── login/
│           │   └── page.tsx          # Maps UI → API types
│           └── register/
│               └── page.tsx          # Maps UI → API types
└── scripts/
    └── generate-api-types.js         # Generates types from OpenAPI
```

## 🎨 Pattern: UI to API Mapping

### UI Form Data (camelCase, UI-specific):
```typescript
interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;  // UI-only field
}
```

### Map to API Type (snake_case, API-specific):
```typescript
const apiPayload: LoginRequest = {
  username: formData.email,  // Map email → username
  password: formData.password,
  // 'remember' not sent to API
};
```

### API Response (typed):
```typescript
const response: LoginResponse = await api.auth.login(apiPayload);
// TypeScript knows exact response structure
```

## 🔥 Benefits

### 1. **Compile-Time Safety**
```typescript
// ❌ TypeScript catches this immediately
const payload: LoginRequest = {
  email: 'user@example.com',  // Error: should be 'username'
  password: '123'
};
```

### 2. **Auto-Complete**
```typescript
const payload: LoginRequest = {
  // IDE shows: username, password (from API schema)
};
```

### 3. **Refactoring Safety**
```typescript
// Backend renames field: email → email_address
// TypeScript errors appear everywhere it's used
// Fix once, works everywhere
```

### 4. **Documentation**
```typescript
// Hover over type to see:
// - Required fields
// - Optional fields
// - Field types
// - Descriptions from API
```

## 🚀 Workflow

### 1. Backend Developer Changes API
```python
# Add new endpoint or modify existing
@router.post("/api/v1/users")
def create_user(data: UserCreate):
    ...
```

### 2. Types Auto-Generate
```bash
# On deployment or manually
npm run generate:api-types
```

### 3. Frontend Developer Gets Notified
```bash
# TypeScript shows errors
npm run type-check

# Errors point to exact locations that need updates
```

### 4. Fix Code Once
```typescript
// Update code to match new API types
const payload: UserCreateRequest = {
  // TypeScript guides you to add/remove/modify fields
};
```

### 5. Deploy with Confidence
```bash
# All type errors fixed
npm run build  # ✅ Success
```

## 📊 Type Sources

| Source | Purpose | Example |
|--------|---------|---------|
| `paths[...]` | Endpoint request/response | `LoginRequest`, `LoginResponse` |
| `components['schemas'][...]` | Reusable schemas | `UserRegister`, `AddressSchema` |
| `operations[...]` | Operation definitions | Full endpoint signature |

## 🎯 Rules

1. ✅ **ALWAYS** use generated types for API communication
2. ✅ **NEVER** create custom interfaces that duplicate API types
3. ✅ **ONLY** map UI data to API types in one place (hooks/services)
4. ✅ **REGENERATE** types after backend changes
5. ✅ **FIX** TypeScript errors immediately - they're your friends!

## 💡 Example: Complete Flow

### 1. Generated Type (auto-generated):
```typescript
// src/types/api.ts (generated)
type RegisterRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  role: 'customer' | 'vendor';
  accept_terms: boolean;
  accept_privacy: boolean;
  // ... more fields
};
```

### 2. Use in Hook:
```typescript
// src/lib/hooks/useAuth.ts
import type { components } from '@/types/api';

type RegisterRequest = components['schemas']['UserRegister'];

const register = async (formData: any) => {
  // Map UI data to API type
  const payload: RegisterRequest = {
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.confirmPassword,
    role: formData.role === 'buyer' ? 'customer' : 'vendor',
    accept_terms: Boolean(formData.acceptTerms),
    accept_privacy: Boolean(formData.acceptPrivacy),
  };
  
  // TypeScript ensures payload matches API exactly
  const response = await api.auth.register(payload);
};
```

### 3. Use in Component:
```typescript
// src/app/(auth)/register/page.tsx
const { register } = useAuth();

const onSubmit = async (formData: any) => {
  await register(formData);  // Hook handles mapping
};
```

## 🎉 Result

- ✅ **Type-safe** - Compile-time errors, not runtime
- ✅ **Self-documenting** - Types are documentation
- ✅ **Refactor-safe** - Changes caught immediately
- ✅ **Auto-synced** - Backend changes propagate automatically
- ✅ **No guessing** - IDE tells you exactly what's needed

**No more "Field required" errors in production!** 🔥

