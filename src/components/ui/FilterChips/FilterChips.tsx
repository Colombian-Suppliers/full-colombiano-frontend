// @ts-nocheck
'use client';
import React from 'react';

export interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters?: Array<{ key: string; label: string }>;
}

/**
 * FilterChips Component
 * Principle: Single Responsibility - handles only filter chips
 */
export const FilterChips = ({
  activeFilter,
  onFilterChange,
  filters = [
    { key: 'all', label: 'Todas las reseñas' },
    { key: 'unanswered', label: 'Sin responder' },
  ],
}: FilterChipsProps) => {
  return (
    <div className="flex gap-3 p-0 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 cursor-pointer transition-all duration-200 ${
            activeFilter === filter.key
              ? 'bg-primary-100 text-primary-800 shadow-sm border-l-4 border-primary-600'
              : 'bg-white hover:bg-primary-50 hover:text-primary-700 text-gray-700 border-l-4 border-transparent'
          }`}
        >
          <p className="text-sm font-medium leading-normal">{filter.label}</p>
        </button>
      ))}
    </div>
  );
};

FilterChips.displayName = 'FilterChips';


export default FilterChips;
