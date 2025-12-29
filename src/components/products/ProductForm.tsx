// @ts-nocheck
import React from 'react';import { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

import CategorySelector from "@/components/ui/CategorySelector";
import TagSelector from "@/components/ui/TagSelector";
import AttributePicker from '@/components/products/AttributePicker.jsx';
import AddAttributeModal from '@/components/products/AddAttributeModal.jsx';
import VariationsManager from '@/components/products/VariationsManager.jsx';
import { productApiService } from '@/api/services/product.service.js';
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";

const ProductForm = ({
  isOpen = true,
  onClose,
  onSave,
  initialData = null,
  mode = 'full', // 'full' or 'quick'
  fullPage = false,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  // const [images, setImages] = useState([]); // TODO: Re-habilitar cuando se implemente subida
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [variationsActive, setVariationsActive] = useState(false);
  const [variations, setVariations] = useState([]);
  const [showAddAttribute, setShowAddAttribute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);

  // Fetch categories and tags on mount
  useEffect(() => {
    if (initialData) {
      // Pre-fill fields if we have initial product data
      setName(initialData.name || '');
      setPrice(initialData.price || '');
      setStock(initialData.stock || '');
      setShortDesc(initialData.short_description || '');
      setLongDesc(initialData.description || '');
      setCategory(initialData.category || null);
      setTags((initialData.tags || []).join(', '));
      setAttributes(initialData.attributes || []);
    }
    const fetchCategories = async () => {
      try {
        const data = await productApiService.getProductCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        showErrorToast('Error al cargar categorías');
      } finally {
        setCategoriesLoading(false);
      }
    };

    const fetchTags = async () => {
      try {
        const data = await productApiService.getProductTags();
        setAvailableTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
        showErrorToast('Error al cargar etiquetas');
      } finally {
        setTagsLoading(false);
      }
    };

    fetchCategories();
    fetchTags();
    // When initialData is provided we prefill; handle it after categories and tags are loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price || '');
      setStock(initialData.stock || '');
      setShortDesc(initialData.short_description || '');
      setLongDesc(initialData.description || '');
      setCategory(initialData.category || null);
      setTags(
        Array.isArray(initialData.tags)
          ? initialData.tags.join(', ')
          : initialData.tags || ''
      );
      setAttributes(initialData.attributes || []);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validaciones mínimas
      if (!name.trim()) {
        showErrorToast('Nombre del producto es obligatorio');
        return;
      }
      if (!category) {
        showErrorToast('Selecciona una categoría');
        return;
      }
      // TODO: Re-habilitar validación de imágenes cuando se implemente subida
      // if (!images || images.length === 0) {
      //   showErrorToast('Sube al menos una imagen del producto');
      //   return;
      // }

      // Construir payload según la API
      const payload = {
        name: name.trim(),
        description: longDesc || shortDesc,
        short_description: shortDesc,
        price: parseFloat(price) || 0,
        category_id: category?.id || category,
        stock_quantity: parseInt(stock) || 0,
        weight: parseFloat(weight) || null,
        dimensions: {
          length: dimensions.length || null,
          width: dimensions.width || null,
          height: dimensions.height || null,
        },
        // TODO: Implementar subida de imágenes
        images: images.map((img) =>
          typeof img === 'string' ? { src: img } : { file: img }
        ),
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        attributes: attributes.map((attr) => ({
          name: attr.name,
          values: attr.values,
          is_visible: true,
          is_variation: false,
        })),
      };

      // Agregar variaciones si están activas
      if (variationsActive && variations.length > 0) {
        payload.variations = variations.map((v) => ({
          name: v.name,
          options: v.options,
          is_visible: true,
        }));
        payload.variations_custom_data = variations.flatMap((v) =>
          v.options.map((option) => ({
            attributes: { [v.name]: option },
            sku: `${name.replace(/\s+/g, '-').toLowerCase()}-${option.toLowerCase()}`,
            regular_price: price,
            stock: stock,
            stock_status: 'instock',
          }))
        );
      }

      // Llamar al API
      const response = await productApiService.createProduct(payload);
      // If quick mode, store as a draft
      if (mode === 'quick') {
        payload.status = 'draft';
      }

      if (mode === 'quick') {
        showSuccessToast(response.message || 'Producto guardado como borrador');
      } else {
        showSuccessToast(response.message || 'Producto publicado');
      }

      // Reset form
      setName('');
      setCategory(null);
      setPrice('');
      setStock('');
      setWeight('');
      setDimensions({ length: '', width: '', height: '' });
      setImages([]);
      setShortDesc('');
      setLongDesc('');
      setAttributes([]);
      setTags('');
      setVariationsActive(false);
      setVariations([]);

      if (onSave) onSave(response.product);
      onClose();
      // For quick mode, navigate to the full editor with product data (handled by caller via onSave or route)
    } catch (error) {
      console.error('Error creating product:', error);
      showErrorToast(error.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Quick mode: show a reduced set of fields */}
          {mode === 'quick' ? (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del producto
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría del producto
                </label>
                <CategorySelector
                  categories={categories}
                  loading={categoriesLoading}
                  value={category}
                  onChange={setCategory}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso (Kg)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del producto
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría del producto
                </label>
                <CategorySelector
                  categories={categories}
                  loading={categoriesLoading}
                  value={category}
                  onChange={setCategory}
                  required
                />
              </div>
            </div>
          )}

          {mode !== 'quick' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                {!variationsActive ? (
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                ) : (
                  <div className="text-sm text-gray-500">
                    El inventario se gestiona por variación cuando están
                    activadas.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso (Kg)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Etiquetas
                </label>
                <TagSelector
                  availableTags={availableTags}
                  loading={tagsLoading}
                  value={tags}
                  onChange={setTags}
                  placeholder="Seleccionar etiquetas"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alto (cm)
              </label>
              <Input
                type="number"
                step="0.01"
                value={dimensions.height}
                onChange={(e) =>
                  setDimensions((prev) => ({ ...prev, height: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ancho (cm)
              </label>
              <Input
                type="number"
                step="0.01"
                value={dimensions.width}
                onChange={(e) =>
                  setDimensions((prev) => ({ ...prev, width: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Largo (cm)
              </label>
              <Input
                type="number"
                step="0.01"
                value={dimensions.length}
                onChange={(e) =>
                  setDimensions((prev) => ({ ...prev, length: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción corta
              </label>
              <Textarea
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción completa
              </label>
              <Textarea
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Estado del producto
            </label>
            <select className="input w-36">
              <option>Borrador</option>
              <option>Publicado</option>
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Imágenes del producto
            </div>
            <div className="w-full h-40 bg-gray-50 rounded border flex items-center justify-center mb-3">
              {images.length > 0 ? (
                <img
                  className="max-h-40 object-contain"
                  src={
                    typeof images[0] === 'string'
                      ? images[0]
                      : URL.createObjectURL(images[0])
                  }
                  alt="preview"
                />
              ) : (
                <span className="text-gray-400">
                  Esta es la imagen principal de tu producto. Asegúrate de que
                  tenga fondo blanco.
                </span>
              )}
            </div>
            <div className="flex gap-2 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-50 rounded border flex items-center justify-center"
                >
                  {images[i] ? (
                    <img
                      className="w-full h-full object-cover"
                      src={
                        typeof images[i] === 'string'
                          ? images[i]
                          : URL.createObjectURL(images[i])
                      }
                      alt={`thumb-${i}`}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(`product-image-${i}`).click()
                      }
                      className="w-full h-full flex items-center justify-center"
                    >
                      +
                    </button>
                  )}
                  <input
                    id={`product-image-${i}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        setImages((prev) => {
                          const copy = [...prev];
                          copy[i] = file;
                          return copy;
                        });
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Subir imágenes
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Etiquetas del producto
            </label>
            <Input placeholder="Buscar o seleccionar..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <Input placeholder="Buscar o seleccionar..." />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Recogida en Tienda
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Atributos
        </label>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Los atributos son usados para el filtrado de los productos y para
            crear variaciones
          </p>
          <Button
            onClick={() => setShowAddAttribute(true)}
            size="sm"
            variant="outline"
          >
            + Añadir atributo
          </Button>
        </div>
        <div className="mt-3">
          <AttributePicker attributes={attributes} onChange={setAttributes} />
        </div>
      </div>

      <AddAttributeModal
        isOpen={showAddAttribute}
        onClose={() => setShowAddAttribute(false)}
        onAdd={(attr) => {
          setAttributes((prev) => [...prev, attr]);
          setShowAddAttribute(false);
        }}
      />

      <div>
        <VariationsManager
          attributes={attributes}
          active={variationsActive}
          onToggle={(v) => setVariationsActive(v)}
          variations={variations}
          onVariationsChange={setVariations}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? mode === 'quick'
              ? 'Creando...'
              : 'Publicando...'
            : mode === 'quick'
              ? 'Crear Producto'
              : 'Publicar producto'}
        </Button>
      </div>
    </form>
  );

  if (fullPage) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Nuevo Producto</h2>
        {formContent}
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CREAR UN NUEVO PRODUCTO"
      headerVariant="brand"
      size="2xl"
    >
      {formContent}
    </Modal>
  );
};

export default ProductForm;
