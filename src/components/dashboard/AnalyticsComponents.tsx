// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import {
  MetricBarChart,
  MetricLineChart,
  MetricAreaChart,
  MetricPieChart,
} from './ChartComponents';

// Componente de análisis de ventas
export const SalesAnalytics = ({ _salesData, className = '' }) => {
  const [timeRange, setTimeRange] = useState('30d');

  // Datos de ejemplo para ventas mensuales
  const monthlySales = [
    { name: 'Ene', ventas: 45000, pedidos: 145 },
    { name: 'Feb', ventas: 52000, pedidos: 167 },
    { name: 'Mar', ventas: 48000, pedidos: 152 },
    { name: 'Abr', ventas: 61000, pedidos: 189 },
    { name: 'May', ventas: 55000, pedidos: 173 },
    { name: 'Jun', ventas: 67000, pedidos: 201 },
    { name: 'Jul', ventas: 72000, pedidos: 215 },
    { name: 'Ago', ventas: 69000, pedidos: 208 },
    { name: 'Sep', ventas: 75000, pedidos: 223 },
    { name: 'Oct', ventas: 81000, pedidos: 245 },
    { name: 'Nov', ventas: 78000, pedidos: 234 },
    { name: 'Dic', ventas: 85000, pedidos: 256 },
  ];

  // Datos para categorías de productos
  const categoryData = [
    { name: 'Electrónicos', value: 35, color: 'primary' },
    { name: 'Ropa', value: 25, color: 'secondary' },
    { name: 'Hogar', value: 20, color: 'success' },
    { name: 'Deportes', value: 12, color: 'warning' },
    { name: 'Otros', value: 8, color: 'info' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controles de tiempo */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Análisis de Ventas
        </h3>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7d'
                ? '7 días'
                : range === '30d'
                  ? '30 días'
                  : range === '90d'
                    ? '90 días'
                    : '1 año'}
            </button>
          ))}
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas mensuales */}
        <Card>
          <CardHeader>
            <h4 className="text-base font-semibold text-gray-900">
              Tendencia de Ventas
            </h4>
            <p className="text-sm text-gray-600">Ventas mensuales en COP</p>
          </CardHeader>
          <CardContent>
            <MetricAreaChart
              data={monthlySales}
              dataKey="ventas"
              color="primary"
              height={250}
            />
          </CardContent>
        </Card>

        {/* Gráfico de pedidos */}
        <Card>
          <CardHeader>
            <h4 className="text-base font-semibold text-gray-900">
              Pedidos Mensuales
            </h4>
            <p className="text-sm text-gray-600">Número de pedidos por mes</p>
          </CardHeader>
          <CardContent>
            <MetricBarChart
              data={monthlySales}
              dataKey="pedidos"
              color="secondary"
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      {/* Gráfico circular de categorías */}
      <Card>
        <CardHeader>
          <h4 className="text-base font-semibold text-gray-900">
            Ventas por Categoría
          </h4>
          <p className="text-sm text-gray-600">
            Distribución de ventas por categoría de producto
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <MetricPieChart data={categoryData} height={300} />
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          item.color === 'primary'
                            ? '#46802f'
                            : item.color === 'secondary'
                              ? '#1b5903'
                              : item.color === 'success'
                                ? '#10b981'
                                : item.color === 'warning'
                                  ? '#f59e0b'
                                  : '#3b82f6',
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de métricas de rendimiento
export const PerformanceMetrics = ({ className = '' }) => {
  const performanceData = [
    { name: 'Lun', conversion: 2.8, satisfaction: 92 },
    { name: 'Mar', conversion: 3.1, satisfaction: 94 },
    { name: 'Mié', conversion: 2.9, satisfaction: 91 },
    { name: 'Jue', conversion: 3.4, satisfaction: 96 },
    { name: 'Vie', conversion: 3.2, satisfaction: 93 },
    { name: 'Sáb', conversion: 3.8, satisfaction: 97 },
    { name: 'Dom', conversion: 3.5, satisfaction: 95 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <h4 className="text-base font-semibold text-gray-900">
          Métricas de Rendimiento
        </h4>
        <p className="text-sm text-gray-600">
          Conversión y satisfacción semanal
        </p>
      </CardHeader>
      <CardContent>
        <MetricLineChart
          data={performanceData}
          dataKey="conversion"
          color="primary"
          height={200}
        />
      </CardContent>
    </Card>
  );
};

// Componente de análisis de productos
export const ProductAnalytics = ({ _products = [], className = '' }) => {
  // Datos de ejemplo para productos más vendidos
  const topProducts = [
    { name: 'iPhone 15 Pro', ventas: 12500000, unidades: 45 },
    { name: 'MacBook Air', ventas: 9800000, unidades: 32 },
    { name: 'iPad Pro', ventas: 7500000, unidades: 28 },
    { name: 'AirPods Pro', ventas: 5200000, unidades: 85 },
    { name: 'Apple Watch', ventas: 4800000, unidades: 62 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <h4 className="text-base font-semibold text-gray-900">
          Productos Más Vendidos
        </h4>
        <p className="text-sm text-gray-600">Top 5 productos por ingresos</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.unidades} unidades
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${product.ventas.toLocaleString('es-CO')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesAnalytics;
