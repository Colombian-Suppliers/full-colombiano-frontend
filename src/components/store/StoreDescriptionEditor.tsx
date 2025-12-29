// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { useState, useRef } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const StoreDescriptionEditor = ({ description = '', onSave }) => {
  const [html, setHtml] = useState(description || '');
  const editorRef = useRef(null);

  const handleSave = () => {
    onSave?.(html);
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Acerca de la Tienda</h3>
      <div className="mb-2 text-xs text-gray-600">
        Cuéntale a toda Colombia sobre tu empresa
      </div>
      <div
        className="border rounded p-2 min-h-[150px] bg-white"
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setHtml(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            Añadir medios
          </button>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setHtml(description || '');
            }}
          >
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave} className="ml-2">
            Actualizar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StoreDescriptionEditor;
