/**
 * Hook personalizado para cargar categorías de tienda - MOCK VERSION
 * TODO: Replace with real API integration when backend is ready
 */

'use client';

import { useState, useEffect } from 'react';
import { showErrorToast } from '@/utils/toastUtils';

interface StoreCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// Mock store categories data
const mockCategories: StoreCategory[] = [
  { id: 1, name: 'Artesanías', slug: 'artesanias', description: 'Productos artesanales' },
  { id: 2, name: 'Bisutería', slug: 'bisuteria', description: 'Accesorios y bisutería' },
  { id: 3, name: 'Joyería', slug: 'joyeria', description: 'Joyería fina' },
  { id: 4, name: 'Textiles', slug: 'textiles', description: 'Productos textiles' },
  { id: 5, name: 'Cerámica', slug: 'ceramica', description: 'Cerámica artesanal' },
  { id: 6, name: 'Alfarería', slug: 'alfareria', description: 'Productos de alfarería' },
  { id: 7, name: 'Tejeduría', slug: 'tejiduria', description: 'Productos tejidos' },
  { id: 8, name: 'Marroquinería', slug: 'marroquineria', description: 'Productos de cuero' },
  { id: 9, name: 'Madera', slug: 'madera', description: 'Productos de madera' },
  { id: 10, name: 'Alimentos', slug: 'alimentos', description: 'Alimentos artesanales' },
];

/**
 * Hook personalizado para cargar categorías de tienda
 * @returns {Object} - { categories, loading, error }
 */
export const useStoreCategories = () => {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        
        // MOCK: Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // MOCK: Return mock categories
        setCategories(mockCategories);
        setError(null);
      } catch (err) {
        console.error('Error loading store categories:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cargar categorías';
        setError(errorMessage);
        showErrorToast('Error al cargar las categorías de productos');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

