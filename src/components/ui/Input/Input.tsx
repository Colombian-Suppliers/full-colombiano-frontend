// @ts-nocheck
import React from 'react';import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text shown below input
   */
  helperText?: string;
  /**
   * Shows valid state styling
   */
  isValid?: boolean;
  /**
   * Icon to display on the left
   */
  icon?: ReactNode;
}

/**
 * Input component with label, error, and helper text support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      isValid,
      className,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const hasIcon = !!icon;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {hasIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={clsx(
              'w-full py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors',
              hasIcon ? 'pl-10 pr-3' : 'px-3',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              isValid &&
                !error &&
                'border-green-500 focus:ring-green-500 focus:border-green-500',
              !error &&
                !isValid &&
                'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
              className
            )}
            {...props}
          />
          {children}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';


export default Input;
