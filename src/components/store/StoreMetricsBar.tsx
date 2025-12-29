// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { Card } from "@/components/ui/Card";

const MetricItem = ({ label, value }) => (
  <div className="flex-1 text-center">
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const StoreMetricsBar = ({ stats = {} }) => {
  const {
    visits = 0,
    averageRating = 0,
    totalReviews = 0,
    followers = 0,
  } = stats;
  return (
    <Card className="p-3">
      <div className="flex gap-3 items-center justify-between">
        <MetricItem label="Visitas de la Tienda" value={visits} />
        <MetricItem label="Calificación" value={averageRating} />
        <MetricItem label="Reseñas" value={totalReviews} />
        <MetricItem label="Seguidores" value={followers} />
        <div className="flex-1">
          <div className="text-xs text-gray-500">
            Configuración de tu tienda
          </div>
          <div className="w-full h-3 bg-gray-200 rounded mt-1">
            <div
              className="h-3 bg-green-500 rounded"
              style={{ width: `${stats?.setupProgress || 0}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoreMetricsBar;
