// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";
import { MdBusiness } from 'react-icons/md';

/**
 * Componente para mostrar información de la empresa (solo para vendedores jurídicos)
 * Principio: Single Responsibility - solo muestra información de la empresa
 */
const CompanyInfoCard = ({ company }) => {
  if (!company) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <MdBusiness className="text-primary-600 text-xl" />
        <h2 className="text-lg font-semibold">Información de la Empresa</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Empresa
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {company.name || 'No disponible'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Persona
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {company.type === 'legal' ? 'Jurídica' : 'Natural'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facturación Electrónica
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {company.issues_electronic_invoice ? 'Habilitada' : 'Deshabilitada'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfoCard;
