# Generated Schemas (Legacy)

⚠️ **DEPRECATED:** This directory contains legacy auto-generated schemas.

## Migration to Shared Package

We have migrated to using the `@colombian-supply/shared-schemas` package from GitHub Packages.

### Old Approach (This Directory)
- Schemas generated locally from backend
- Required backend to be running
- Manual script execution
- No versioning

### New Approach (Shared Package)
- Schemas published to GitHub Packages
- Automatic updates via CI/CD
- Semantic versioning
- No backend dependency

## How to Use

```typescript
// ❌ OLD: Import from generated folder
import { UserRegisterSchema } from '@/lib/schemas/generated/user-register';

// ✅ NEW: Import from shared package
import { UserRegisterSchema } from '@colombian-supply/shared-schemas';
```

## Installation

```bash
npm install @colombian-supply/shared-schemas
```

## Documentation

See the complete documentation:
- [Shared Schemas System](https://github.com/MateoAV/full-colombiano-docs/blob/main/docs/03-arquitectura/07-shared-schemas-system.md)
- [Package README](https://github.com/MateoAV/full-colombiano-backend/blob/main/schemas-package/README.md)

## Status

This directory will be removed in a future version once all imports are migrated to the shared package.

---

**Last Updated:** 2025-12-30  
**Status:** ⚠️ Deprecated - Use `@colombian-supply/shared-schemas` instead
