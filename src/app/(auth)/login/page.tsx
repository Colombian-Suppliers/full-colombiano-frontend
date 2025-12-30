'use client';

import React, { useEffect, Suspense } from 'react';
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

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const [isValidating, setIsValidating] = React.useState(false);

  const { register, handleSubmit, watch } = useFormValidation<LoginFormData>();

  const watchedEmail = watch('email');

  const isEmailValid =
    watchedEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) : undefined;
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
    setIsValidating(true);

    try {
      // Call real API login
      await login(data);
      
      // Wait for localStorage to be set
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get user from localStorage to determine redirect
      const userStr = localStorage.getItem('user');
      console.log('=== LOGIN DEBUG ===');
      console.log('User from localStorage:', userStr);
      
      if (userStr) {
        const currentUser = JSON.parse(userStr);
        console.log('Parsed user:', currentUser);
        console.log('User role:', currentUser.role);
        
        const role = currentUser.role?.toLowerCase();
        
        let redirectUrl = '/';
        
        if (role === 'admin') {
          redirectUrl = '/d';
          console.log('Admin detected, redirecting to dashboard');
        } else if (role === 'vendor' || role === 'seller') {
          redirectUrl = '/d';
          console.log('Vendor detected, redirecting to dashboard');
        } else if (role === 'customer' || role === 'buyer') {
          redirectUrl = '/marketplace';
          console.log('Customer detected, redirecting to marketplace');
        }
        
        console.log('Final redirect URL:', redirectUrl);
        console.log('===================');
        
        showSuccessToast(TOAST_MESSAGES.LOGIN_SUCCESS);
        
        // Force hard redirect
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      } else {
        console.log('ERROR: No user in localStorage!');
        showErrorToast('Error al guardar sesión');
        setIsValidating(false);
      }
    } catch (err) {
      // Handle real API errors (network issues, server errors, etc.)
      console.error('Login error:', err);
      const message =
        err instanceof Error ? err.message : TOAST_MESSAGES.LOGIN_ERROR;
      showErrorToast(message);
      setIsValidating(false);
    }
  };

  return (
    <Card className="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-lg animate-fade-in shadow-lg border-primary-200">
      <div className="px-6 py-4 border-b border-gray-200 animate-slide-up">
        <h1 className="text-2xl font-bold text-center text-primary-700">
          Bienvenido de vuelta
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <div className="px-6 py-4 animate-slide-up">

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

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 overflow-hidden rounded-b-lg animate-slide-up">
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
  );
}

export default function LoginPage() {
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
      <LoginPageContent />
    </Suspense>
  );
}

