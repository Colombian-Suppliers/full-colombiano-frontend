'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button/Button';
import { MdExpandMore } from 'react-icons/md';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customerName: string;
  date: string;
  products: string;
  status: string;
  total: number;
}

/**
 * Orders Page
 * Complete order management with filters, tabs, and delivery modal
 */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Load from API
      // const params: Record<string, string> = {};
      // if (activeTab !== 'all') params.status = activeTab;
      // if (searchTerm) params.search = searchTerm;
      // const data = await orderApiService.getOrders(params);
      // setOrders(data.orders || []);
      setOrders([]);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchTerm]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleSetDelivery = (order: Order) => {
    setSelectedOrder(order);
    setDeliveryModal(true);
  };

  const handleSubmitDelivery = async () => {
    if (!selectedOrder || !deliveryDate) return;

    try {
      // TODO: await orderApiService.setDelivery(selectedOrder.id, { ... });
      toast.success('Fecha de entrega establecida');
      setDeliveryModal(false);
      setSelectedOrder(null);
      setDeliveryDate('');
      setDeliveryTime('');
      setDeliveryNotes('');
      loadOrders();
    } catch (error) {
      toast.error('Error al establecer fecha de entrega');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      new_quote_request: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        label: 'Nueva Solicitud de Cotización',
      },
      in_progress: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'En Progreso',
      },
      shipped: { bg: 'bg-green-100', text: 'text-green-800', label: 'Enviada' },
      quote: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Cotización' },
    };

    const config = statusConfig[status] || statusConfig.quote;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium text-center rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getActionButton = (order: Order) => {
    switch (order.status) {
      case 'new_quote_request':
        return (
          <Button size="sm" onClick={() => handleSetDelivery(order)}>
            Establecer Entrega
          </Button>
        );
      case 'in_progress':
        return (
          <Button variant="outline" size="sm">
            Ver Detalles
          </Button>
        );
      case 'shipped':
        return (
          <Button variant="outline" size="sm">
            Rastrear Orden
          </Button>
        );
      case 'quote':
        return (
          <Button variant="outline" size="sm">
            Ver Cotización
          </Button>
        );
      default:
        return (
          <Button variant="outline" size="sm">
            Ver Detalles
          </Button>
        );
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#0d141b] text-3xl font-black leading-tight tracking-[-0.033em]">
                Órdenes y Pedidos
              </p>
              <p className="text-gray-500 text-base font-normal leading-normal">
                Gestiona todas tus órdenes y cotizaciones en un solo lugar.
              </p>
            </div>
            <Button>Crear Nueva Cotización</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'new', label: 'Nuevas' },
              { key: 'in_progress', label: 'En Progreso' },
              { key: 'shipped', label: 'Enviadas' },
              { key: 'quotes', label: 'Cotizaciones' },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-b-primary text-primary'
                    : 'border-b-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                  {tab.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Buscar por ID de orden, nombre de cliente o producto"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" className="flex items-center gap-1">
                Rango de Fechas <MdExpandMore className="ml-1" />
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                Estado <MdExpandMore className="ml-1" />
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                Tipo de Producto <MdExpandMore className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID Orden</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Producto(s)</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No se encontraron órdenes.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        #{order.id}
                      </th>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4">
                        {new Date(order.date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4">{order.products}</td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">${order.total?.toFixed(2)}</td>
                      <td className="px-6 py-4">{getActionButton(order)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delivery Modal */}
      {deliveryModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Establecer Fecha de Entrega Estimada
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Entrega
                </label>
                <input
                  type="date"
                  className="block w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary px-3 py-2 border"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rango de Horas (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="ej. 2 PM - 5 PM"
                  className="block w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary px-3 py-2 border"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Internas
                </label>
                <textarea
                  rows={3}
                  placeholder="Agrega notas sobre esta entrega..."
                  className="block w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary px-3 py-2 border"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeliveryModal(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSubmitDelivery} disabled={!deliveryDate}>
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
