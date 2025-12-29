/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || 'https://api.fullcolombiano.com',
  TIMEOUT: 30000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    RESEND_VERIFICATION: '/auth/resend-verification',
    RESEND_PASSWORD_RESET: '/auth/resend-password-reset',
  },

  // Product endpoints
  PRODUCTS: {
    CREATE: '/products',
    LIST: '/products',
    GET: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    TAGS: '/products/tags',
    CATEGORIES: '/products/categories',
    SELLER_PRODUCTS: '/seller/products',
  },

  // Order endpoints
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    GET: (id: string) => `/orders/${id}`,
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    BUYER_ORDERS: '/buyer/orders',
    SELLER_ORDERS: '/seller/orders',
  },

  // Store endpoints
  STORE: {
    GET: '/store',
    UPDATE: '/store',
    CATEGORIES: '/store/categories',
  },

  // Geo endpoints
  GEO: {
    DEPARTMENTS: '/geo/departments',
    CITIES: (departmentId: string) => `/geo/departments/${departmentId}/cities`,
  },

  // Verification endpoints
  VERIFICATION: {
    UPLOAD_DOCUMENT: '/verification/upload',
    STATUS: '/verification/status',
  },

  // Payment endpoints
  PAYMENT: {
    CREATE_ORDER: '/payment/create-order',
    CONFIRM: '/payment/confirm',
  },
} as const;

export default API_CONFIG;

