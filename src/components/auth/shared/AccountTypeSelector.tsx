// @ts-nocheck
import React from 'react';import { FaShoppingCart, FaStore } from 'react-icons/fa';
import { Button } from "@/components/ui/Button";

const RegisterStep1AccountType = ({ register, watch, next, setValue }) => {
  const role = watch('role');

  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Tarjeta Comprador */}
        <div
          onClick={() => {
            setValue('role', 'buyer', {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className={`flex flex-col items-center justify-center p-10 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
            role === 'buyer'
              ? 'border-primary-500 bg-primary-50/50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
          }`}
        >
          {/* Ícono de carrito */}
          <div className="mb-6">
            <FaShoppingCart className="text-6xl text-gray-700" />
          </div>

          <input
            type="radio"
            value="buyer"
            {...register('role')}
            className="sr-only"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-2">Comprador</h3>
          <p className="text-center text-sm text-gray-500">
            Busca y compra productos colombianos
          </p>
        </div>

        {/* Tarjeta Vendedor */}
        <div
          onClick={() => {
            setValue('role', 'seller', {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className={`flex flex-col items-center justify-center p-10 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
            role === 'seller'
              ? 'border-primary-500 bg-primary-50/50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
          }`}
        >
          {/* Ícono de tienda */}
          <div className="mb-6">
            <FaStore className="text-6xl text-gray-700" />
          </div>

          <input
            type="radio"
            value="seller"
            {...register('role')}
            className="sr-only"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-2">Vendedor</h3>
          <p className="text-center text-sm text-gray-500">
            Vende tus productos en todo el país
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          type="button"
          onClick={next}
          className="hover:shadow-lg transition-all"
          disabled={!role}
        >
          Continuar →
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep1AccountType;
