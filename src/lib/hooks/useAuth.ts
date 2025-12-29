/**
 * useAuth Hook - MOCK VERSION
 * Hook personalizado para operaciones de autenticación
 * TODO: Replace with real API integration when backend is ready
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterData {
  role: string;
  personType?: string;
  email: string;
  password: string;
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

        // MOCK: Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // MOCK: Simulate successful login
        const mockUser = {
          id: '1',
          email: credentials.email,
          name: 'Usuario de Prueba',
          role: 'vendor', // or 'customer' based on email
          token: 'mock-jwt-token-' + Date.now(),
        };

        storeLogin(
          {
            user: mockUser,
            token: mockUser.token,
          },
          credentials.remember
        );

        return { user: mockUser };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [storeLogin]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        setIsLoading(true);
        setError(null);

        // MOCK: Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // MOCK: Simulate successful registration
        const mockUser = {
          id: '1',
          email: data.email,
          name: data.firstName || data.storeName || 'Usuario',
          role: data.role,
          token: 'mock-jwt-token-' + Date.now(),
        };

        storeLogin({
          user: mockUser,
          token: mockUser.token,
        });

        return { user: mockUser };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [storeLogin]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // MOCK: Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      storeLogout();
      router.push('/login');

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
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
  };
};

