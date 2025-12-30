import React from 'react';
import { useState, useEffect } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

/**
 * SearchBar Component
 * Search input with debounce and clear functionality
 * Fully testable search component
 */
export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Buscar...',
  debounceMs = 300,
  className = '',
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localValue, debounceMs, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <MdClose className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}

