// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";

/**
 * Componente para mostrar estadísticas de la tienda
 * Principio: Single Responsibility - solo muestra estadísticas
 */
const StoreStatsCard = ({ categoriesCount = 0 }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-600">
            {categoriesCount}
          </div>
          <div className="text-sm text-gray-600">Categorías</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-600">Productos</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600">Ventas</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">0</div>
          <div className="text-sm text-gray-600">Calificación</div>
        </div>
      </div>
    </Card>
  );
};

export default StoreStatsCard;
