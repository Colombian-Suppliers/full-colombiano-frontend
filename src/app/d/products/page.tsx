'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { LoadingSpinner, StatusBadge, PageHeader, EmptyState } from '@/components/common';
import {
  MdSearch,
  MdExpandMore,
  MdFileUpload,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdMoreHoriz,
  MdAdd,
} from 'react-icons/md';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  short_description?: string;
  price: number;
  status: string;
  stock: number;
  images?: string[];
  sku?: string;
}

/**
 * Products Page
 * Complete product management with table view, filters, and pagination
 * Based on cosp-app requirements
 */
export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Load from API
      // const params: Record<string, string> = {};
      // if (searchTerm) params.search = searchTerm;
      // if (activeFilter !== 'all') params.status = activeFilter;
      // const data = await productApiService.getSellerProducts(params);
      // setProducts(data.products || []);
      setProducts([]);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Filter products based on activeFilter and searchTerm
  const filteredProducts = products.filter((p) => {
    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchesTitle = (p.title || '').toLowerCase().includes(q);
      const matchesSku = (p.sku || '').toLowerCase().includes(q);
      if (!matchesTitle && !matchesSku) return false;
    }

    // Status filters
    if (activeFilter === 'all') return true;
    if (activeFilter === 'published')
      return p.status === 'published' || p.status === 'Publicado';
    if (activeFilter === 'draft')
      return p.status === 'draft' || p.status === 'Borrador';
    if (activeFilter === 'low_stock')
      return typeof p.stock === 'number' && p.stock > 0 && p.stock <= 5;
    if (activeFilter === 'out_of_stock')
      return typeof p.stock === 'number' && p.stock === 0;
    if (activeFilter === 'suspended')
      return p.status === 'suspended' || p.status === 'Suspendido';

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (productId: string) => {
    router.push(`/d/products/${productId}`);
  };

  const handleEdit = (productId: string) => {
    router.push(`/d/products/${productId}/edit`);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        // TODO: await productApiService.deleteProduct(productId);
        toast.success('Producto eliminado');
        loadProducts();
      } catch (error) {
        toast.error('Error al eliminar producto');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner centered size="lg" message="Cargando productos..." />;
  }

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-[32px] font-black text-gray-900 leading-tight tracking-tight">
                Gestión de Productos
              </h1>
              <p className="text-gray-600 mt-1">
                Agrega y edita tus productos. Gestiona sus inventarios.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                variant="outline"
                className="h-12 flex items-center gap-2"
              >
                <MdFileUpload className="w-5 h-5" />
                Importar
              </Button>
              <Button
                variant="primary"
                className="h-12 flex items-center gap-2"
                onClick={() => router.push('/d/products/add')}
              >
                <MdAdd className="w-5 h-5" />
                Añadir producto
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {products.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex-grow w-full md:w-auto max-w-md">
              <div className="relative">
                <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  className="pl-12 h-12 w-full"
                  placeholder="Buscar por nombre de producto o SKU"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto">
              <Button
                variant="outline"
                className="h-12 flex items-center gap-1"
              >
                <span>Estado</span>
                <MdExpandMore className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="h-12 flex items-center gap-1"
              >
                <span>Categoría</span>
                <MdExpandMore className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="h-12 flex items-center gap-1"
              >
                <span>Nivel de Stock</span>
                <MdExpandMore className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table or Empty State */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        {products.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              No tienes productos aún
            </h2>
            <p className="text-gray-600 mb-6">
              Comienza agregando tu primer producto para venderlo en el marketplace
            </p>
            <Button
              onClick={() => router.push('/d/products/add')}
              className="flex items-center gap-2 mx-auto"
            >
              <MdAdd className="w-5 h-5" />
              Agregar Producto
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-6 overflow-x-auto">
                {[
                  { key: 'all', label: 'Todos' },
                  { key: 'published', label: 'Publicados' },
                  { key: 'draft', label: 'Borrador' },
                  { key: 'low_stock', label: 'Inventario bajo' },
                  { key: 'out_of_stock', label: 'Agotados' },
                  { key: 'suspended', label: 'Suspendidos' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveFilter(tab.key);
                      setCurrentPage(1);
                    }}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === tab.key
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      PRODUCTO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      PRECIO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      INVENTARIO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.images?.[0] || '/placeholder-product.png'
                            }
                            alt={product.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                            {product.short_description && (
                              <div className="text-xs text-gray-500 line-clamp-1">
                                {product.short_description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.price
                          ? `$${Number(product.price).toLocaleString()}`
                          : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={product.status === 'published' || product.status === 'Publicado' ? 'approved' : 'pending'}
                          statusConfig={{
                            approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Publicado' },
                            pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Borrador' },
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.stock ?? 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(product.id)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Ver"
                          >
                            <MdRemoveRedEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Editar"
                          >
                            <MdEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Eliminar"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Más opciones"
                          >
                            <MdMoreHoriz className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer: Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <select
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">
                  Productos por página
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} Productos – Página {currentPage} de{' '}
                {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                <div className="text-sm text-gray-700 px-2">{currentPage}</div>
                <button
                  className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
