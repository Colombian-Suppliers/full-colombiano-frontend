// @ts-nocheck
import React from 'react';import { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MdAdd } from 'react-icons/md';

/**
 * VariationModal Component
 * Modal para editar una variación de producto
 * Based on Image 7 from requirements
 */
const VariationModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [variationData, setVariationData] = useState({
    name: '',
    image: null,
    price: '',
    salePrice: '',
    dimensions: {
      weight: '',
      width: '',
      length: '',
      height: '',
    },
    shortDescription: '',
    sku: '',
    stock: '',
    lowStock: '',
  });

  useEffect(() => {
    if (initialData) {
      setVariationData(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setVariationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDimensionChange = (dimension, value) => {
    setVariationData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVariationData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(variationData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Variación: ${variationData.name || 'Nueva'}`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label
                htmlFor="variation-image"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Imagen
              </label>
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {variationData.image ? (
                  <img
                    src={
                      typeof variationData.image === 'string'
                        ? variationData.image
                        : URL.createObjectURL(variationData.image)
                    }
                    alt="preview"
                    className="max-h-full object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('variation-image').click()
                    }
                    className="flex flex-col items-center text-gray-400 hover:text-gray-600"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                      <MdAdd className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-sm">Añadir imagen</span>
                  </button>
                )}
              </div>
              <input
                id="variation-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Precio
                </label>
                <Input
                  type="text"
                  placeholder="$200.000"
                  value={variationData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Precio en Oferta{' '}
                  <span className="text-gray-500 font-normal">Programar</span>
                </label>
                <Input
                  type="text"
                  placeholder="$180.000"
                  value={variationData.salePrice}
                  onChange={(e) => handleChange('salePrice', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Peso (Kg)
              </label>
              <Input
                type="text"
                placeholder="Kg"
                value={variationData.dimensions.weight}
                onChange={(e) =>
                  handleDimensionChange('weight', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Dimensiones (Cm)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="text"
                  placeholder="Alto"
                  value={variationData.dimensions.height}
                  onChange={(e) =>
                    handleDimensionChange('height', e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Ancho"
                  value={variationData.dimensions.width}
                  onChange={(e) =>
                    handleDimensionChange('width', e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Largo"
                  value={variationData.dimensions.length}
                  onChange={(e) =>
                    handleDimensionChange('length', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Descripción de la variación{' '}
            <span className="text-gray-500 font-normal">(opcional)</span>
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
            placeholder="Describe las características específicas de esta variación..."
            value={variationData.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
          />
        </div>

        {/* SKU */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-900">
              SKU (Stock Keeping Unit)
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!variationData.sku}
                onChange={(e) =>
                  handleChange('sku', e.target.checked ? '' : null)
                }
              />
              <div
                className={`w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors ${
                  variationData.sku !== null ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                    variationData.sku !== null
                      ? 'translate-x-5'
                      : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </label>
          </div>
          {variationData.sku !== null && (
            <Input
              type="text"
              placeholder="Ingresa el SKU"
              value={variationData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
            />
          )}
        </div>

        {/* Inventory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Cantidad en inventario
            </label>
            <Input
              type="number"
              placeholder="15"
              value={variationData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Umbral de inventario bajo
            </label>
            <Input
              type="number"
              placeholder="3"
              value={variationData.lowStock}
              onChange={(e) => handleChange('lowStock', e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Editar variación
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default VariationModal;
