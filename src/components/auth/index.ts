/**
 * Authentication Components
 * 
 * This module provides a centralized export for all authentication-related components.
 * Components are organized by user type (buyer/seller) and shared components.
 * 
 * @example
 * ```tsx
 * import { BuyerStep1PersonalInfo, SellerStep2StoreInfo, AccountTypeSelector } from '@/components/auth';
 * ```
 */

// Shared components
export * from './shared';

// Buyer registration flow
export * from './buyer';

// Seller registration flow - explicitly export to avoid conflicts
export { 
  Step1PersonType,
  Step2StoreInfo
} from './seller';

// Seller natural flow - rename conflicting exports
export {
  Step2PersonalInfo as SellerNaturalStep2PersonalInfo,
  Step3Credentials as SellerNaturalStep3Credentials
} from './seller/natural';

// Seller juridica flow
export * from './seller/juridica';

