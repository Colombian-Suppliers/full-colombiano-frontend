// @ts-nocheck
import React from 'react';import { FaUser, FaIdCard } from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DOCUMENT_TYPE_LABELS } from "@/config/constants";

const RegisterStep1BuyerPersonalInfo = ({
  register,
  errors,
  next,
  back,
  watch,
}) => {
  const documentType = watch('documentType');

  const validateDocumentNumber = (value) => {
    if (!value || !documentType) return true;

    switch (documentType) {
      case 'Cédula de Ciudadanía (CC)':
      case 'Cédula de Extranjería (CE)':
        if (!/^\d{1,10}$/.test(value)) {
          return 'El número de documento debe contener solo números (máx. 10 dígitos)';
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
    <div className="space-y-4 animate-slide-up">
      <div className="grid grid-cols-2 gap-4">
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

      <div>
        <label
          htmlFor="documentType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          <FaIdCard className="inline w-5 h-5 mr-2 text-gray-400" />
          Tipo de documento
        </label>
        <select
          id="documentType"
          {...register('documentType', {
            required: 'El tipo de documento es requerido',
          })}
          className="input w-full hover:border-primary-400 transition-colors cursor-pointer focus:border-primary-500 focus:ring-primary-500/20"
        >
          <option value="">Selecciona tu documento</option>
          {Object.keys(DOCUMENT_TYPE_LABELS)
            .filter((key) => key !== 'nit') // Excluir NIT para compradores
            .map((key) => (
              <option key={key} value={key}>
                {DOCUMENT_TYPE_LABELS[key]}
              </option>
            ))}
        </select>
        {errors.documentType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.documentType.message}
          </p>
        )}
      </div>

      <Input
        label="Número de documento"
        placeholder="1234567890"
        icon={<FaIdCard className="w-5 h-5" />}
        error={errors.documentNumber?.message}
        inputMode="numeric"
        maxLength={12}
        {...register('documentNumber', {
          required: 'El número de documento es requerido',
          validate: validateDocumentNumber,
        })}
      />

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

export default RegisterStep1BuyerPersonalInfo;
