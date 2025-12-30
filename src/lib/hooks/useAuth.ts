/**
 * useAuth Hook - REAL API VERSION
 * Hook personalizado para operaciones de autenticación
 * Uses ONLY generated API types - no custom interfaces!
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { api } from '@/lib/api-client';
import { AxiosError } from 'axios';
import type { components, paths } from '@/types/api';

// ONLY use generated API types
type LoginRequest = paths['/api/v1/auth/login']['post']['requestBody']['content']['application/json'];
type RegisterRequest = components['schemas']['UserRegister'];
type LoginResponse = paths['/api/v1/auth/login']['post']['responses']['200']['content']['application/json'];
type RegisterResponse = paths['/api/v1/auth/register']['post']['responses']['201']['content']['application/json'];

// Login credentials from UI (includes UI-only fields like remember)
interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
  remember?: boolean;
}

// Form data from UI - this is what the form gives us
// We'll map this to RegisterRequest
interface RegisterFormData {
  // Account type
  role: string;
  personType?: string;
  
  // Credentials
  email?: string;
  password?: string;
  confirmPassword?: string;
  
  // Personal info (buyer)
  firstName?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  
  // Store info (seller)
  storeName?: string;
  storePhone?: string;
  storeAddress?: string;
  storeCity?: string;
  storeDept?: string;
  storeCategory?: number;
  
  // Natural person (seller)
  idType?: string;
  idNumber?: string;
  personalPhone?: string;
  personalEmail?: string;
  personalAddress?: string;
  personalCity?: string;
  personalDept?: string;
  
  // Company (juridica)
  companyName?: string;
  companyNIT?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyAddress?: string;
  companyCity?: string;
  companyDept?: string;
  
  // Representative (juridica)
  repFirstName?: string;
  repLastName?: string;
  repIdType?: string;
  repIdNumber?: string;
  repPhone?: string;
  repEmail?: string;
  
  // Terms
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  electronicBilling?: string | boolean;
  
  [key: string]: any;
}

export const useAuth = () => {
  const router = useRouter();
  const { login: storeLogin, logout: storeLogout, user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setIsLoading(true);
        setError(null);

        // Map to API LoginRequest type
        const loginPayload: LoginRequest = {
          username: credentials.username || credentials.email || '',
          password: credentials.password,
        };

        // Call API with LoginRequest type, get LoginResponse type
        const response: LoginResponse = await api.auth.login(loginPayload);

        console.log('Login response:', response);

        // Save token for API client
        localStorage.setItem('auth_token', response.token);
        
        // The user field in LoginResponse is typed as Record<string, never> but actually contains user data
        // Cast it to access the actual fields
        const userData = response.user as unknown as {
          id: number;
          email: string;
          display_name: string;
          role: string;
        };
        
        // Save full user object with role
        const userToSave = {
          id: userData.id.toString(),
          email: userData.email,
          name: userData.display_name,
          role: userData.role,
          display_name: userData.display_name,
        };
        
        localStorage.setItem('user', JSON.stringify(userToSave));
        console.log('User saved to localStorage:', userToSave);

        // Also save to store
        storeLogin(
          {
            user: userToSave,
            token: response.token,
          },
          credentials.remember
        );

        return { user: userData };
      } catch (err) {
        let errorMessage = 'Error al iniciar sesión';
        
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            errorMessage = 'Email o contraseña incorrectos';
          } else if (err.response?.status === 403) {
            errorMessage = 'Usuario inactivo o no verificado';
          } else if (err.response?.data?.detail) {
            errorMessage = err.response.data.detail;
          }
        }
        
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [storeLogin]
  );

  const register = useCallback(
    async (formData: RegisterFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Registration form data:', formData);

        // Map role: buyer -> customer, seller -> vendor
        const apiRole = formData.role === 'buyer' ? 'customer' : formData.role === 'seller' ? 'vendor' : formData.role;

        // Map form data to API RegisterRequest type
        // This is the ONLY place we do mapping - from UI to API
        const apiPayload: RegisterRequest = {
          // Required fields
          email: formData.email || formData.personalEmail || formData.companyEmail || formData.repEmail || '',
          password: formData.password || '',
          password_confirmation: formData.confirmPassword || formData.password || '',
          role: apiRole as 'customer' | 'vendor',
          accept_terms: Boolean(formData.acceptTerms),
          accept_privacy: Boolean(formData.acceptPrivacy),
          issues_electronic_invoice: formData.electronicBilling === 'true' || formData.electronicBilling === true || false,
          
          // Optional personal fields
          first_name: formData.firstName || formData.repFirstName || null,
          last_name: formData.lastName || formData.repLastName || null,
          document_type: (formData.documentType || formData.idType || formData.repIdType || null) as 'national_id' | 'passport' | 'foreign_id' | null,
          document_number: formData.documentNumber || formData.idNumber || formData.repIdNumber || null,
          
          // Optional vendor fields
          vendor_type: apiRole === 'vendor' ? ((formData.personType || 'natural') as 'natural' | 'juridica') : null,
          store_name: formData.storeName || null,
          store_phone: formData.storePhone || null,
          store_email: null,
          store_confirm_email: null,
          store_address: formData.storeAddress || formData.storeCity || formData.storeDept ? {
            department: formData.storeDept || '',
            city: formData.storeCity || '',
            line_1: formData.storeAddress || '',
            line_2: null,
          } : null,
          store_category_ids: formData.storeCategory ? [formData.storeCategory] : null,
          
          // Optional natural person fields
          personal_phone: formData.personalPhone || null,
          personal_email: formData.personalEmail || null,
          personal_address: formData.personalAddress || formData.personalCity || formData.personalDept ? {
            department: formData.personalDept || '',
            city: formData.personalCity || '',
            line_1: formData.personalAddress || '',
            line_2: null,
          } : null,
          
          // Optional company fields (juridica)
          company_name: formData.companyName || null,
          company_nit: formData.companyNIT || null,
          company_phone: formData.companyPhone || null,
          company_email: formData.companyEmail || null,
          company_address: formData.companyAddress || formData.companyCity || formData.companyDept ? {
            department: formData.companyDept || '',
            city: formData.companyCity || '',
            line_1: formData.companyAddress || '',
            line_2: null,
          } : null,
        };

        console.log('API payload (RegisterRequest type):', apiPayload);

        // Call API with the exact RegisterRequest type
        const response: RegisterResponse = await api.auth.register(apiPayload);

        console.log('Registration response:', response);

        // RegisterResponse doesn't include token/user - just success info
        // User needs to verify email before logging in
        return {
          success: response.success,
          message: response.message,
          user_id: response.user_id,
          email_verification_required: response.email_verification_required,
        };
      } catch (err) {
        console.error('Registration error caught:', err);
        let errorMessage = 'Error al registrarse';
        
        if (err instanceof AxiosError) {
          console.log('Axios error response:', err.response);
          
          if (err.response?.status === 400) {
            // Check if detail is a string (validation error from backend)
            if (typeof err.response.data?.detail === 'string') {
              errorMessage = err.response.data.detail;
            } else {
              errorMessage = 'Datos inválidos. Verifica la información';
            }
          } else if (err.response?.status === 409) {
            errorMessage = 'El email ya está registrado';
          } else if (err.response?.data?.detail) {
            if (Array.isArray(err.response.data.detail)) {
              errorMessage = err.response.data.detail[0]?.msg || errorMessage;
            } else if (typeof err.response.data.detail === 'string') {
              errorMessage = err.response.data.detail;
            }
          }
        }
        
        console.log('Final error message:', errorMessage);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Clear local storage
      localStorage.removeItem('auth_token');
      
      // Clear store
      storeLogout();
      
      // Redirect to login
      router.push('/login');

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeLogout, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
  };
};

