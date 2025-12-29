/**
 * Store API Service
 * Servicio para manejar operaciones relacionadas con tiendas
 * MOCK VERSION - Replace with real API calls when backend is ready
 */

import { httpClient } from '@/lib/api/httpClient';

/**
 * Mock Store API Service
 * Simula llamadas a la API de tiendas
 */
export const storeApiService = {
  /**
   * Obtiene información de una tienda
   * @param {number} storeId - ID de la tienda
   * @returns {Promise<Object>} Datos de la tienda
   */
  async getStore(storeId) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Return mock data
      return {
        data: {
          id: storeId,
          name: 'Mi Tienda',
          description: 'Descripción de mi tienda',
          logo: '/logo.svg',
          banner: '/images/landing/banner-bg.webp',
          phone: '+57 300 123 4567',
          email: 'tienda@ejemplo.com',
          address: 'Calle 123 #45-67',
          city: 'Bogotá',
          department: 'Cundinamarca',
          categories: [1, 2, 3],
          verificationStatus: 'verified',
          rating: 4.5,
          totalSales: 150,
          createdAt: '2024-01-01T00:00:00Z',
        },
      };
    } catch (error) {
      console.error(`Error fetching store ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Actualiza información de una tienda
   * @param {number} storeId - ID de la tienda
   * @param {Object} storeData - Datos actualizados de la tienda
   * @returns {Promise<Object>} Tienda actualizada
   */
  async updateStore(storeId, storeData) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK: Return mock data
      return {
        data: {
          id: storeId,
          ...storeData,
          updatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(`Error updating store ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene las categorías de una tienda
   * @param {number} storeId - ID de la tienda
   * @returns {Promise<Array>} Lista de categorías
   */
  async getStoreCategories(storeId) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // MOCK: Return mock data
      return {
        data: [
          { id: 1, name: 'Electrónica', parent: 0, children: [] },
          { id: 2, name: 'Ropa', parent: 0, children: [] },
          { id: 3, name: 'Hogar', parent: 0, children: [] },
          { id: 4, name: 'Deportes', parent: 0, children: [] },
          { id: 5, name: 'Libros', parent: 0, children: [] },
        ],
      };
    } catch (error) {
      console.error(`Error fetching store categories for ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Actualiza las categorías de una tienda
   * @param {number} storeId - ID de la tienda
   * @param {Array<number>} categoryIds - IDs de las categorías
   * @returns {Promise<Object>} Confirmación de actualización
   */
  async updateStoreCategories(storeId, categoryIds) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // MOCK: Return mock data
      return {
        data: {
          message: 'Categorías actualizadas exitosamente',
          storeId,
          categoryIds,
        },
      };
    } catch (error) {
      console.error(`Error updating store categories for ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene las estadísticas de una tienda
   * @param {number} storeId - ID de la tienda
   * @returns {Promise<Object>} Estadísticas de la tienda
   */
  async getStoreStats(storeId) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Return mock data
      return {
        data: {
          totalProducts: 45,
          totalSales: 150,
          totalRevenue: 7500000,
          averageRating: 4.5,
          totalReviews: 87,
          activeOrders: 12,
          completedOrders: 138,
          visitors: 1234,
          conversionRate: 3.2,
        },
      };
    } catch (error) {
      console.error(`Error fetching store stats for ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Sube el logo de la tienda
   * @param {number} storeId - ID de la tienda
   * @param {File} logoFile - Archivo del logo
   * @returns {Promise<Object>} URL del logo subido
   */
  async uploadStoreLogo(storeId, logoFile) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // MOCK: Return mock data
      return {
        data: {
          logoUrl: `https://via.placeholder.com/200x200?text=Store+${storeId}+Logo`,
        },
      };
    } catch (error) {
      console.error(`Error uploading store logo for ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Sube el banner de la tienda
   * @param {number} storeId - ID de la tienda
   * @param {File} bannerFile - Archivo del banner
   * @returns {Promise<Object>} URL del banner subido
   */
  async uploadStoreBanner(storeId, bannerFile) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // MOCK: Return mock data
      return {
        data: {
          bannerUrl: `https://via.placeholder.com/1200x400?text=Store+${storeId}+Banner`,
        },
      };
    } catch (error) {
      console.error(`Error uploading store banner for ${storeId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene todas las tiendas (para admin)
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Promise<Array>} Lista de tiendas
   */
  async getAllStores(filters = {}) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // MOCK: Return mock data
      return {
        data: [
          {
            id: 1,
            name: 'Tienda 1',
            verificationStatus: 'verified',
            totalProducts: 45,
            rating: 4.5,
          },
          {
            id: 2,
            name: 'Tienda 2',
            verificationStatus: 'pending',
            totalProducts: 12,
            rating: 4.2,
          },
          {
            id: 3,
            name: 'Tienda 3',
            verificationStatus: 'in_review',
            totalProducts: 28,
            rating: 4.7,
          },
        ],
        pagination: {
          total: 3,
          page: 1,
          perPage: 10,
          totalPages: 1,
        },
      };
    } catch (error) {
      console.error('Error fetching all stores:', error);
      throw error;
    }
  },

  /**
   * Busca tiendas por término
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Array>} Lista de tiendas encontradas
   */
  async searchStores(searchTerm) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // MOCK: Return mock data
      return {
        data: [
          {
            id: 1,
            name: `Resultado para: ${searchTerm}`,
            description: 'Tienda encontrada',
            rating: 4.5,
            totalProducts: 45,
          },
        ],
      };
    } catch (error) {
      console.error('Error searching stores:', error);
      throw error;
    }
  },
};

export default storeApiService;

