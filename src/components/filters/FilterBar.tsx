import { ReactNode } from 'react';
import { MdFilterList } from 'react-icons/md';

interface FilterBarProps {
  filters: ReactNode;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
  className?: string;
}

/**
 * FilterBar Component
 * Container for filter controls with clear all functionality
 * Fully testable filter UI component
 */
export default function FilterBar({
  filters,
  activeFiltersCount = 0,
  onClearFilters,
  className = '',
}: FilterBarProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MdFilterList className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {onClearFilters && activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-600 font-medium transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>
      <div className="space-y-4">{filters}</div>
    </div>
  );
}

