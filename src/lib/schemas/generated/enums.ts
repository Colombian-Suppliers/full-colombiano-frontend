/**
 * Enums from backend models
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.793521
 */

export const UserRole = {
  CUSTOMER: 'customer' as const,
  VENDOR: 'vendor' as const,
  ADMIN: 'admin' as const,
};

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export const DocumentType = {
  NATIONAL_ID: 'national_id' as const,
  FOREIGN_ID: 'foreign_id' as const,
  PASSPORT: 'passport' as const,
  NIT: 'nit' as const,
};

export type DocumentTypeType = typeof DocumentType[keyof typeof DocumentType];

export const VendorType = {
  NATURAL: 'natural' as const,
  JURIDICA: 'juridica' as const,
};

export type VendorTypeType = typeof VendorType[keyof typeof VendorType];

export const VerificationStatus = {
  PENDING: 'pending' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
};

export type VerificationStatusType = typeof VerificationStatus[keyof typeof VerificationStatus];

export const PaymentMethod = {
  BANK_TRANSFER: 'bank_transfer' as const,
  PAYPAL: 'paypal' as const,
  STRIPE: 'stripe' as const,
  CASH: 'cash' as const,
  OTHER: 'other' as const,
};

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'pending' as const,
  PROCESSING: 'processing' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  REFUNDED: 'refunded' as const,
};

export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

export const DiscountType = {
  PERCENTAGE: 'percentage' as const,
  FIXED_AMOUNT: 'fixed_amount' as const,
  FREE_SHIPPING: 'free_shipping' as const,
};

export type DiscountTypeType = typeof DiscountType[keyof typeof DiscountType];

export const DocumentStatus = {
  PENDING: 'pending' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
};

export type DocumentStatusType = typeof DocumentStatus[keyof typeof DocumentStatus];

export const OrderStatus = {
  PENDING: 'pending' as const,
  PROCESSING: 'processing' as const,
  ON_HOLD: 'on_hold' as const,
  COMPLETED: 'completed' as const,
  CANCELLED: 'cancelled' as const,
  REFUNDED: 'refunded' as const,
  FAILED: 'failed' as const,
};

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export const ProductType = {
  SIMPLE: 'simple' as const,
  VARIABLE: 'variable' as const,
  GROUPED: 'grouped' as const,
  EXTERNAL: 'external' as const,
};

export type ProductTypeType = typeof ProductType[keyof typeof ProductType];

export const StockStatus = {
  INSTOCK: 'instock' as const,
  OUTOFSTOCK: 'outofstock' as const,
  ONBACKORDER: 'onbackorder' as const,
};

export type StockStatusType = typeof StockStatus[keyof typeof StockStatus];

export const AnnouncementPriority = {
  LOW: 'low' as const,
  NORMAL: 'normal' as const,
  HIGH: 'high' as const,
  URGENT: 'urgent' as const,
};

export type AnnouncementPriorityType = typeof AnnouncementPriority[keyof typeof AnnouncementPriority];

export const AnnouncementTargetType = {
  ALL: 'all' as const,
  VERIFIED: 'verified' as const,
  UNVERIFIED: 'unverified' as const,
  SPECIFIC: 'specific' as const,
  CATEGORIES: 'categories' as const,
};

export type AnnouncementTargetTypeType = typeof AnnouncementTargetType[keyof typeof AnnouncementTargetType];
