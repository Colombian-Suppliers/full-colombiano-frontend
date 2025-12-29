// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";
import { MdLocationOn } from 'react-icons/md';

/**
 * Componente para mostrar la dirección de la tienda
 * Principio: Single Responsibility - solo muestra información de dirección
 */
const AddressCard = ({ address }) => {
  if (!address) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <MdLocationOn className="text-primary-600 text-xl" />
        <h2 className="text-lg font-semibold">Dirección de la Tienda</h2>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {address.department || 'No disponible'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {address.city || 'No disponible'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código postal
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {address.zip || 'No disponible'}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección Línea 1
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {address.line_1 || 'No disponible'}
          </div>
        </div>

        {address.line_2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección Línea 2
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {address.line_2}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
