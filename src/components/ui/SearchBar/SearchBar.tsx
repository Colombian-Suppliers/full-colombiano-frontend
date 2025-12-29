// @ts-nocheck
'use client';
import React from 'react';

import { useState, ChangeEvent } from 'react';
import { MdSearch } from 'react-icons/md';
import { Input } from '../Input';

export interface SearchBarProps {
  /**
   * Callback when search term changes
   */
  onSearch: (searchTerm: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Initial search value
   */
  initialValue?: string;
}

/**
 * SearchBar Component
 * Principle: Single Responsibility - handles only search
 */
export const SearchBar = ({
  onSearch,
  placeholder = 'Buscar...',
  initialValue = '',
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="px-0 py-0">
      <label className="flex flex-col min-w-40 h-12 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
          <div className="text-gray-500 flex border-none bg-white items-center justify-center pl-4 rounded-l-xl border-r-0">
            <MdSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearch}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141b] focus:outline-0 focus:ring-0 border-none bg-white focus:border-none h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
          />
        </div>
      </label>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';


export default SearchBar;
