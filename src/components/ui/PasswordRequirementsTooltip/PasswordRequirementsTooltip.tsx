// @ts-nocheck
'use client';
import React from 'react';

import { useState, ReactNode } from 'react';
import { FiInfo } from 'react-icons/fi';

export interface PasswordRequirementsTooltipProps {
  children?: ReactNode;
  requirements?: string[];
}

export const PasswordRequirementsTooltip = ({
  children,
  requirements = [],
}: PasswordRequirementsTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block -mb-2">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full cursor-pointer"
        aria-label="Ver requisitos de contraseña"
      >
        <FiInfo className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute z-50 w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg left-0 top-full mt-2">
          <div className="text-sm">
            <h4 className="font-semibold text-gray-800 mb-2">
              Requisitos de contraseña:
            </h4>
            <ul className="space-y-1 text-gray-600">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
          <div className="absolute -top-1 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-200"></div>
        </div>
      )}

      {children}
    </div>
  );
};

PasswordRequirementsTooltip.displayName = 'PasswordRequirementsTooltip';


export default PasswordRequirementsTooltip;
