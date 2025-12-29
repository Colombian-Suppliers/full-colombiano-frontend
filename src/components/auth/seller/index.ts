/**
 * Seller Registration Flow Components
 * 
 * This module contains all components for the seller registration process.
 * 
 * Shared Steps (both Natural and Juridica):
 * - Step 1: Person Type Selection (Natural or Juridica)
 * - Step 2: Store Information (Store Name, Categories, Location)
 * 
 * Natural Person Flow (4 steps total):
 * - Step 1: Person Type → Step 2: Store Info → Step 3: Personal Info → Step 4: Credentials
 * 
 * Juridica Person Flow (5 steps total):
 * - Step 1: Person Type → Step 2: Store Info → Step 3: Company Info → Step 4: Representative → Step 5: Credentials
 */

// Shared components
export { default as Step1PersonType } from './Step1PersonType';
export { default as Step2StoreInfo } from './Step2StoreInfo';

// Natural person flow
export * from './natural';

// Juridica person flow
export * from './juridica';

