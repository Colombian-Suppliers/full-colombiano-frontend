// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { Card } from "@/components/ui/Card";
import { MdPerson } from 'react-icons/md';

const PersonalInfoCard = ({ vendor = {} }) => {
  if (!vendor) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <MdPerson className="text-primary-600 text-xl" />
        <h3 className="text-lg font-semibold">Información Personal</h3>
      </div>
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Nombre:</span>
          <span>{vendor?.firstName || vendor?.name || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Apellidos:</span>
          <span>{vendor?.lastName || vendor?.surname || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tipo de documento:</span>
          <span>{vendor?.documentType || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Número de documento:</span>
          <span>{vendor?.documentNumber || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Correo electrónico:</span>
          <span>{vendor?.email || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Dirección residencia:</span>
          <span>{vendor?.address || '-'}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Teléfono personal:</span>
          <span>{vendor?.phone || '-'}</span>
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
