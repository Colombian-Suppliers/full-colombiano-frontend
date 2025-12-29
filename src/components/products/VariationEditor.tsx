// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const VariationEditor = ({ variation, onClose, onSave }) => {
  const [price, setPrice] = useState(variation.price ?? '');
  const [inventory, setInventory] = useState(variation.inventory ?? 0);
  const [sku, setSku] = useState(variation.sku ?? '');

  const handleSave = () => {
    if (inventory === '' || inventory === null) {
      alert('El inventario es obligatorio para variaciones activas');
      return;
    }
    const updated = {
      ...variation,
      price: price ? parseFloat(price) : null,
      inventory: Number(inventory),
      sku,
    };
    if (onSave) onSave(updated);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Variación: ${variation.attributes.map((a) => a.value).join(' / ')}`}
      size="md"
      headerVariant="brand"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm font-medium">Precio</label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm font-medium">Inventario</label>
          <Input
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm font-medium">
            SKU (Stock Keeping Unit)
          </label>
          <Input value={sku} onChange={(e) => setSku(e.target.value)} />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default VariationEditor;
