/**
 * Toast Utilities
 * Wrapper functions for react-hot-toast with consistent styling
 */

import toast from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  actionText?: string;
  actionUrl?: string;
  onAction?: () => void;
}

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    duration: options?.duration || 5000,
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
  });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    duration: options?.duration || 5000,
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  });
};

export const showAlertToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    duration: options?.duration || 5000,
    icon: '⚠️',
    style: {
      background: '#F59E0B',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    duration: options?.duration || 5000,
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

