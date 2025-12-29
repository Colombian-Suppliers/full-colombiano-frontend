// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import AddAttributeModal from './AddAttributeModal.jsx';
import VariationModal from './VariationModal.jsx';

/**
 * FullProductEditor Component
 * Complete product creation form with all fields
 * Shown after the initial product modal
 */
const FullProductEditor = ({ isOpen, onClose, initialData, onSave }) => {
  const [productData, setProductData] = useState({
    ...initialData,
    status: 'Borrador',
    images: [],
    longDescription: '',
    shippingType: 'Seleccionar',
    freeShipping: false,
    pickupAvailable: false,
    coverageZone: 'Seleccionar',
    attributes: [],
    tags: [],
    brand: '',
    sku: true,
    minQuantity: '',
    maxQuantity: '',
    warranty: '',
    buyNote: '',
  });

  const [showAddAttribute, setShowAddAttribute] = useState(false);
  const [showVariation, setShowVariation] = useState(false);
  const [currentVariation, setCurrentVariation] = useState(null);
  const [variations, setVariations] = useState([]);

  const handleChange = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleAddAttribute = (attribute) => {
    setProductData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, attribute],
    }));
    setShowAddAttribute(false);
  };

  const handleRemoveAttribute = (index) => {
    setProductData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleToggleAttribute = (index) => {
    setProductData((prev) => {
      const newAttributes = [...prev.attributes];
      newAttributes[index].enabled = !newAttributes[index].enabled;
      return { ...prev, attributes: newAttributes };
    });
  };

  const handleEditVariation = (variation) => {
    setCurrentVariation(variation);
    setShowVariation(true);
  };

  const handleSaveVariation = (variation) => {
    if (currentVariation) {
      // Edit existing
      setVariations((prev) =>
        prev.map((v) => (v.id === variation.id ? variation : v))
      );
    } else {
      // Add new
      setVariations((prev) => [...prev, { ...variation, id: Date.now() }]);
    }
    setShowVariation(false);
    setCurrentVariation(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...productData, variations });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="← Productos"
        size="full"
        headerVariant="simple"
      >
        <form onSubmit={handleSubmit} className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Nuevo Producto
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Nombre
                    </label>
                    <Input
                      value={productData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Categoría del producto
                    </label>
                    <div className="text-sm text-gray-700">
                      {productData.category}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Precio
                      </label>
                      <Input value={productData.price} disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Precio en Oferta
                      </label>
                      <Input placeholder="Programar" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Tu Ganancia
                      </label>
                      <Input disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Comisión
                      </label>
                      <Input disabled />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Descripción corta del producto
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                      rows={3}
                      value={productData.shortDescription}
                      onChange={(e) =>
                        handleChange('shortDescription', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Descripción larga del producto
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                      rows={3}
                      value={productData.longDescription}
                      onChange={(e) =>
                        handleChange('longDescription', e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Attributes Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Atributos</h3>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setShowAddAttribute(true)}
                    >
                      + Añadir atributo
                    </Button>
                  </div>

                  {productData.attributes.length > 0 && (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Atributo
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Valores
                              </th>
                              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Variación
                              </th>
                              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {productData.attributes.map((attr, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-3 text-sm">
                                  {attr.name}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-2">
                                    {attr.values.map((val, i) => (
                                      <span
                                        key={i}
                                        className="inline-block px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                                      >
                                        {val}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="sr-only peer"
                                      checked={attr.enabled || false}
                                      onChange={() =>
                                        handleToggleAttribute(index)
                                      }
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                  </label>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveAttribute(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Variations Section */}
                {productData.attributes.some((attr) => attr.enabled) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Variaciones</h3>

                    {variations.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Variación
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Precio
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Inventario
                              </th>
                              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {variations.map((variation) => (
                              <tr key={variation.id} className="border-t">
                                <td className="px-4 py-3 text-sm">
                                  {variation.name}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {variation.price}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {variation.stock}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEditVariation(variation)
                                    }
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    Editar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar - Right Side */}
              <div className="space-y-6">
                {/* Status */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Estado del producto
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                    value={productData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option>Borrador</option>
                    <option>Publicado</option>
                  </select>
                </div>

                {/* Images */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Imágenes del producto
                  </label>
                  <div className="w-full h-40 bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mb-3">
                    {productData.images.length > 0 ? (
                      <img
                        src={URL.createObjectURL(productData.images[0])}
                        alt="preview"
                        className="max-h-40 object-contain"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-gray-500">
                          Subir imagen principal
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById('image-upload').click()
                    }
                  >
                    Subir imágenes
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pb-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Guardar Borrador
              </Button>
              <Button type="submit" variant="primary">
                Publicar Producto
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Add Attribute Modal */}
      {showAddAttribute && (
        <AddAttributeModal
          isOpen={showAddAttribute}
          onClose={() => setShowAddAttribute(false)}
          onSave={handleAddAttribute}
        />
      )}

      {/* Variation Modal */}
      {showVariation && (
        <VariationModal
          isOpen={showVariation}
          onClose={() => {
            setShowVariation(false);
            setCurrentVariation(null);
          }}
          onSave={handleSaveVariation}
          initialData={currentVariation}
        />
      )}
    </>
  );
};

export default FullProductEditor;
