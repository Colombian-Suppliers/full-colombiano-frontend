// @ts-nocheck
import React from 'react';import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import VariationEditor from '@/components/products/VariationEditor.jsx';

const cartesian = (arrays) => {
  if (!arrays.length) return [];
  return arrays.reduce(
    (a, b) => a.flatMap((d) => b.map((e) => [...d, e])),
    [[]]
  );
};

const VariationsManager = ({ attributes = [], active = false, onToggle }) => {
  const [enabled, setEnabled] = useState(active);
  const [variations, setVariations] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setEnabled(active);
  }, [active]);

  useEffect(() => {
    if (!enabled) return;
    // generar combinaciones a partir de atributos
    const valuesArrays = attributes.map((a) =>
      a.values.map((v) => ({
        attributeId: a.id,
        attributeName: a.name,
        valueId: v.id,
        value: v.value,
      }))
    );
    const combos = cartesian(valuesArrays);
    const next = combos.map((combo, i) => ({
      id: `v-${i}-${combo.map((c) => c.value).join('-')}`,
      attributes: combo,
      price: null,
      inventory: 0,
      sku: '',
    }));
    setVariations(next);
  }, [attributes, enabled]);

  const toggle = () => {
    const v = !enabled;
    setEnabled(v);
    if (onToggle) onToggle(v);
    if (!v) setVariations([]);
  };

  const handleSaveVariation = (updated) => {
    setVariations((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditing(null);
  };

  return (
    <div className="p-3 border rounded bg-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-700">Variaciones</div>
          <div className="text-xs text-gray-500">
            Activa para gestionar inventario por variación
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              onChange={toggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {enabled && (
        <div className="mt-4">
          {variations.length === 0 ? (
            <div className="text-sm text-gray-500">
              No hay variaciones (asegúrate de añadir atributos con valores)
            </div>
          ) : (
            <div className="space-y-2">
              {variations.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <div className="font-medium">
                      {v.attributes.map((a) => a.value).join(' / ')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Precio: {v.price ? `$${v.price}` : 'Hereda producto'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">
                      Stock: {v.inventory}
                    </div>
                    <Button size="sm" onClick={() => setEditing(v)}>
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {editing && (
        <VariationEditor
          variation={editing}
          onClose={() => setEditing(null)}
          onSave={handleSaveVariation}
        />
      )}
    </div>
  );
};

export default VariationsManager;
