// @ts-nocheck
'use client';
import React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

/**
 * HomeRedirect Component
 * Principle: Single Responsibility - handles automatic redirection from home
 * Principle: Open/Closed - extensible for new roles
 */
export const HomeRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role?.toLowerCase();

      // Automatic redirection based on role
      if (role === 'vendor' || role === 'seller') {
        router.replace('/dashboard');
      } else if (role === 'customer' || role === 'buyer') {
        router.replace('/marketplace');
      }
      // If role is not defined or unknown, stays on home
    }
  }, [isAuthenticated, user, router]);

  // If authenticated, don't show anything while redirecting
  // If not authenticated, show the normal home page
  return <>{children}</>;
};

HomeRedirect.displayName = 'HomeRedirect';


export default HomeRedirect;
