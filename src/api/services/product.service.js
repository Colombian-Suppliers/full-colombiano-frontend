/**
 * Product API Service
 * Servicio para manejar operaciones relacionadas con productos
 * MOCK VERSION - Replace with real API calls when backend is ready
 */

import { httpClient } from '@/lib/api/httpClient';

/**
 * Mock Product API Service
 * Simula llamadas a la API de productos
 */
export const productApiService = {
  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>} Lista de productos
   */
  async getAllProducts() {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Return mock data
      return {
        data: [
          {
            id: 1,
            name: 'Producto de Ejemplo 1',
            description: 'Descripción del producto 1',
            price: 50000,
            stock: 10,
            category: 'Electrónica',
            images: [],
          },
          {
            id: 2,
            name: 'Producto de Ejemplo 2',
            description: 'Descripción del producto 2',
            price: 75000,
            stock: 5,
            category: 'Ropa',
            images: [],
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Datos del producto
   */
  async getProductById(id) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // MOCK: Return mock data
      return {
        data: {
          id,
          name: `Producto ${id}`,
          description: `Descripción del producto ${id}`,
          price: 50000,
          stock: 10,
          category: 'Electrónica',
          images: [],
        },
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async createProduct(productData) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK: Return mock data
      return {
        data: {
          id: Date.now(),
          ...productData,
          createdAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Actualiza un producto existente
   * @param {number} id - ID del producto
   * @param {Object} productData - Datos actualizados del producto
   * @returns {Promise<Object>} Producto actualizado
   */
  async updateProduct(id, productData) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK: Return mock data
      return {
        data: {
          id,
          ...productData,
          updatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Elimina un producto
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async deleteProduct(id) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Return mock data
      return {
        data: {
          message: 'Producto eliminado exitosamente',
          id,
        },
      };
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Busca productos por término
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Array>} Lista de productos encontrados
   */
  async searchProducts(searchTerm) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // MOCK: Return mock data
      return {
        data: [
          {
            id: 1,
            name: `Resultado para: ${searchTerm}`,
            description: 'Producto encontrado',
            price: 50000,
            stock: 10,
            category: 'Varios',
            images: [],
          },
        ],
      };
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  /**
   * Obtiene productos por categoría
   * @param {string} categoryId - ID de la categoría
   * @returns {Promise<Array>} Lista de productos de la categoría
   */
  async getProductsByCategory(categoryId) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Return mock data
      return {
        data: [
          {
            id: 1,
            name: 'Producto de Categoría',
            description: 'Producto de la categoría seleccionada',
            price: 50000,
            stock: 10,
            category: categoryId,
            images: [],
          },
        ],
      };
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  },

  /**
   * Sube imágenes de producto
   * @param {number} productId - ID del producto
   * @param {Array<File>} images - Archivos de imagen
   * @returns {Promise<Object>} URLs de las imágenes subidas
   */
  async uploadProductImages(productId, images) {
    try {
      // MOCK: Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // MOCK: Return mock data
      return {
        data: {
          images: images.map((_, index) => ({
            id: Date.now() + index,
            url: `https://via.placeholder.com/400x400?text=Product+${productId}+Image+${index + 1}`,
            thumbnail: `https://via.placeholder.com/150x150?text=Thumb+${index + 1}`,
          })),
        },
      };
    } catch (error) {
      console.error('Error uploading product images:', error);
      throw error;
    }
  },
};

export default productApiService;

