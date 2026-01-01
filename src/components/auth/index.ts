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

export { default as BuyerStep1PersonalInfo } from './buyer/Step1PersonalInfo';
export { default as BuyerStep3Credentials } from './buyer/Step3Credentials';

export { default as SellerStep1PersonType } from './seller/Step1PersonType';
export { default as SellerStep2StoreInfo } from './seller/Step2StoreInfo';

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
