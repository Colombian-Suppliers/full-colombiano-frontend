// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MdExpandMore, MdClose } from 'react-icons/md';

/**
 * AddAttributeModal Component
 * Modal para agregar un nuevo atributo de producto con valores
 * Based on Image 5 and 6 from requirements
 */
const AddAttributeModal = ({
  isOpen = false,
  onClose = () => {},
  onAdd = () => {},
  onSave,
}) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [isVisibleOnCard, setIsVisibleOnCard] = useState(true);

  // Mock attributes list - in real app would come from API
  const availableAttributes = [
    'Color',
    'Talla',
    'Material',
    'Tamaño',
    'Marca',
    'Modelo',
  ];

  // Mock values for each attribute - in real app would come from API
  const attributeValues = {
    Color: ['Amarillo', 'Azul', 'Rojo', 'Verde', 'Negro', 'Blanco'],
    Talla: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    Material: ['Algodón', 'Poliéster', 'Lana', 'Seda', 'Lino'],
    Tamaño: ['Pequeño', 'Mediano', 'Grande', 'Extra Grande'],
    Marca: ['Marca A', 'Marca B', 'Marca C'],
    Modelo: ['2024', '2023', '2022', 'Clásico', 'Moderno'],
  };

  const handleValueToggle = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleAddNewValue = () => {
    if (newValue.trim() && !selectedValues.includes(newValue.trim())) {
      setSelectedValues((prev) => [...prev, newValue.trim()]);
      setNewValue('');
    }
  };

  const handleRemoveValue = (value) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAttribute && selectedValues.length > 0) {
      const attribute = {
        name: selectedAttribute,
        values: selectedValues,
        isVisibleOnCard,
        enabled: false, // By default not enabled for variations
      };

      // Support both onSave and onAdd for backward compatibility
      if (onSave) {
        onSave(attribute);
      } else {
        onAdd(attribute);
      }

      // Reset form
      setSelectedAttribute('');
      setSelectedValues([]);
      setIsVisibleOnCard(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Añadir atributo" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Attribute Selector */}
        <div>
          <label className="block text-base font-semibold text-gray-900 mb-3">
            Atributo
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 appearance-none bg-white"
              value={selectedAttribute}
              onChange={(e) => {
                setSelectedAttribute(e.target.value);
                setSelectedValues([]);
              }}
              required
            >
              <option value="">Buscar o seleccionar atributo...</option>
              {availableAttributes.map((attr) => (
                <option key={attr} value={attr}>
                  {attr}
                </option>
              ))}
            </select>
            <MdExpandMore className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
          </div>
        </div>

        {/* Values Selector */}
        {selectedAttribute && (
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-3">
              Valores
            </label>

            {/* Add custom value input */}
            <div className="relative mb-4">
              <Input
                placeholder="Buscar o seleccionar valores..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddNewValue();
                  }
                }}
                className="pr-10"
              />
              <MdExpandMore className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
            </div>

            {/* Existing values as chips */}
            {attributeValues[selectedAttribute] && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {attributeValues[selectedAttribute].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleValueToggle(value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedValues.includes(value)
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary'
                          : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected values display */}
            {selectedValues.length > 0 && (
              <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm text-gray-700 mb-2 font-medium">
                  Valores seleccionados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedValues.map((value) => (
                    <span
                      key={value}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {value}
                      <button
                        type="button"
                        onClick={() => handleRemoveValue(value)}
                        className="hover:text-primary-900"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Visible on card toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-900">
            Visible en la tarjeta del producto
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isVisibleOnCard}
              onChange={(e) => setIsVisibleOnCard(e.target.checked)}
            />
            <div
              className={`w-12 h-6 rounded-full peer peer-focus:outline-none transition-colors ${
                isVisibleOnCard ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                  isVisibleOnCard ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!selectedAttribute || selectedValues.length === 0}
            className="px-6"
          >
            Añadir
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAttributeModal;
