// @ts-nocheck
'use client';
import React from 'react';

import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNetworkStatus } from '@/lib/hooks';

/**
 * Component that shows notifications when connectivity status changes
 */
export const NetworkStatusIndicator = () => {
  const isOnline = useNetworkStatus();
  const lastOnlineStatus = useRef(isOnline);
  const toastShown = useRef(false);

  useEffect(() => {
    // Only show toast if status changed and hasn't been shown recently
    if (lastOnlineStatus.current !== isOnline && !toastShown.current) {
      toastShown.current = true;

      if (!isOnline) {
        toast.error(
          'Sin conexión a internet. Algunas funciones pueden no estar disponibles.',
          {
            duration: 5000,
            icon: '📶',
          }
        );
      } else {
        toast.success('Conexión restablecida', {
          duration: 3000,
          icon: '✅',
        });
      }

      // Reset flag after a short delay
      setTimeout(() => {
        toastShown.current = false;
      }, 100);
    }

    lastOnlineStatus.current = isOnline;
  }, [isOnline]);

  return null; // This component doesn't render anything, only handles effects
};

NetworkStatusIndicator.displayName = 'NetworkStatusIndicator';


export default NetworkStatusIndicator;
