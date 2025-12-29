// @ts-nocheck
import React from 'react';import { useState } from 'react';
import {
  MdSort,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdSearch,
  MdClose,
} from 'react-icons/md';

/**
 * Componente para el dropdown de ordenamiento
 * Principio: Single Responsibility - solo maneja el ordenamiento
 */
const AnnouncementSortFilter = ({ sortBy, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { key: 'date_desc', label: 'Más recientes primero' },
    { key: 'date_asc', label: 'Más antiguas primero' },
    { key: 'title_asc', label: 'Título (A-Z)' },
    { key: 'title_desc', label: 'Título (Z-A)' },
    { key: 'category_asc', label: 'Categoría (A-Z)' },
    { key: 'category_desc', label: 'Categoría (Z-A)' },
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.key === sortBy);
    return option ? option.label : 'Ordenar por';
  };

  const handleSortSelect = (option) => {
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

      {/* Custom Dropdown */}
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

/**
 * Componente para los chips de filtro de estado
 * Principio: Single Responsibility - solo maneja los filtros de estado
 */
const AnnouncementFilterChips = ({ selectedStatus, onStatusChange }) => {
  const filters = [
    { key: 'all', label: 'Todos los anuncios' },
    { key: 'read', label: 'Leídos' },
    { key: 'unread', label: 'Sin leer' },
  ];

  return (
    <div className="flex gap-3 p-0 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onStatusChange(filter.key)}
          className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 cursor-pointer transition-all duration-200 ${
            selectedStatus === filter.key
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

/**
 * Componente para la barra de búsqueda y filtros
 * Principio: Single Responsibility - solo maneja la UI de filtros
 */
const AnnouncementsFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  filterSummary,
}) => {
  return (
    <div className="border-b border-gray-200 bg-white px-8 py-3 flex-shrink-0">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Bar */}
        <div className="flex-grow min-w-[250px] max-w-md relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Buscar anuncio"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <MdClose />
            </button>
          )}
        </div>

        {/* Left (search) already exists, now group the rest to the right */}
        <div className="ml-auto flex items-center gap-3">
          {/* Category Filter */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {/* Status Filter Chips */}
          <AnnouncementFilterChips
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />

          {/* Sort Dropdown */}
          <AnnouncementSortFilter sortBy={sortBy} onSortChange={onSortChange} />

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 cursor-pointer transition-all duration-200 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            >
              <MdClose className="text-gray-500" />
              <span className="text-sm font-medium leading-normal">
                Limpiar
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Summary */}
      {filterSummary.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          Filtros activos: {filterSummary.join(', ')}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsFilters;
