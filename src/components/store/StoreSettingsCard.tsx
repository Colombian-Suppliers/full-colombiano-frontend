// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";

/**
 * Componente para mostrar configuración rápida de la tienda
 * Principio: Single Responsibility - solo muestra configuración
 */
const StoreSettingsCard = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Configuración Rápida</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Tienda Visible</h3>
            <p className="text-xs text-gray-600">
              Los compradores pueden ver tu tienda
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Pedidos Automáticos</h3>
            <p className="text-xs text-gray-600">
              Aceptar pedidos automáticamente
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Notificaciones</h3>
            <p className="text-xs text-gray-600">
              Recibir notificaciones por email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Estas configuraciones estarán disponibles próximamente
      </p>
    </Card>
  );
};

export default StoreSettingsCard;
