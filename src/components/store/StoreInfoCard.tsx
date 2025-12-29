// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";
import { MdStore, MdVerified } from 'react-icons/md';
import {
  getVerificationStatusStyles,
  getVerificationStatusText,
} from "@/utils/storeUtils";

/**
 * Componente para mostrar información básica de la tienda
 * Principio: Single Responsibility - solo muestra información de la tienda
 */
const StoreInfoCard = ({ store, vendor }) => {
  if (!store) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <MdStore className="text-primary-600 text-xl" />
        <h2 className="text-lg font-semibold">Información de la Tienda</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Tienda
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {store.name || 'No disponible'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Vendedor
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {vendor?.vendor_type === 'legal' ? 'Jurídico' : 'Natural'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de Verificación
          </label>
          <div
            className={`px-3 py-2 border rounded-md font-medium ${getVerificationStatusStyles(store?.verification_status).container}`}
          >
            <div className="flex items-center gap-2">
              <MdVerified className="text-lg" />
              {getVerificationStatusText(store?.verification_status)}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Creación
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {store.created_date
              ? new Date(store.created_date).toLocaleDateString('es-CO')
              : 'No disponible'}
          </div>
        </div>
      </div>

      {/* Enlaces */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Pública
          </label>
          <a
            href={store.frontend_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline text-sm break-all"
          >
            {store.frontend_url || 'No disponible'}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default StoreInfoCard;
