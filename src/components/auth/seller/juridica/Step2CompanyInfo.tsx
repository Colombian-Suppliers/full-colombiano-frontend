// @ts-nocheck
import React from 'react';import { MdBusiness } from 'react-icons/md';
import { FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEffect } from 'react';

const RegisterStep4JuridicaCompanyInfo = ({
  register,
  errors,
  watch, // added for verification digit handling
  setValue, // added for verification digit handling
  departments,
  companyCities,
  loadingGeo,
  companyDept,
  back,
  next,
}) => {
  const companyNITNumber = watch('companyNITNumber');
  const companyNITDigit = watch('companyNITDigit');

  // Update combined NIT field when individual fields change
  useEffect(() => {
    if (companyNITNumber && companyNITDigit) {
      const combined = `${companyNITNumber}-${companyNITDigit}`;
      setValue('companyNIT', combined, { shouldValidate: true });
    } else if (companyNITNumber) {
      setValue('companyNIT', companyNITNumber, { shouldValidate: true });
    } else {
      setValue('companyNIT', '', { shouldValidate: true });
    }
  }, [companyNITNumber, companyNITDigit, setValue]);

  // Register the combined NIT field for validation
  const { ref: _nitRef, ..._nitRegister } = register('companyNIT');
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Primera fila: Razón social y NIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Razón social"
          placeholder="Nombre de tu empresa"
          icon={<MdBusiness className="w-5 h-5" />}
          error={errors.companyName?.message}
          {...register('companyName', {
            required: 'La razón social es requerida',
          })}
        />

        {/* NIT con número y dígito de verificación */}
        <div className="-mt-0.5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaIdCard className="inline w-5 h-5 mr-2 text-gray-400" />
            NIT
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="123456789"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              {...register('companyNITNumber', {
                required: 'El número del NIT es requerido',
                pattern: {
                  value: /^\d{9,12}$/,
                  message: 'El NIT debe tener entre 9 y 12 dígitos',
                },
              })}
            />
            <span className="text-gray-500 font-medium">-</span>
            <input
              type="text"
              placeholder="0"
              maxLength="1"
              className="w-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center"
              {...register('companyNITDigit', {
                required: 'El dígito de verificación es requerido',
                pattern: {
                  value: /^[0-9]$/,
                  message: 'Debe ser un dígito del 0 al 9',
                },
              })}
            />
          </div>
          {/* Show error message based on validation state */}
          {errors.companyNIT && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companyNIT.message}
            </p>
          )}
          {!errors.companyNIT &&
            (errors.companyNITNumber || errors.companyNITDigit) && (
              <p className="mt-1 text-sm text-red-600">
                {errors.companyNITNumber?.message ||
                  errors.companyNITDigit?.message}
              </p>
            )}
        </div>
      </div>

      {/* Segunda fila: Correo y confirmar correo (en la misma línea) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Correo electrónico de la empresa"
          type="email"
          placeholder="contacto@empresa.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.companyEmail?.message}
          {...register('companyEmail', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El formato del correo electrónico no es válido',
            },
          })}
        />

        <Input
          label="Confirmar correo electrónico"
          type="email"
          placeholder="contacto@empresa.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.companyConfirmEmail?.message}
          {...register('companyConfirmEmail', {
            required: 'Confirma el correo de la empresa',
            validate: (val) =>
              val === watch('companyEmail') || 'Los correos no coinciden',
          })}
        />
      </div>

      {/* Tercera fila: Departamento y ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline w-5 h-5 mr-2 text-gray-400" />
            Departamento
          </label>
          <select
            {...register('companyDept', {
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
          {errors.companyDept && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companyDept.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <select
            {...register('companyCity', { required: 'La ciudad es requerida' })}
            className="input w-full hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
            disabled={!companyDept || loadingGeo}
          >
            <option value="">
              {!companyDept
                ? 'Primero selecciona un departamento'
                : loadingGeo
                  ? 'Cargando ciudades...'
                  : '📍 Selecciona una ciudad'}
            </option>
            {companyCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.companyCity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companyCity.message}
            </p>
          )}
        </div>
      </div>

      {/* Cuarta fila: Dirección y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Dirección de la empresa"
          placeholder="Calle 123 #45-67"
          icon={<FaMapMarkerAlt className="w-5 h-5" />}
          error={errors.companyAddress?.message}
          {...register('companyAddress', {
            required: 'La dirección es requerida',
          })}
        />

        <Input
          label="Teléfono de la empresa"
          placeholder="601 123 4567"
          icon={<FaPhone className="w-5 h-5" />}
          error={errors.companyPhone?.message}
          {...register('companyPhone', {
            required: 'El teléfono es requerido',
            pattern: {
              value: /^\d{10}$/,
              message: 'El teléfono debe tener 10 dígitos',
            },
          })}
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

export default RegisterStep4JuridicaCompanyInfo;
