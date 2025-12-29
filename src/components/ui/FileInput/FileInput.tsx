// @ts-nocheck
'use client';
import React from 'react';

import { useRef, useState, ChangeEvent } from 'react';

export interface FileInputProps {
  id?: string;
  label: string;
  accept?: string;
  onChange: (files: File | File[] | null) => void;
  error?: string;
  className?: string;
  maxSize?: number;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

export const FileInput = ({
  id,
  label,
  accept,
  onChange,
  error,
  className = '',
  maxSize = 5,
  required = false,
  disabled = false,
  multiple = false,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        const fileArray = Array.from(files);
        setFileName(
          `${fileArray.length} archivo${fileArray.length > 1 ? 's' : ''} seleccionado${fileArray.length > 1 ? 's' : ''}`
        );
        onChange(fileArray);
      } else {
        const file = files[0];
        setFileName(file.name);
        onChange(file);
      }
    } else {
      setFileName('');
      onChange(multiple ? [] : null);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 z-10"
          data-testid="file-input-hidden"
          required={required}
          disabled={disabled}
          multiple={multiple}
        />

        <div
          onClick={handleClick}
          className={`
            relative w-full p-3 border-2 border-dashed rounded-lg
            transition-all duration-200 ease-in-out
            ${
              disabled
                ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                : error
                  ? 'border-red-300 bg-red-50 hover:border-red-400 cursor-pointer'
                  : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50 cursor-pointer'
            }
            ${!disabled ? 'focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`
                flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                ${disabled ? 'bg-gray-200' : error ? 'bg-red-100' : 'bg-primary-100'}
              `}
              >
                <svg
                  className={`w-5 h-5 ${disabled ? 'text-gray-400' : error ? 'text-red-600' : 'text-primary-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                {fileName ? (
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Archivo seleccionado
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Seleccionar archivo
                    </p>
                    <p className="text-xs text-gray-500">
                      {multiple
                        ? `PDF, JPG, PNG hasta ${maxSize}MB cada uno`
                        : `PDF, JPG, PNG hasta ${maxSize}MB`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`
              flex-shrink-0 ml-3 px-3 py-1 rounded-md text-sm font-medium
              ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : error ? 'bg-red-100 text-red-700 cursor-pointer' : 'bg-primary-100 text-primary-700 cursor-pointer'}
            `}
            >
              {fileName ? 'Cambiar' : 'Seleccionar'}
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

FileInput.displayName = 'FileInput';


export default FileInput;
