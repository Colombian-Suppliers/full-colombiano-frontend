// @ts-nocheck
import React from 'react';import { MdChevronRight, MdSearch } from 'react-icons/md';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showAlertToast } from "@/utils/toastUtils";

/**
 * Componente del modal para selección de categorías
 * Maneja la UI del modal, búsqueda y navegación jerárquica
 */
const CategorySelectorModal = ({
  isOpen,
  onClose,
  categories,
  breadcrumb,
  isTransitioning,
  searchTerm,
  searchResults,
  onSearchTermChange,
  onSearchSelect,
  onCategorySelect,
  onSelectCurrent,
  onBreadcrumbClick,
  getBreadcrumbForCategory,
}) => {
  // Calcular tamaño dinámico del modal basado en paneles que realmente se renderizan
  const getModalSize = () => {
    // Contar paneles que realmente se van a mostrar:
    // 1. Siempre el panel principal (categorías principales)
    // 2. Solo los paneles del breadcrumb que tienen categorías hijas
    const renderedPanelCount =
      1 +
      breadcrumb.filter((crumb) => crumb.children && crumb.children.length > 0)
        .length;
    const panelCount = Math.min(renderedPanelCount, 4);

    if (panelCount === 1) return 'md';
    if (panelCount === 2) return 'lg';
    if (panelCount === 3) return 'xl';
    return '2xl'; // Para 4 paneles
  };

  // Determinar si una categoría está en el breadcrumb (tiene borde verde oscuro)
  const isCategoryInBreadcrumb = (categoryId) => {
    return breadcrumb.some((cat) => cat.id === categoryId);
  };

  // Validar selección antes de confirmar
  const handleSelectCurrent = () => {
    if (breadcrumb.length === 0) {
      showAlertToast('Por favor selecciona una categoría antes de continuar.');
      return;
    }
    onSelectCurrent();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Seleccionar Categoría"
      size={getModalSize()}
    >
      <div className="flex flex-col max-h-[95vh] h-[550px]">
        {/* Buscador - altura fija */}
        <div className="flex-shrink-0 space-y-4 pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              icon={<MdSearch className="w-5 h-5" />}
              className="w-full"
            />
          </div>

          {/* Resultados de búsqueda */}
          {searchTerm.trim() && (
            <div className="max-h-100 overflow-y-auto border border-gray-200 rounded-md bg-gray-50">
              {searchResults.length > 0 ? (
                searchResults.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onSearchSelect(category)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between transition-colors bg-gray-50"
                  >
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-gray-500">
                      {getBreadcrumbForCategory(category)
                        .map((c) => c.name)
                        .join(' > ')}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50">
                  No se encontraron categorías
                </div>
              )}
            </div>
          )}
        </div>

        {/* Área de navegación - ocupa el espacio restante */}
        {!searchTerm.trim() && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Breadcrumb */}
            {breadcrumb.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 pb-2 mb-2 flex-shrink-0">
                <button
                  onClick={() => onBreadcrumbClick(-1)}
                  className="text-primary-600 hover:underline  cursor-pointer"
                >
                  Inicio
                </button>
                {breadcrumb.map((crumb, index) => (
                  <div key={crumb.id} className="flex items-center gap-2">
                    <MdChevronRight className="w-3 h-3" />
                    <button
                      onClick={() => onBreadcrumbClick(index)}
                      className="text-primary-600 hover:underline  cursor-pointer"
                    >
                      {crumb.name}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Paneles de navegación dinámicos - ocupan el espacio restante */}
            <div className="flex gap-4 flex-1 min-h-0">
              {/* Panel 0: Categorías principales */}
              <div className="flex flex-col min-w-64 flex-1 border border-gray-200 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2 px-3 pt-3 flex-shrink-0">
                  Categorías principales
                </h4>
                <div className="flex-1 overflow-y-auto px-3 pb-3 min-h-0">
                  <div
                    className={`transition-all duration-200 ease-in-out ${
                      isTransitioning
                        ? 'opacity-50 transform scale-95'
                        : 'opacity-100 transform scale-100'
                    }`}
                  >
                    {(categories?.filter((cat) => cat.parent === 0) || []).map(
                      (category) => (
                        <button
                          key={category.id}
                          onClick={() => onCategorySelect(category)}
                          className={`w-full text-left px-3 py-2 hover:bg-green-200 flex items-center justify-between transition-colors rounded-md ${
                            isCategoryInBreadcrumb(category.id)
                              ? 'bg-green-100 text-green-800 border-2 border-green-600'
                              : category.children &&
                                  category.children.length > 0
                                ? 'bg-green-50'
                                : 'bg-gray-100'
                          }`}
                        >
                          <span className="text-sm">{category.name}</span>
                          {category.children &&
                            category.children.length > 0 && (
                              <MdChevronRight
                                className={`w-4 h-4 ${
                                  isCategoryInBreadcrumb(category.id)
                                    ? 'text-green-700'
                                    : 'text-green-500'
                                }`}
                              />
                            )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Paneles dinámicos basados en breadcrumb */}
              {breadcrumb.map((crumb, index) => {
                const panelCategories = crumb.children || [];

                // Solo mostrar panel si tiene categorías
                if (panelCategories.length === 0) return null;

                return (
                  <div
                    key={crumb.id}
                    className="flex flex-col min-w-64 flex-1 max-w-80 border border-gray-200 rounded-md"
                  >
                    <h4 className="text-sm font-medium text-gray-700 mb-2 px-3 pt-3 flex-shrink-0">
                      {index === 0
                        ? `Subcategorías de ${crumb.name}`
                        : `Subcategorías de ${breadcrumb[index - 1]?.name} > ${crumb.name}`}
                    </h4>
                    <div className="flex-1 overflow-y-auto px-3 pb-3 min-h-0">
                      <div
                        className={`transition-all duration-200 ease-in-out ${
                          isTransitioning
                            ? 'opacity-50 transform scale-95'
                            : 'opacity-100 transform scale-100'
                        }`}
                      >
                        {panelCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => onCategorySelect(category)}
                            className={`w-full text-left px-3 py-2 hover:bg-green-200 flex items-center justify-between transition-colors rounded-md ${
                              isCategoryInBreadcrumb(category.id)
                                ? 'bg-green-100 text-green-800 border-2 border-green-600'
                                : category.children &&
                                    category.children.length > 0
                                  ? 'bg-green-50'
                                  : 'bg-gray-100'
                            }`}
                          >
                            <span className="text-sm">{category.name}</span>
                            {category.children &&
                              category.children.length > 0 && (
                                <MdChevronRight
                                  className={`w-4 h-4 ${
                                    isCategoryInBreadcrumb(category.id)
                                      ? 'text-green-700'
                                      : 'text-green-500'
                                  }`}
                                />
                              )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Botón Listo - siempre visible */}
        <div className="flex justify-center pt-4 flex-shrink-0">
          <Button onClick={handleSelectCurrent} className="w-full max-w-xs">
            Listo
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategorySelectorModal;
