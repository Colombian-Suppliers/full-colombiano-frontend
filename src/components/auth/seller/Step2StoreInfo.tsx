// @ts-nocheck
import React from 'react';import { MdStorefront, MdCategory } from 'react-icons/md';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import CategorySelector from "@/components/ui/CategorySelector";
import { useStoreCategories } from "@/lib/hooks/useStoreCategories";

const RegisterStep3StoreInfo = ({
  register,
  errors,
  watch,
  setValue,
  departments,
  storeCities,
  loadingGeo,
  storeDept,
  back,
  next,
}) => {
  const {
    categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useStoreCategories();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Primera fila: Nombre de tienda y teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre de tu tienda"
          placeholder="Nombre de tu tienda"
          icon={<MdStorefront className="w-5 h-5" />}
          error={errors.storeName?.message}
          {...register('storeName', {
            required: 'El nombre de la tienda es requerido',
          })}
        />

        <Input
          label="Teléfono de contacto"
          placeholder="300 123 4567"
          icon={<FaPhone className="w-5 h-5" />}
          error={errors.storePhone?.message}
          {...register('storePhone', {
            required: 'El teléfono es requerido',
            pattern: {
              value: /^\d{10}$/,
              message: 'El teléfono debe tener 10 dígitos',
            },
          })}
        />
      </div>

      {/* Segunda fila: Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <MdCategory className="inline w-5 h-5 mr-2 text-gray-400" />
          Categoría principal
        </label>
        <CategorySelector
          categories={categories}
          loading={loadingCategories}
          error={categoriesError}
          value={watch('storeCategory')}
          onChange={(value) => setValue('storeCategory', value)}
          placeholder="Selecciona una categoría"
          disabled={loadingCategories || categoriesError}
        />
        {errors.storeCategory && (
          <p className="mt-1 text-sm text-red-600">
            {errors.storeCategory.message}
          </p>
        )}
      </div>

      {/* Tercera fila: Departamento y ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline w-5 h-5 mr-2 text-gray-400" />
            Departamento
          </label>
          <select
            {...register('storeDept', {
              required: 'El departamento es requerido',
            })}
            className="input w-full hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
            disabled={loadingGeo}
          >
            <option value="">
              {loadingGeo
                ? '⏳ Cargando departamentos...'
                : departments?.length > 0
                  ? '📍 Selecciona un departamento'
                  : '❌ Error: No se pudieron cargar los departamentos'}
            </option>
            {departments?.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.storeDept && (
            <p className="mt-1 text-sm text-red-600">
              {errors.storeDept.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <select
            {...register('storeCity', { required: 'La ciudad es requerida' })}
            className="input w-full hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
            disabled={!storeDept || loadingGeo}
          >
            <option value="">
              {!storeDept
                ? 'Primero selecciona un departamento'
                : loadingGeo
                  ? 'Cargando ciudades...'
                  : '📍 Selecciona una ciudad'}
            </option>
            {storeCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.storeCity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.storeCity.message}
            </p>
          )}
        </div>
      </div>

      {/* Cuarta fila: Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Dirección completa"
          placeholder="Calle 123 #45-67"
          icon={<FaMapMarkerAlt className="w-5 h-5" />}
          error={errors.storeAddress?.message}
          {...register('storeAddress', {
            required: 'La dirección es requerida',
          })}
        />

        <Input
          label="Dirección línea 2 (opcional)"
          placeholder="Apartamento, local, etc."
          {...register('storeAddressLine2')}
        />
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" onClick={back} variant="outline">
          ← Atrás
        </Button>
        <Button type="button" onClick={next} className="hover:shadow-md">
          Continuar →
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep3StoreInfo;
