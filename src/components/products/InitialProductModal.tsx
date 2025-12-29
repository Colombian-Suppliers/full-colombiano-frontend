// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MdSearch } from 'react-icons/md';

/**
 * InitialProductModal Component
 * First modal that appears when clicking "Añadir producto"
 * Collects basic product information before opening the full form
 */
const InitialProductModal = ({ isOpen, onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    weight: '',
    dimensions: {
      height: '',
      width: '',
      length: '',
    },
    shortDescription: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDimensionChange = (dimension, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CREAR UN NUEVO PRODUCTO"
      headerVariant="brand"
      size="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre del producto */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Nombre del producto
          </label>
          <Input
            placeholder="Set de canastos amazónicos"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        {/* Categoría del producto */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Categoría del producto
          </label>
          <div className="relative">
            <Input
              placeholder="Buscar o seleccionar categoría..."
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
            />
            <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Precio, Peso y Dimensiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Precio
            </label>
            <Input
              type="text"
              placeholder="$200.000"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              required
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Peso (Kg)
            </label>
            <Input
              type="text"
              placeholder="Kg"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
          </div>
        </div>

        {/* Dimensiones */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Dimensiones (Cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Alto"
              value={formData.dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Ancho"
              value={formData.dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Largo"
              value={formData.dimensions.length}
              onChange={(e) => handleDimensionChange('length', e.target.value)}
            />
          </div>
        </div>

        {/* Descripción corta */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Descripción corta del producto
          </label>
          <div className="border border-gray-300 rounded-lg p-3">
            <textarea
              className="w-full border-none focus:ring-0 resize-none text-sm"
              rows={4}
              placeholder="Escribe aquí la descripción corta..."
              value={formData.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Crear Producto
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InitialProductModal;
