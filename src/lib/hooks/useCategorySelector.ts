/**
 * Hook personalizado para manejar la lógica de selección de categorías
 * Maneja navegación jerárquica, búsqueda y estado del modal
 */

'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  parent: number;
  children?: Category[];
}

interface UseCategorySelectorProps {
  categories: Category[];
  value: number | null;
  onChange: (categoryId: number) => void;
}

const useCategorySelector = ({ categories, value, onChange }: UseCategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Category[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<Category[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Category[]>([]);

  // Inicializar con categorías principales cuando cambian
  useEffect(() => {
    if (categories && categories.length > 0) {
      const rootCategories = categories.filter((cat) => cat.parent === 0);
      setCurrentLevel(rootCategories);
      if (value) {
        const selectedCat = getSelectedCategory();
        if (selectedCat) {
          setBreadcrumb(getBreadcrumbForCategory(selectedCat));
        } else {
          setBreadcrumb([]);
        }
      } else {
        setBreadcrumb([]);
      }
    }
  }, [categories, value]); // eslint-disable-line react-hooks/exhaustive-deps

  // Efecto para búsqueda
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchCategories(categories, searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, categories]);

  // Función de búsqueda recursiva
  const searchCategories = (cats: Category[], term: string): Category[] => {
    const results: Category[] = [];
    const regex = new RegExp(`^${term}`, 'i');
    const searchInCategories = (categoriesList: Category[]) => {
      for (const cat of categoriesList) {
        if (regex.test(cat.name)) {
          results.push(cat);
        }
        if (cat.children) {
          searchInCategories(cat.children);
        }
      }
    };
    searchInCategories(cats);
    return results;
  };

  // Abrir modal
  const openModal = () => {
    if (categories && categories.length > 0) {
      const rootCategories = categories.filter((cat) => cat.parent === 0);
      if (value) {
        const selectedCat = getSelectedCategory();
        if (selectedCat) {
          const fullBreadcrumb = getBreadcrumbForCategory(selectedCat);
          if (selectedCat.children && selectedCat.children.length > 0) {
            setCurrentLevel(selectedCat.children);
          } else {
            setCurrentLevel([]);
          }
          setBreadcrumb(fullBreadcrumb);
        } else {
          setCurrentLevel(rootCategories);
          setBreadcrumb([]);
        }
      } else {
        setCurrentLevel(rootCategories);
        setBreadcrumb([]);
      }
      setSearchTerm('');
      setIsOpen(true);
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setIsOpen(false);
    setCurrentLevel([]);
    setSearchTerm('');
    setSearchResults([]);
  };

  // Seleccionar categoría desde búsqueda
  const handleSearchSelect = (category: Category) => {
    onChange(category.id);
    closeModal();
  };

  // Manejar selección de categoría en navegación
  const handleCategorySelect = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        const rootCategories = categories?.filter((c) => c.parent === 0) || [];
        const isFromRootPanel = rootCategories.some(
          (rootCat) => rootCat.id === category.id
        );

        if (isFromRootPanel) {
          setBreadcrumb([category]);
          setCurrentLevel(category.children);
        } else {
          const categoryBelongsToCurrentTree = breadcrumb.some((crumb) => {
            return crumb.children?.some((child) => child.id === category.id);
          });

          if (categoryBelongsToCurrentTree) {
            const parentIndex = breadcrumb.findIndex((crumb) =>
              crumb.children?.some((child) => child.id === category.id)
            );

            if (parentIndex !== -1) {
              const newBreadcrumb = breadcrumb.slice(0, parentIndex + 1);
              setBreadcrumb([...newBreadcrumb, category]);
              setCurrentLevel(category.children);
            }
          } else {
            const fullPath = getBreadcrumbForCategory(category);
            setBreadcrumb(fullPath);
            setCurrentLevel(category.children);
          }
        }
        setIsTransitioning(false);
      }, 150);
    } else {
      onChange(category.id);
      closeModal();
    }
  };

  // Seleccionar categoría actual con botón Listo
  const handleSelectCurrent = () => {
    if (breadcrumb.length > 0) {
      const lastCategory = breadcrumb[breadcrumb.length - 1];
      onChange(lastCategory.id);
      closeModal();
    }
  };

  // Navegar a un nivel del breadcrumb
  const handleBreadcrumbClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (index === -1) {
        const rootCategories = categories.filter((cat) => cat.parent === 0);
        setCurrentLevel(rootCategories);
        setBreadcrumb([]);
      } else {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        const targetCategory = newBreadcrumb[newBreadcrumb.length - 1];
        setCurrentLevel(targetCategory.children || []);
        setBreadcrumb(newBreadcrumb);
      }
      setIsTransitioning(false);
    }, 150);
  };

  // Obtener la categoría seleccionada por ID
  const getSelectedCategory = (): Category | null => {
    if (!value || !categories) return null;
    const findCategory = (cats: Category[]): Category | null => {
      for (const cat of cats) {
        if (cat.id === value) return cat;
        if (cat.children) {
          const found = findCategory(cat.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findCategory(categories);
  };

  // Obtener el breadcrumb completo para una categoría
  const getBreadcrumbForCategory = (category: Category): Category[] => {
    if (!category || !categories) return [];
    const path: Category[] = [];
    const findPath = (cats: Category[], targetId: number): boolean => {
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

  const selectedCategory = getSelectedCategory();
  const selectedBreadcrumb = selectedCategory
    ? getBreadcrumbForCategory(selectedCategory)
    : [];

  return {
    // Estado
    isOpen,
    currentLevel,
    breadcrumb,
    isTransitioning,
    searchTerm,
    searchResults,
    selectedBreadcrumb,

    // Funciones
    openModal,
    closeModal,
    setSearchTerm,
    handleSearchSelect,
    handleCategorySelect,
    handleSelectCurrent,
    handleBreadcrumbClick,
  };
};

export default useCategorySelector;

