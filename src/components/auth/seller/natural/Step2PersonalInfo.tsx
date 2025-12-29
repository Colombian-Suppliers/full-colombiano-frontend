// @ts-nocheck
import React from 'react';import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const RegisterStep4NaturalPersonalInfo = ({
  register,
  errors,
  watch,
  departments,
  personalCities,
  loadingGeo,
  personalDept,
  back,
  next,
}) => {
  const idType = watch('idType');

  const validateDocumentNumber = (value) => {
    if (!value || !idType) return true;

    switch (idType) {
      case 'Cédula de Ciudadanía (CC)':
      case 'Cédula de Extranjería (CE)':
        if (!/^\d{1,10}$/.test(value)) {
          return 'El número de documento debe tener hasta 10 dígitos y solo números';
        }
        break;
      case 'Pasaporte':
        if (!/^[A-Za-z0-9]{6,12}$/.test(value)) {
          return 'El pasaporte debe tener entre 6 y 12 caracteres alfanuméricos';
        }
        break;
      default:
        break;
    }

    return true;
  };
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Primera fila: Nombres y apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombres"
          placeholder="Tu nombre"
          icon={<FaUser className="w-5 h-5" />}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: 'Los nombres son requeridos',
            minLength: {
              value: 2,
              message: 'Los nombres deben tener al menos 2 caracteres',
            },
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u,
              message: 'Los nombres solo deben contener letras y espacios',
            },
          })}
        />
        <Input
          label="Apellidos"
          placeholder="Tus apellidos"
          icon={<FaUser className="w-5 h-5" />}
          error={errors.lastName?.message}
          {...register('lastName', {
            required: 'Los apellidos son requeridos',
            minLength: {
              value: 3,
              message: 'Los apellidos deben tener al menos 3 caracteres',
            },
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u,
              message: 'Los apellidos solo deben contener letras y espacios',
            },
          })}
        />
      </div>

      {/* Segunda fila: Tipo de documento, número y teléfono en la misma fila */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {/* Tipo de documento */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            <FaIdCard className="inline w-4 h-4 mr-1 text-gray-400" />
            Tipo
          </label>
          <select
            {...register('idType', {
              required: 'El tipo de documento es requerido',
            })}
            className="input w-full text-sm py-2 hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
          >
            <option value="">Tipo</option>
            <option value="Cédula de Ciudadanía (CC)">C.C.</option>
            <option value="Cédula de Extranjería (CE)">C.E.</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.idType && (
            <p className="mt-1 text-xs text-red-600">{errors.idType.message}</p>
          )}
        </div>

        {/* Número de documento */}
        <div className="md:col-span-2">
          <Input
            label="Número de documento"
            placeholder="1234567890"
            icon={<FaIdCard className="w-4 h-4" />}
            error={errors.idNumber?.message}
            className="text-sm"
            {...register('idNumber', {
              required: 'El número de documento es requerido',
              validate: validateDocumentNumber,
            })}
          />
        </div>

        {/* Teléfono personal */}
        <div className="md:col-span-3">
          <Input
            label="Teléfono personal"
            placeholder="300 123 4567"
            icon={<FaPhone className="w-4 h-4" />}
            error={errors.personalPhone?.message}
            className="text-sm"
            {...register('personalPhone', {
              required: 'El teléfono es requerido',
              pattern: {
                value: /^\d{10}$/,
                message: 'El teléfono debe tener 10 dígitos',
              },
            })}
          />
        </div>
      </div>

      {/* Tercera fila: Departamento y ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline w-5 h-5 mr-2 text-gray-400" />
            Departamento
          </label>
          <select
            {...register('personalDept', {
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
          {errors.personalDept && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalDept.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <select
            {...register('personalCity', {
              required: 'La ciudad es requerida',
            })}
            className="input w-full hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
            disabled={!personalDept || loadingGeo}
          >
            <option value="">
              {!personalDept
                ? 'Primero selecciona un departamento'
                : loadingGeo
                  ? 'Cargando ciudades...'
                  : '📍 Selecciona una ciudad'}
            </option>
            {personalCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.personalCity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.personalCity.message}
            </p>
          )}
        </div>
      </div>

      {/* Cuarta fila: Dirección y correo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Dirección de residencia"
          placeholder="Calle 123 #45-67"
          icon={<FaMapMarkerAlt className="w-5 h-5" />}
          error={errors.personalAddress?.message}
          {...register('personalAddress', {
            required: 'La dirección es requerida',
          })}
        />

        <Input
          label="Correo electrónico personal"
          type="email"
          placeholder="tu@email.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.personalEmail?.message}
          {...register('personalEmail', {
            required: 'El correo personal es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ingresa un correo electrónico válido',
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

export default RegisterStep4NaturalPersonalInfo;
