// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Input } from "@/components/ui/Input";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdDateRange,
  MdStar,
  MdShoppingBag,
} from 'react-icons/md';

/**
 * ReviewFilters Component
 * Principio: Single Responsibility - maneja solo los filtros de reseñas
 * Principio: Interface Segregation - callbacks para aplicar filtros
 */
const ReviewFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    rating: 'Todas las Calificaciones',
    product: '',
  });

  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const ratingOptions = [
    'Todas las Calificaciones',
    '5 Estrellas',
    '4 Estrellas',
    '3 Estrellas',
    '2 Estrellas',
    '1 Estrella',
  ];

  const handleRatingSelect = (option) => {
    handleFilterChange('rating', option);
    setIsRatingOpen(false);
  };

  const datePresets = [
    { label: 'Últimos 7 días', value: 'last7days' },
    { label: 'Últimos 30 días', value: 'last30days' },
  ];

  const applyDatePreset = (preset) => {
    const today = new Date();
    let fromDate = '';
    const toDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

    switch (preset) {
      case 'last7days':
        fromDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        break;
      case 'last30days':
        fromDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        break;
      default:
        return;
    }

    handleFilterChange('dateFrom', fromDate);
    handleFilterChange('dateTo', toDate);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-4 text-[#0d141b]">Filtros</h3>
      <div className="space-y-6">
        {/* Date Range Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdDateRange className="text-primary" />
            <label className="text-sm font-medium text-gray-700">
              Filtrar por Fecha
            </label>
          </div>

          {/* Date Presets */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {datePresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => applyDatePreset(preset.value)}
                className="px-3 py-2 text-sm text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <MdStar className="text-primary" />
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="rating-filter"
            >
              Filtrar por Calificación
            </label>
          </div>
          <button
            id="rating-filter"
            onClick={() => setIsRatingOpen(!isRatingOpen)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 hover:bg-white hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer px-3 py-2 text-left flex items-center justify-between"
          >
            <span className="text-gray-900">{filters.rating}</span>
            {isRatingOpen ? (
              <MdKeyboardArrowUp className="text-gray-500" />
            ) : (
              <MdKeyboardArrowDown className="text-gray-500" />
            )}
          </button>

          {/* Custom Dropdown */}
          {isRatingOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
              {ratingOptions.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleRatingSelect(option)}
                  className={`w-full px-3 py-2 text-left hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                    filters.rating === option
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MdShoppingBag className="text-primary" />
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="product-filter"
            >
              Filtrar por Producto
            </label>
          </div>
          <Input
            id="product-filter"
            type="text"
            placeholder="Buscar producto..."
            value={filters.product}
            onChange={(e) => handleFilterChange('product', e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 hover:bg-white hover:border-primary/50 focus:border-primary focus:ring-primary transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
