// @ts-nocheck
import React from 'react';import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Whether field is required
   */
  required?: boolean;
  /**
   * Field ID for label association
   */
  id?: string;
  /**
   * Valid state (consumed but not passed to DOM)
   */
  isValid?: boolean;
  /**
   * Form field content
   */
  children: ReactNode;
}

/**
 * FormField wrapper component
 * Provides consistent layout for form fields with label, error, and helper text
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      children,
      id,
      isValid: _isValid, // Consume isValid prop so it doesn't pass to DOM
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={clsx('w-full', className)} {...props}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';


export default FormField;
