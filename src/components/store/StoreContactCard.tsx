// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const StoreContactCard = ({ store = {}, onSave }) => {
  const [phone, setPhone] = useState(store.phone || '');
  const [email, setEmail] = useState(store.email || '');
  const [invoice, setInvoice] = useState(
    Boolean(store.issues_electronic_invoice)
  );

  const save = () => {
    onSave?.({ phone, email, issues_electronic_invoice: invoice });
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Contacto de la Tienda</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600">
            Teléfono de la Tienda
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600">
            Correo electrónico de la tienda
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-600">
              Facturación electrónica
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={invoice}
              onChange={(e) => setInvoice(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-9 h-5 bg-gray-200 rounded-full ${invoice ? 'bg-green-500' : ''}`}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button onClick={save} size="sm">
            Actualizar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StoreContactCard;
