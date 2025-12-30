/**
 * Schemas Index
 * 
 * Central export point for all validation schemas.
 * Includes both auto-generated backend schemas and custom enhanced schemas.
 */

// Export all generated schemas from the shared package
// TODO: Uncomment when package is installed
// export * from '@colombian-suppliers/shared-schemas';

// Export custom enhanced schemas
export * from './custom/auth.schemas';

// Re-export commonly used schemas with aliases
export {
  EnhancedUserRegisterSchema as UserRegisterSchema,
  LoginSchema,
  ResetPasswordSchema,
  ForgotPasswordSchema,
  ResendVerificationSchema,
  AddressSchema,
} from './custom/auth.schemas';

// Export types
export type {
  EnhancedUserRegister as UserRegister,
  Login,
  ResetPassword,
  ForgotPassword,
  ResendVerification,
  Address,
} from './custom/auth.schemas';

