'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';
import { ROUTES } from '@/config/routes.config';
import { authApiService } from '@/lib/api/services/auth.service';
import { TOAST_MESSAGES } from '@/utils/toastMessages';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

function ResetPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const watchedPassword = watch('newPassword');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      toast.error('Token de recuperación no encontrado');
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    if (!token) {
      toast.error('Token de recuperación no válido');
      return;
    }

    try {
      setIsLoading(true);
      await authApiService.resetPassword({
        token,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });

      toast.success(
        TOAST_MESSAGES.PASSWORD_RESET_SUCCESS ||
          'Contraseña actualizada exitosamente'
      );
      router.push(ROUTES.LOGIN);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : TOAST_MESSAGES.UNKNOWN_ERROR || 'Error al actualizar contraseña';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md animate-fade-in shadow-lg border-primary-200 p-8">
          <div className="animate-slide-up pb-6">
            <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
              Enlace inválido
            </h1>
          </div>

          <div className="animate-slide-up">
            <div className="text-center space-y-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p>El enlace de recuperación no es válido o ha expirado.</p>
              </div>

              <Button
                onClick={() => router.push(ROUTES.FORGOT_PASSWORD)}
                className="w-full"
              >
                Solicitar nuevo enlace
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md animate-fade-in shadow-lg border-primary-200 p-8">
        <div className="animate-slide-up pb-6">
          <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
            Nueva contraseña
          </h1>
          <p className="text-center text-gray-500 text-base">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <div className="animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordInput
              label="Nueva contraseña"
              placeholder="Ingresa tu nueva contraseña"
              icon={<FaLock className="w-5 h-5" />}
              error={errors.newPassword?.message}
              visible={passwordVisible}
              onToggle={togglePasswordVisibility}
              {...register('newPassword', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    'La contraseña debe contener mayúsculas, minúsculas y números',
                },
              })}
            />

            <PasswordInput
              label="Confirmar contraseña"
              placeholder="Confirma tu nueva contraseña"
              icon={<FaLock className="w-5 h-5" />}
              error={errors.confirmPassword?.message}
              visible={passwordVisible}
              onToggle={togglePasswordVisibility}
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: (value) =>
                  value === watchedPassword || 'Las contraseñas no coinciden',
              })}
            />

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                className="hover:shadow-md"
              >
                {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
              </Button>
            </div>
          </form>
        </div>

        <div className="animate-slide-up pt-6">
          <p className="text-center text-sm text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-md">
          <div className="px-6 py-4">
            <div className="text-center">Cargando...</div>
          </div>
        </Card>
      </div>
    }>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
