// @ts-nocheck
import React from 'react';import { MetricCard, KPICard } from './ChartComponents';

// Componente de métricas del dashboard
export const DashboardMetrics = ({ stats, className = '' }) => {
  const metrics = [
    {
      title: 'Ventas Totales',
      value: `$${stats.totalSales?.toLocaleString('es-CO') || '0'}`,
      subtitle: 'Este mes',
      icon: '💰',
      color: 'success',
      trend: 'up',
      trendValue: '+12.5%',
    },
    {
      title: 'Productos Activos',
      value: stats.totalProducts || 0,
      subtitle: 'En catálogo',
      icon: '📦',
      color: 'primary',
      trend: 'up',
      trendValue: '+3',
    },
    {
      title: 'Órdenes Pendientes',
      value: stats.pendingOrders || 0,
      subtitle: 'Requieren atención',
      icon: '⏳',
      color: 'warning',
    },
    {
      title: 'Calificación Promedio',
      value: stats.averageRating || 0,
      subtitle: `${stats.totalReviews || 0} reseñas`,
      icon: '⭐',
      color: 'secondary',
      trend: 'up',
      trendValue: '+0.2',
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.title}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MetricCard {...metric} />
        </div>
      ))}
    </div>
  );
};

// Componente de KPIs rápidos
export const QuickKPIs = ({ _stats, className = '' }) => {
  const kpis = [
    {
      title: 'Conversión',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: '📈',
    },
    {
      title: 'Tiempo de Respuesta',
      value: '2.4h',
      change: '-0.3h',
      changeType: 'positive',
      icon: '⚡',
    },
    {
      title: 'Satisfacción',
      value: '94%',
      change: '+2%',
      changeType: 'positive',
      icon: '😊',
    },
    {
      title: 'Retención',
      value: '78%',
      change: '+5%',
      changeType: 'positive',
      icon: '🔄',
    },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {kpis.map((kpi, index) => (
        <div
          key={kpi.title}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <KPICard {...kpi} />
        </div>
      ))}
    </div>
  );
};

// Componente de alertas y notificaciones
export const DashboardAlerts = ({ alerts = [], className = '' }) => {
  if (alerts.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-l-4 animate-fade-in ${
            alert.type === 'warning'
              ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
              : alert.type === 'error'
                ? 'bg-red-50 border-red-400 text-red-800'
                : 'bg-blue-50 border-blue-400 text-blue-800'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {alert.type === 'warning' && '⚠️'}
              {alert.type === 'error' && '❌'}
              {alert.type === 'info' && 'ℹ️'}
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">{alert.title}</h4>
              <p className="text-sm mt-1">{alert.message}</p>
              {alert.action && (
                <button className="text-sm font-medium underline mt-2 hover:no-underline">
                  {alert.action}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
