/**
 * API Client
 * Type-safe API client using generated types from OpenAPI schema
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { paths } from '@/types/api';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Type-safe API methods
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials: { username: string; password: string }) => {
      const response = await apiClient.post<paths['/api/v1/auth/login']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/login',
        credentials
      );
      return response.data;
    },

    register: async (userData: paths['/api/v1/auth/register']['post']['requestBody']['content']['application/json']) => {
      const response = await apiClient.post<paths['/api/v1/auth/register']['post']['responses']['201']['content']['application/json']>(
        '/api/v1/auth/register',
        userData
      );
      return response.data;
    },

    verifyEmail: async (data: { token: string }) => {
      const response = await apiClient.post<paths['/api/v1/auth/verify-email']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/verify-email',
        data
      );
      return response.data;
    },

    resendVerification: async (data: { email: string }) => {
      const response = await apiClient.post<paths['/api/v1/auth/resend-verification']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/resend-verification',
        data
      );
      return response.data;
    },

    forgotPassword: async (data: { email: string }) => {
      const response = await apiClient.post<paths['/api/v1/auth/forgot-password']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/forgot-password',
        data
      );
      return response.data;
    },

    resetPassword: async (data: { token: string; new_password: string }) => {
      const response = await apiClient.post<paths['/api/v1/auth/reset-password']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/reset-password',
        data
      );
      return response.data;
    },

    getCurrentUser: async () => {
      const response = await apiClient.get<paths['/api/v1/auth/me']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/me'
      );
      return response.data;
    },

    refreshToken: async (refreshToken: string) => {
      const response = await apiClient.post<paths['/api/v1/auth/refresh']['post']['responses']['200']['content']['application/json']>(
        '/api/v1/auth/refresh',
        { refresh_token: refreshToken }
      );
      return response.data;
    },
  },

  // Geographic data endpoints
  geo: {
    getDepartments: async () => {
      const response = await apiClient.get<paths['/api/v1/geo/departments']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/geo/departments'
      );
      return response.data;
    },

    getCities: async (department?: string) => {
      const response = await apiClient.get<paths['/api/v1/geo/cities']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/geo/cities',
        { params: { department } }
      );
      return response.data;
    },

    getStoreCategories: async () => {
      const response = await apiClient.get<paths['/api/v1/geo/store-categories']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/geo/store-categories'
      );
      return response.data;
    },
  },

  // Store endpoints
  stores: {
    getMyStore: async () => {
      const response = await apiClient.get<paths['/api/v1/stores/my-store']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/stores/my-store'
      );
      return response.data;
    },

    updateMyStore: async (data: paths['/api/v1/stores/my-store']['put']['requestBody']['content']['application/json']) => {
      const response = await apiClient.put<paths['/api/v1/stores/my-store']['put']['responses']['200']['content']['application/json']>(
        '/api/v1/stores/my-store',
        data
      );
      return response.data;
    },
  },

  // Products endpoints
  products: {
    list: async (params?: paths['/api/v1/products']['get']['parameters']['query']) => {
      const response = await apiClient.get<paths['/api/v1/products']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/products',
        { params }
      );
      return response.data;
    },

    getById: async (id: number) => {
      const response = await apiClient.get<paths['/api/v1/products/{product_id}']['get']['responses']['200']['content']['application/json']>(
        `/api/v1/products/${id}`
      );
      return response.data;
    },

    create: async (data: paths['/api/v1/products']['post']['requestBody']['content']['application/json']) => {
      const response = await apiClient.post<paths['/api/v1/products']['post']['responses']['201']['content']['application/json']>(
        '/api/v1/products',
        data
      );
      return response.data;
    },

    update: async (id: number, data: paths['/api/v1/products/{product_id}']['put']['requestBody']['content']['application/json']) => {
      const response = await apiClient.put<paths['/api/v1/products/{product_id}']['put']['responses']['200']['content']['application/json']>(
        `/api/v1/products/${id}`,
        data
      );
      return response.data;
    },

    delete: async (id: number) => {
      const response = await apiClient.delete(
        `/api/v1/products/${id}`
      );
      return response.data;
    },
  },

  // Orders endpoints
  orders: {
    list: async (params?: paths['/api/v1/orders']['get']['parameters']['query']) => {
      const response = await apiClient.get<paths['/api/v1/orders']['get']['responses']['200']['content']['application/json']>(
        '/api/v1/orders',
        { params }
      );
      return response.data;
    },

    getById: async (id: number) => {
      const response = await apiClient.get<paths['/api/v1/orders/{order_id}']['get']['responses']['200']['content']['application/json']>(
        `/api/v1/orders/${id}`
      );
      return response.data;
    },

    create: async (data: paths['/api/v1/orders']['post']['requestBody']['content']['application/json']) => {
      const response = await apiClient.post<paths['/api/v1/orders']['post']['responses']['201']['content']['application/json']>(
        '/api/v1/orders',
        data
      );
      return response.data;
    },
  },
};

export default apiClient;

