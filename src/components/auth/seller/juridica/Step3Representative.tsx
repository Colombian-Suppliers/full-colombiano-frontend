// @ts-nocheck
import React from 'react';import { MdPerson } from 'react-icons/md';
import { FaIdCard, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const RegisterStep5JuridicaRepresentative = ({
  register,
  errors,
  watch,
  back,
  next,
}) => {
  const repIdType = watch('repIdType');

  // Función de validación en tiempo real para el número de documento
  const validateDocumentNumber = (value) => {
    if (!value || !repIdType) return true; // No validar si no hay valor o tipo

    switch (repIdType) {
      case 'Cédula de Ciudadanía (CC)':
      case 'Cédula de Extranjería (CE)':
        // Para cédulas: 1-10 dígitos (permitir desde 1 hasta 10)
        if (!/^\d{1,10}$/.test(value)) {
          return 'El número de documento debe tener hasta 10 dígitos y solo números';
        }
        break;
      case 'Pasaporte':
        // Para pasaporte: alfanumérico, 6-12 caracteres
        if (!/^[A-Za-z0-9]{6,12}$/.test(value)) {
          return 'El pasaporte debe tener entre 6 y 12 caracteres alfanuméricos';
        }
        break;
      default:
        // Si no hay tipo seleccionado, no validar formato específico
        break;
    }
    return true; // Válido
  };
  return (
    <div className="space-y-6 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Representante legal
      </h3>

      {/* Primera fila: Nombres y apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombres"
          placeholder="Nombre del representante"
          icon={<MdPerson className="w-5 h-5" />}
          error={errors.repFirstName?.message}
          {...register('repFirstName', {
            required: 'Los nombres son requeridos',
            minLength: {
              value: 2,
              message:
                'Los nombres del representante deben tener al menos 2 caracteres',
            },
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u,
              message:
                'Los nombres del representante solo deben contener letras y espacios',
            },
          })}
        />
        <Input
          label="Apellidos"
          placeholder="Apellidos del representante"
          icon={<MdPerson className="w-5 h-5" />}
          error={errors.repLastName?.message}
          {...register('repLastName', {
            required: 'Los apellidos son requeridos',
            minLength: {
              value: 3,
              message:
                'Los apellidos del representante deben tener al menos 3 caracteres',
            },
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u,
              message:
                'Los apellidos del representante solo deben contener letras y espacios',
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
            {...register('repIdType', {
              required: 'El tipo de documento es requerido',
            })}
            className="input w-full text-sm py-2 hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
          >
            <option value="">Tipo</option>
            <option value="Cédula de Ciudadanía (CC)">C.C.</option>
            <option value="Cédula de Extranjería (CE)">C.E.</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.repIdType && (
            <p className="mt-1 text-xs text-red-600">
              {errors.repIdType.message}
            </p>
          )}
        </div>

        {/* Número de documento */}
        <div className="md:col-span-2">
          <Input
            label="Número de documento"
            placeholder="1234567890"
            icon={<FaIdCard className="w-4 h-4" />}
            error={errors.repIdNumber?.message}
            className="text-sm"
            {...register('repIdNumber', {
              required: 'El número de documento es requerido',
              validate: validateDocumentNumber,
            })}
          />
        </div>

        {/* Teléfono */}
        <div className="md:col-span-3">
          <Input
            label="Teléfono"
            placeholder="300 123 4567"
            icon={<FaPhone className="w-4 h-4" />}
            error={errors.repPhone?.message}
            className="text-sm"
            {...register('repPhone', {
              required: 'El teléfono es requerido',
              pattern: {
                value: /^\d{10}$/,
                message: 'El teléfono del representante debe tener 10 dígitos',
              },
            })}
          />
        </div>
      </div>

      {/* Tercera fila: Correo electrónico y confirmación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Correo electrónico personal"
          type="email"
          placeholder="representante@email.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.repEmail?.message}
          {...register('repEmail', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ingresa un correo electrónico válido',
            },
          })}
        />

        <Input
          label="Confirmar correo electrónico"
          type="email"
          placeholder="representante@email.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.repConfirmEmail?.message}
          {...register('repConfirmEmail', {
            required: 'Confirma tu correo',
            validate: (val) =>
              val === watch('repEmail') || 'Los correos no coinciden',
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

export default RegisterStep5JuridicaRepresentative;
