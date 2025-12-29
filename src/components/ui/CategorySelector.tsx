// @ts-nocheck
import React from 'react';import { MdChevronRight } from 'react-icons/md';
import useCategorySelector from "@/lib/hooks/useCategorySelector";
import CategorySelectorModal from "@/components/ui/CategorySelectorModal";

/**
 * CategorySelector Component
 * Permite selección jerárquica de categorías con modal y búsqueda
 */
const CategorySelector = ({
  categories,
  loading,
  error,
  value,
  onChange,
  placeholder = 'Selecciona una categoría',
  disabled = false,
  className = '',
}) => {
  const {
    isOpen,
    currentLevel,
    breadcrumb,
    isTransitioning,
    searchTerm,
    searchResults,
    selectedBreadcrumb,
    openModal,
    closeModal,
    setSearchTerm,
    handleSearchSelect,
    handleCategorySelect,
    handleSelectCurrent,
    handleBreadcrumbClick,
  } = useCategorySelector({ categories, value, onChange });

  // Obtener el breadcrumb completo para una categoría (necesario para el modal)
  const getBreadcrumbForCategory = (category) => {
    if (!category || !categories) return [];
    const path = [];
    const findPath = (cats, targetId) => {
      for (const cat of cats) {
        if (cat.id === targetId) {
          path.unshift(cat);
          return true;
        }
        if (cat.children && findPath(cat.children, targetId)) {
          path.unshift(cat);
          return true;
        }
      }
      return false;
    };
    findPath(categories, category.id);
    return path;
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="input w-full cursor-not-allowed flex items-center">
          <span className="text-gray-500">Cargando categorías...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="input w-full cursor-not-allowed flex items-center">
          <span className="text-red-500">❌ Error al cargar categorías</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Selector visual */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`input w-full cursor-pointer flex items-center justify-between ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        }}
      >
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {selectedBreadcrumb.length > 0 ? (
            <>
              {selectedBreadcrumb.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-1">
                  {index > 0 && (
                    <MdChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-900 truncate">
                    {crumb.name}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <MdChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>

      {/* Modal de selección */}
      <CategorySelectorModal
        isOpen={isOpen}
        onClose={closeModal}
        categories={categories}
        currentLevel={currentLevel}
        breadcrumb={breadcrumb}
        isTransitioning={isTransitioning}
        searchTerm={searchTerm}
        searchResults={searchResults}
        onSearchTermChange={setSearchTerm}
        onSearchSelect={handleSearchSelect}
        onCategorySelect={handleCategorySelect}
        onSelectCurrent={handleSelectCurrent}
        onBreadcrumbClick={handleBreadcrumbClick}
        getBreadcrumbForCategory={getBreadcrumbForCategory}
      />
    </div>
  );
};

export default CategorySelector;
