// @ts-nocheck
import React from 'react';import { FaUser, FaBuilding } from 'react-icons/fa';
import { Button } from "@/components/ui/Button";

const RegisterStep2SellerPersonType = ({
  register,
  watch,
  back,
  next,
  setValue,
}) => {
  const personType = watch('personType');

  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Tarjeta Persona Natural */}
        <div
          onClick={() => {
            setValue('personType', 'natural', {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className={`flex flex-col items-center justify-center p-10 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
            personType === 'natural'
              ? 'border-primary-500 bg-primary-50/50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
          }`}
        >
          {/* Ícono de persona */}
          <div className="mb-6">
            <FaUser className="text-6xl text-gray-700" />
          </div>

          <input
            type="radio"
            value="natural"
            {...register('personType')}
            className="sr-only"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Persona Natural
          </h3>
          <p className="text-center text-sm text-gray-500">
            Emprendimiento o negocio
          </p>
        </div>

        {/* Tarjeta Persona Jurídica */}
        <div
          onClick={() => {
            setValue('personType', 'juridica', {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className={`flex flex-col items-center justify-center p-10 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
            personType === 'juridica'
              ? 'border-primary-500 bg-primary-50/50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
          }`}
        >
          {/* Ícono de edificio */}
          <div className="mb-6">
            <FaBuilding className="text-6xl text-gray-700" />
          </div>

          <input
            type="radio"
            value="juridica"
            {...register('personType')}
            className="sr-only"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Persona Jurídica
          </h3>
          <p className="text-center text-sm text-gray-500">
            Empresa constituida
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" onClick={back} variant="outline">
          ← Atrás
        </Button>
        <Button
          type="button"
          onClick={next}
          className="hover:shadow-lg transition-all"
          disabled={!personType}
        >
          Continuar →
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep2SellerPersonType;
