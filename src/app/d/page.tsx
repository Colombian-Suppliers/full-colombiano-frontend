'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { StatCard, AlertItem, LoadingSpinner } from '@/components/common';
import {
  MdCheckCircle,
  MdLocalShipping,
  MdWarning,
  MdQuestionAnswer,
  MdUndo,
  MdSearch,
  MdFilterList,
  MdShowChart,
  MdBarChart,
  MdNotifications,
  MdVerified,
  MdAttachMoney,
} from 'react-icons/md';
import { FaBoxOpen, FaBullhorn, FaShoppingBag } from 'react-icons/fa';

interface Stats {
  totalSales: number;
  totalProducts: number;
  pendingOrders: number;
  totalReviews: number;
  averageRating: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}

interface Product {
  id: string;
  title: string;
  stock: number;
  images: string[];
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  userId: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalProducts: 0,
    pendingOrders: 0,
    totalReviews: 0,
    averageRating: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'resumen' | 'notificaciones'>('resumen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Load from API
      // Mock data for now
      setStats({
        totalSales: 1250000,
        totalProducts: 45,
        pendingOrders: 8,
        totalReviews: 23,
        averageRating: 4.5,
      });
      
      setRecentOrders([]);
      setLowStockProducts([]);
      setNotifications([]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner centered size="lg" message="Cargando dashboard..." />;
  }

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Escritorio</h1>
            <p className="text-gray-600 mt-1">
              Encuentra una vista general del Centro de vendedores
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-sm font-medium">
              <MdCheckCircle className="text-green-600" />
              Tienda verificada
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-sm font-medium">
              Activa
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`pb-3 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'resumen'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdShowChart /> Resumen
            </button>
            <button
              onClick={() => setActiveTab('notificaciones')}
              className={`pb-3 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'notificaciones'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MdNotifications /> Notificaciones
            </button>
          </div>
        </div>

        {activeTab === 'resumen' && (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard
                title="Ventas"
                value={`$${stats.totalSales.toLocaleString()}`}
                subtitle="Hoy"
              />
              <StatCard
                title="Pedidos"
                value={stats.pendingOrders}
                subtitle="Hoy"
              />
              <StatCard
                title="Pedidos por despachar"
                value={stats.pendingOrders}
                subtitle="Requieren atención"
              />
              <StatCard title="Pedidos en tránsito" value="0" subtitle="" />
              <StatCard title="Saldo Disponible" value="$0" subtitle="" />
              <StatCard
                title="Próxima fecha de retiro"
                value="25/11"
                subtitle=""
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Section */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button className="px-4 py-1 bg-white rounded shadow-sm text-sm font-medium text-gray-800">
                      Ventas
                    </button>
                    <button className="px-4 py-1 text-sm font-medium text-gray-600 hover:text-gray-800">
                      Pedidos
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white">
                      <option>Semanal</option>
                      <option>Mensual</option>
                      <option>Anual</option>
                    </select>
                    <div className="flex gap-1 text-gray-400">
                      <MdShowChart className="text-gray-600 cursor-pointer" />
                      <MdBarChart className="cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 relative border-l border-b border-gray-200 mt-4">
                  {/* Y-Axis Labels */}
                  <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    <span>$5000</span>
                    <span>$3750</span>
                    <span>$2500</span>
                    <span>$1250</span>
                  </div>
                  {/* Grid Lines */}
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                  </div>
                  {/* X-Axis Labels */}
                  <div className="absolute -bottom-6 left-0 w-full flex justify-between text-xs text-gray-400 px-4">
                    <span>1</span>
                    <span>8</span>
                    <span>15</span>
                    <span>22</span>
                  </div>
                  <div className="absolute -bottom-10 w-full text-center text-xs text-gray-400">
                    Diciembre 2025
                  </div>
                  {/* Mock Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 opacity-20 rounded-full"></div>
                </div>
              </div>

              {/* Avisos Importantes */}
              <div className="lg:col-span-1 border border-green-100 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-green-100 px-4 py-3 flex items-center gap-2">
                  <MdNotifications className="text-green-800" />
                  <h3 className="font-semibold text-green-900">
                    Avisos importantes
                  </h3>
                </div>
                <div className="p-4 space-y-3 bg-green-50 h-full">
                  <AlertItem
                    icon={MdVerified}
                    text="Aún no has realizado la verificación de tu tienda"
                    colorClass="text-white"
                    iconBgClass="bg-green-700"
                  />
                  <AlertItem
                    icon={MdLocalShipping}
                    text="Pedidos pendientes por despachar"
                    count={stats.pendingOrders || 3}
                    colorClass="text-white"
                    iconBgClass="bg-green-700"
                  />
                  <AlertItem
                    icon={MdQuestionAnswer}
                    text="Preguntas pendientes de responder"
                    count={2}
                    colorClass="text-white"
                    iconBgClass="bg-green-700"
                  />
                  <AlertItem
                    icon={MdWarning}
                    text="Productos con bajo inventario"
                    count={lowStockProducts.length || 5}
                    colorClass="text-white"
                    iconBgClass="bg-green-700"
                  />
                  <AlertItem
                    icon={MdUndo}
                    text="Solicitudes de devolución"
                    count={1}
                    colorClass="text-white"
                    iconBgClass="bg-green-700"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pedidos Recientes */}
              <div className="border border-green-100 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-green-100 px-4 py-3">
                  <h3 className="font-bold text-gray-900">Pedidos recientes</h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-green-50 text-gray-700 text-sm">
                          <th className="py-2 px-3 rounded-l-md">Pedido</th>
                          <th className="py-2 px-3">Estado</th>
                          <th className="py-2 px-3">Monto</th>
                          <th className="py-2 px-3 rounded-r-md">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {recentOrders.slice(0, 4).map((order) => (
                          <tr key={order.id} className="text-sm">
                            <td className="py-3 px-3 font-medium text-gray-600">
                              #{order.id}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              {order.status === 'pending'
                                ? 'Pago en verificación'
                                : order.status === 'delivered'
                                  ? 'Entregado'
                                  : order.status}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              ${order.total.toLocaleString()}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                        {recentOrders.length === 0 && (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-4 text-center text-gray-500"
                            >
                              No hay pedidos recientes
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="primary"
                      className="bg-green-700 hover:bg-green-800 w-full md:w-auto"
                      onClick={() => router.push('/d/orders')}
                    >
                      Ir a pedidos
                    </Button>
                  </div>
                </div>
              </div>

              {/* Productos con bajo inventario */}
              <div className="border border-green-100 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-green-100 px-4 py-3">
                  <h3 className="font-bold text-gray-900">
                    Productos con inventario bajo
                  </h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-green-50 text-gray-700 text-sm">
                          <th className="py-2 px-3 rounded-l-md">Producto</th>
                          <th className="py-2 px-3 text-center">Estado</th>
                          <th className="py-2 px-3 text-center rounded-r-md">
                            Inventario
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {lowStockProducts.slice(0, 4).map((product) => (
                          <tr key={product.id} className="text-sm">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex-shrink-0 overflow-hidden">
                                  <img
                                    src={product.images[0] || '/placeholder.png'}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-gray-600 truncate max-w-[150px]">
                                  {product.title}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  product.stock === 0
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {product.stock === 0
                                  ? 'Agotado'
                                  : 'Inventario bajo'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center text-gray-600">
                              {product.stock}
                            </td>
                          </tr>
                        ))}
                        {lowStockProducts.length === 0 && (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-4 text-center text-gray-500"
                            >
                              No hay productos con bajo inventario
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="primary"
                      className="bg-green-700 hover:bg-green-800 w-full md:w-auto"
                      onClick={() => router.push('/d/products')}
                    >
                      Ir a productos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notificaciones' && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <select className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                  <option>Más recientes primero</option>
                  <option>Más antiguos primero</option>
                </select>

                <button className="flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-50">
                  <MdFilterList /> Filtrar
                </button>
              </div>
            </div>

            {/* Notifications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-green-100 text-gray-700 text-sm">
                    <th className="py-3 px-4 rounded-l-md">Tipo</th>
                    <th className="py-3 px-4">Mensaje</th>
                    <th className="py-3 px-4 rounded-r-md text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <tr
                      key={notification.id}
                      className="text-sm hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 font-medium text-gray-800">
                          {notification.type === 'order' && (
                            <FaBoxOpen className="text-orange-500" />
                          )}
                          {notification.type === 'payment' && (
                            <MdAttachMoney className="text-yellow-600 text-lg" />
                          )}
                          {notification.type === 'announcement' && (
                            <FaBullhorn className="text-yellow-500" />
                          )}
                          {notification.type === 'product' && (
                            <FaShoppingBag className="text-blue-500" />
                          )}
                          {notification.type === 'verification' && (
                            <MdVerified className="text-green-500" />
                          )}
                          <span>{notification.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {notification.message}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {notifications.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-8 text-center text-gray-500"
                      >
                        No tienes notificaciones
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
