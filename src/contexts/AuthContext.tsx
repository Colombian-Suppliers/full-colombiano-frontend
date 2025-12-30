'use client';

/**
 * Auth Context
 * Manages authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import type { paths } from '@/types/api';

// Types from API
type UserResponse = paths['/api/v1/auth/me']['get']['responses']['200']['content']['application/json'];
type LoginRequest = paths['/api/v1/auth/login']['post']['requestBody']['content']['application/json'];
type RegisterRequest = paths['/api/v1/auth/register']['post']['requestBody']['content']['application/json'];

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const userData = await api.auth.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      const response = await api.auth.login(credentials);
      
      // Save token
      localStorage.setItem('auth_token', response.token);
      
      // Set user - type assertion needed due to OpenAPI schema type mismatch
      if (response.user && typeof response.user === 'object' && 'id' in response.user) {
        setUser(response.user as unknown as UserResponse);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      const response = await api.auth.register(userData);
      
      // RegisterResponse doesn't include token or user
      // User needs to verify email before logging in
      // Just return success - no need to set token or user
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await api.auth.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  }, [logout]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

