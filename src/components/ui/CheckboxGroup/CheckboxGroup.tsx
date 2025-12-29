// @ts-nocheck
import React from 'react';import { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface CheckboxOption {
  name: string;
  title: string;
  description?: string;
  value?: string;
  validation?: Record<string, any>;
}

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  options: CheckboxOption[];
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  required?: boolean;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, options, register, errors, required, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('w-full', className)} {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="space-y-3">
          {options.map((option) => (
            <label
              key={option.name}
              className="flex items-start gap-3 hover:text-primary-600 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value || option.name}
                {...register(option.name, option.validation || {})}
                className="accent-primary-500 mt-1 cursor-pointer"
              />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{option.title}</div>
                {option.description && (
                  <div className="text-gray-600">{option.description}</div>
                )}
              </div>
            </label>
          ))}
        </div>
        {errors && Object.keys(errors).length > 0 && (
          <p className="mt-2 text-sm text-red-600">
            {Object.values(errors)[0]?.message as string}
          </p>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';


export default CheckboxGroup;
