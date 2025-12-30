import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  expiresAt: number | null;
  remember: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setTokens: (token: string, refreshToken?: string) => void;
  login: (
    userData: {
      user: User;
      token: string;
      refreshToken?: string;
    },
    remember?: boolean
  ) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshTokenAsync: () => Promise<boolean>;
  resetExpiration: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      expiresAt: null,
      remember: false,

      // Actions
      setUser: (user) => set({ user }),

      setTokens: (token, refreshToken) => set({ token, refreshToken }),

      login: async (userData, remember = false) => {
        const { user, token, refreshToken } = userData;
        const expiresAt = remember ? Date.now() + 24 * 60 * 60 * 1000 : null;
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          error: null,
          expiresAt,
          remember,
        });
      },

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
          expiresAt: null,
          remember: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      refreshTokenAsync: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return false;

        try {
          // This would normally call the auth service
          // For now, we'll just simulate success
          if (Math.random() > 0.9) throw new Error('Token refresh failed');
          return true;
        } catch (_error) {
          return false;
        }
      },

      resetExpiration: () => {
        const { remember, isAuthenticated } = get();
        if (isAuthenticated && remember) {
          set({ expiresAt: Date.now() + 24 * 60 * 60 * 1000 });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        expiresAt: state.expiresAt,
        remember: state.remember,
      }),
    }
  )
);

