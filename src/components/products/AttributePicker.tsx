// @ts-nocheck
import React from 'react';import { Button } from "@/components/ui/Button";

// Simple attribute picker: allows adding attribute objects with values (comma separated)
const AttributePicker = ({ attributes = [], onChange }) => {
  const handleRemove = (id) => {
    onChange(attributes.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="mt-3 space-y-2">
        {attributes.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            <div>
              <div className="font-semibold">{a.name}</div>
              <div className="flex gap-2 mt-1">
                {a.values.map((v) => (
                  <span
                    key={v.id}
                    className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1"
                  >
                    {v.value}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Button variant="outline" onClick={() => handleRemove(a.id)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributePicker;
