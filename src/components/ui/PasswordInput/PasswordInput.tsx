// @ts-nocheck
import React from 'react';import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input, InputProps } from '../Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /**
   * External control of visibility
   */
  visible?: boolean;
  /**
   * Callback when visibility is toggled
   */
  onToggle?: () => void;
}

/**
 * Password input with visibility toggle
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      helperText,
      isValid,
      visible: externalVisible,
      onToggle,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(false);

    const visible =
      externalVisible !== undefined ? externalVisible : internalVisible;
    const handleToggle = onToggle || (() => setInternalVisible((v) => !v));

    return (
      <div className="relative">
        <Input
          ref={ref}
          label={label}
          error={error}
          helperText={helperText}
          isValid={isValid}
          icon={icon}
          {...props}
          type={visible ? 'text' : 'password'}
          className={`pr-10 ${className || ''}`}
        >
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors cursor-pointer"
            aria-pressed={visible}
            aria-label={visible ? 'Hide password' : 'Show password'}
            title={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <FiEyeOff className="w-5 h-5" />
            ) : (
              <FiEye className="w-5 h-5" />
            )}
          </button>
        </Input>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';


export default PasswordInput;
