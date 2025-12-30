/**
 * HTTP Client
 * Configured Axios client for all API requests
 * Principle: Single Responsibility - only handles HTTP requests
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.fullcolombiano.com';
const API_TIMEOUT = 30000;

/**
 * Create configured Axios instance
 */
export const httpClient = axios.create({
  baseURL: `${API_BASE_URL}/wp-json/hmc/v1`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authentication token to all requests
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');

      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage);
          if (state?.token && config.headers) {
            config.headers.Authorization = `Bearer ${state.token}`;
          }
        } catch (error) {
          console.error('Error parsing auth storage:', error);
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles global errors and responses
 */
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(
        new Error('Connection error. Check your internet.')
      );
    }

    // Handle server errors
    const { status, data } = error.response;

    // If token expired (401), clear session
    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }

    // Extract error message from response and sanitize (may contain HTML)
    const rawMessage =
      (data as any)?.message || (data as any)?.error || 'Request error';
    const stripHtml = (html: string): string => {
      if (!html) return '';
      try {
        return html.replace(/<[^>]*>/g, '');
      } catch (_e) {
        return String(html);
      }
    };
    const sanitized = stripHtml(rawMessage).trim();

    // Attach sanitized message to the original error
    const customError = error as any;
    customError.sanitizedMessage = sanitized || 'Request error';
    customError.message = sanitized || error.message;

    // Preserve original error (with response) so upper layers can inspect status/data
    return Promise.reject(error);
  }
);

export default httpClient;

