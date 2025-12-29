// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import { storeApiService } from '@/api/services/store.service.js';

const CategoryChip = ({ name, onRemove }) => (
  <span className="inline-flex items-center bg-green-50 text-green-800 px-2 py-1 rounded mr-2 text-sm">
    {name}
    <button
      className="ml-2 text-green-700"
      onClick={onRemove}
      aria-label={`Eliminar ${name}`}
    >
      ×
    </button>
  </span>
);

const CategoriesCard = ({ categories = [], onChange }) => {
  const [selected, setSelected] = useState(categories);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // load categories suggestions
    const load = async () => {
      try {
        const all = await storeApiService.getStoreCategories();
        setSuggestions(all.map((c) => c.name));
      } catch (e) {
        setSuggestions([]);
      }
    };
    load();
  }, []);

  const addCategory = (name) => {
    if (!name || selected.includes(name)) return;
    const arr = [...selected, name];
    setSelected(arr);
    onChange?.(arr);
    setQuery('');
  };

  const removeCategory = (name) => {
    const arr = selected.filter((c) => c !== name);
    setSelected(arr);
    onChange?.(arr);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Categorías de la Tienda</h3>
      <div className="mb-3">
        {selected.map((c) => (
          <CategoryChip key={c} name={c} onRemove={() => removeCategory(c)} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Añadir categoría..."
        />
        <button
          className="bg-primary-600 text-white px-3 py-1 rounded"
          onClick={() => addCategory(query)}
        >
          Añadir
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Sugerencias: {suggestions.slice(0, 6).join(', ')}
      </div>
    </Card>
  );
};

export default CategoriesCard;
