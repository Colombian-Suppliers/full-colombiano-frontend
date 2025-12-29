'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  showErrorToast,
  showSuccessToast,
  showAlertToast,
} from '@/utils/toastUtils';
import { useFormValidation } from '@/lib/hooks/useFormValidation';
import { MdEmail, MdLock } from 'react-icons/md';
import ROUTES from '@/config/routes.config';
import { TOAST_MESSAGES } from '@/utils/toastMessages';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import PasswordInput from '@/components/ui/PasswordInput/PasswordInput';
import FormField from '@/components/ui/FormField/FormField';
import { Card } from '@/components/ui/Card/Card';

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const [isValidating, setIsValidating] = React.useState(false);

  const { register, handleSubmit, watch } = useFormValidation<LoginFormData>();

  const watchedEmail = watch('email');

  const isEmailValid =
    watchedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);
  const emailError = watchedEmail && !isEmailValid ? 'Email inválido' : null;

  // Handle verification messages from URL params
  useEffect(() => {
    const successMessage = searchParams?.get('verification') === 'success';
    const errorMessage = searchParams?.get('error');
    const infoMessage = searchParams?.get('info');

    if (successMessage) {
      showSuccessToast(TOAST_MESSAGES.EMAIL_VERIFICATION_SUCCESS);
    } else if (errorMessage) {
      let displayMessage = 'Error en la verificación del email.';
      switch (errorMessage) {
        case 'token_missing':
          displayMessage = 'Token de verificación faltante.';
          break;
        case 'token_invalid':
          displayMessage = 'Token de verificación inválido.';
          break;
        case 'token_expired':
          displayMessage =
            'El enlace de verificación ha expirado. Solicita uno nuevo.';
          break;
        default:
          displayMessage = 'Error desconocido en la verificación.';
      }
      showErrorToast(displayMessage);
    } else if (infoMessage === 'email_already_verified') {
      showAlertToast(TOAST_MESSAGES.EMAIL_ALREADY_VERIFIED);
    }

    // Clean up URL params after showing message
    if (successMessage || errorMessage || infoMessage) {
      router.replace(ROUTES.LOGIN);
    }
  }, [searchParams, router]);

  const onSubmit = async (data: LoginFormData) => {
    // Always show loading state to simulate API call
    setIsValidating(true);

    try {
      // Simulate API call delay (1000-2000ms to feel realistic)
      const simulatedDelay = Math.random() * 1000 + 1000;
      await new Promise((resolve) => setTimeout(resolve, simulatedDelay));

      // Only make real API call if client-side validation passes
      const result = await login(data);
      showSuccessToast(TOAST_MESSAGES.LOGIN_SUCCESS);

      // Redirect based on user role immediately after login
      const currentUser = result.user;
      if (currentUser?.role) {
        const role = currentUser.role.toLowerCase();
        if (role === 'vendor' || role === 'seller') {
          router.push(ROUTES.DASHBOARD);
        } else if (role === 'customer' || role === 'buyer') {
          router.push(ROUTES.MARKETPLACE);
        } else {
          router.push(ROUTES.HOME);
        }
      } else {
        router.push(ROUTES.HOME);
      }
    } catch (err) {
      // Handle real API errors (network issues, server errors, etc.)
      const message =
        err instanceof Error ? err.message : TOAST_MESSAGES.LOGIN_ERROR;
      showErrorToast(message);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg animate-fade-in shadow-lg border-primary-200 p-8">
        <div className="animate-slide-up mb-8">
          <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
            Bienvenido de vuelta
          </h1>
          <p className="text-center text-gray-500 mt-2 text-base">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <div className="animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Correo electrónico"
              error={emailError || undefined}
              isValid={isEmailValid}
            >
              <Input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                icon={<MdEmail className="w-5 h-5" />}
                {...register('email')}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
            </FormField>

            <FormField label="Contraseña">
              <PasswordInput
                placeholder="Ingresa tu contraseña"
                icon={<MdLock className="w-5 h-5" />}
                {...register('password')}
              />
            </FormField>

            <div className="flex items-center justify-between animate-slide-up">
              <label className="flex items-center gap-2 hover:text-primary-600 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="accent-primary-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-600 hover:underline hover:text-primary-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="mt-2 animate-slide-up">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading || isValidating}
                disabled={isLoading || isValidating}
                className="hover:shadow-md"
              >
                {isLoading || isValidating ? 'Verificando...' : 'Iniciar sesión'}
              </Button>
            </div>
          </form>
        </div>

        <div className="animate-slide-up mt-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-bold">¿Aún no tienes cuenta? </span>
              <Link
                href={ROUTES.REGISTER}
                className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              ¿No has verificado tu email?{' '}
              <Link
                href={ROUTES.RESEND_VERIFICATION}
                className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
              >
                Reenviar verificación
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

