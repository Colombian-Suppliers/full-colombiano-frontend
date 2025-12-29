/**
 * useFormValidation Hook
 * Wrapper around react-hook-form for consistent form validation
 */

'use client';

import { useForm, UseFormReturn } from 'react-hook-form';

export const useFormValidation = <T extends Record<string, any> = Record<string, any>>(): UseFormReturn<T> => {
  return useForm<T>({
    mode: 'onBlur',
  });
};

