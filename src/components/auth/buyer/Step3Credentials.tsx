// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import { Button } from "@/components/ui/Button";

const RegisterStep3BuyerCredentials = ({
  register,
  errors,
  watch,
  back,
  isLoading,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const acceptTerms = watch('acceptTerms');
  const acceptPrivacy = watch('acceptPrivacy');
  const electronicBilling = watch('electronicBilling');

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Credenciales de acceso
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="correo@email.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.email?.message}
          {...register('email', {
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
          placeholder="correo@email.com"
          icon={<FaEnvelope className="w-5 h-5" />}
          error={errors.confirmEmail?.message}
          {...register('confirmEmail', {
            required: 'Confirma tu correo',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El formato del correo electrónico no es válido',
            },
            validate: (val) =>
              val === watch('email') || 'Los correos no coinciden',
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PasswordInput
          label="Contraseña"
          placeholder="*********"
          icon={<FaLock className="w-5 h-5" />}
          error={errors.password?.message}
          visible={passwordVisible}
          onToggle={togglePasswordVisibility}
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
          })}
        />

        <PasswordInput
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          icon={<FaLock className="w-5 h-5" />}
          error={errors.confirmPassword?.message}
          visible={passwordVisible}
          onToggle={togglePasswordVisibility}
          {...register('confirmPassword', {
            required: 'Confirma tu contraseña',
            validate: (val) =>
              val === watch('password') || 'Las contraseñas no coinciden',
          })}
        />
      </div>

      <CheckboxGroup
        register={register}
        options={[
          {
            name: 'acceptTerms',
            title: 'Términos y condiciones',
            description: 'Acepto los términos de servicio y condiciones de uso',
            validation: { required: 'Debe aceptar los términos y condiciones' },
          },
          {
            name: 'acceptPrivacy',
            title: 'Política de privacidad',
            description:
              'Acepto el tratamiento de mis datos personales según la política de privacidad',
            validation: { required: 'Debe aceptar la política de privacidad' },
          },
        ]}
      />

      {/* Electronic Billing Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Facturación electrónica <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="true"
              {...register('electronicBilling', {
                required:
                  'Debe seleccionar una opción de facturación electrónica',
              })}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              Sí, deseo facturación electrónica
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value="false"
              {...register('electronicBilling', {
                required:
                  'Debe seleccionar una opción de facturación electrónica',
              })}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              No, no deseo facturación electrónica
            </span>
          </label>
        </div>
        {errors.electronicBilling && (
          <p className="text-red-500 text-sm mt-1">
            {errors.electronicBilling.message}
          </p>
        )}
      </div>

      {(!acceptTerms || !acceptPrivacy) && (
        <p className="text-red-500 text-sm mt-2">
          Debes aceptar los términos y condiciones, y las políticas de
          privacidad para continuar.
        </p>
      )}

      <div className="flex justify-between mt-6">
        <Button type="button" onClick={back} variant="outline">
          ← Atrás
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={
            !acceptTerms ||
            !acceptPrivacy ||
            electronicBilling === null ||
            isLoading
          }
          className="h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep3BuyerCredentials;
