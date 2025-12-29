// @ts-nocheck
'use client';
import React from 'react';

import { useState } from 'react';
import { MdSort, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export interface SortOption {
  key: string;
  label: string;
}

export interface SortFilterProps {
  sortBy: string;
  onSortChange: (sortKey: string) => void;
  sortOptions?: SortOption[];
}

/**
 * SortFilter Component
 * Principle: Single Responsibility - handles only sort filtering
 */
export const SortFilter = ({
  sortBy,
  onSortChange,
  sortOptions = [
    { key: 'newest', label: 'Más recientes primero' },
    { key: 'oldest', label: 'Más antiguas primero' },
    { key: 'author-asc', label: 'Autor A-Z' },
    { key: 'author-desc', label: 'Autor Z-A' },
    { key: 'product-asc', label: 'Producto A-Z' },
    { key: 'product-desc', label: 'Producto Z-A' },
  ],
}: SortFilterProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.key === sortBy);
    return option ? option.label : 'Ordenar por';
  };

  const handleSortSelect = (option: string) => {
    onSortChange(option);
    setIsSortOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 cursor-pointer transition-all duration-200 bg-white hover:bg-primary-50 hover:text-primary-700 text-gray-700 border border-gray-200"
      >
        <MdSort className="text-gray-500" />
        <span className="text-sm font-medium leading-normal">
          {getCurrentSortLabel()}
        </span>
        {isSortOpen ? (
          <MdKeyboardArrowUp className="text-gray-500" />
        ) : (
          <MdKeyboardArrowDown className="text-gray-500" />
        )}
      </button>

      {isSortOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200 min-w-[200px]">
          {sortOptions.map((option, index) => (
            <button
              key={option.key}
              onClick={() => handleSortSelect(option.key)}
              className={`w-full px-3 py-2 text-left hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                sortBy === option.key
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-700'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SortFilter.displayName = 'SortFilter';


export default SortFilter;
