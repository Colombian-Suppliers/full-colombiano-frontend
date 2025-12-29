/**
 * Routes Configuration
 * Define todas las rutas de la aplicación
 * Principio: Single Responsibility - solo maneja rutas
 */

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  EMAIL_VERIFICATION: '/verify-email',
  VERIFICATION_SUCCESS: '/verification-success',
  VERIFICATION_ERROR: '/verification-error',
  RESEND_VERIFICATION: '/resend-verification',
  REPORT_BUG: '/report-bug',

  // Rutas de comprador
  MARKETPLACE: '/marketplace',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',

  // Rutas de dashboard (vendedor)
  DASHBOARD: '/d',
  DASHBOARD_PRODUCTS: '/d/products',
  DASHBOARD_ORDERS: '/d/orders',
  DASHBOARD_REVIEWS: '/d/reviews',
  DASHBOARD_PAYMENTS: '/d/payments',
  DASHBOARD_QUESTIONS: '/d/questions',
  DASHBOARD_RETURNS: '/d/returns',
  DASHBOARD_QUOTES: '/d/quotes',
  DASHBOARD_SHIPMENTS: '/d/shipments',
  DASHBOARD_PICKUP: '/d/pickup',
  DASHBOARD_VERIFICATION: '/d/verification',
  DASHBOARD_STORE: '/d/store',
  DASHBOARD_ANNOUNCEMENTS: '/d/announcements',
  DASHBOARD_HELP: '/d/help',
  DASHBOARD_REPORTS: '/d/reports',
  DASHBOARD_WITHDRAWALS: '/d/withdrawals',
  DASHBOARD_COUPONS: '/d/coupons',
  DASHBOARD_FOLLOWERS: '/d/followers',
  DASHBOARD_SETTINGS: '/d/settings',

  // Rutas de error
  NOT_FOUND: '/404',
} as const;

export default ROUTES;

