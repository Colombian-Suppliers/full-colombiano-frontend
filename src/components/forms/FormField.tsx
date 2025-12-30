import React from 'react';
import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

/**
 * FormField Component
 * Wrapper for form inputs with label, error, and help text
 * Fully testable form field container
 */
export default function FormField({
  label,
  error,
  required = false,
  helpText,
  children,
  htmlFor,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      {/* Input/Children */}
      {children}

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}

