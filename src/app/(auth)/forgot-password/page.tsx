'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa';
import { ROUTES } from '@/config/routes.config';
import { TIMEOUTS } from '@/config/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  // Check for existing cooldown on component mount
  useEffect(() => {
    const lastResendTime = localStorage.getItem('lastResendPasswordResetTime');
    if (lastResendTime) {
      const timeSinceLastResend = Date.now() - parseInt(lastResendTime, 10);
      const remainingTime = Math.max(
        0,
        TIMEOUTS.RESEND_PASSWORD_RESET - timeSinceLastResend
      );
      setCooldownTime(Math.ceil(remainingTime / 1000)); // Convert to seconds
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call when backend is ready
      // await authApiService.forgotPassword(data.email);
      
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setEmailSent(true);

      // Set cooldown after successful send
      localStorage.setItem(
        'lastResendPasswordResetTime',
        Date.now().toString()
      );
      setCooldownTime(TIMEOUTS.RESEND_PASSWORD_RESET / 1000); // Convert to seconds

      toast.success('Email enviado exitosamente');
    } catch (error) {
      toast.error('Error al enviar email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const email = getValues('email');
    if (!email) return;

    try {
      setIsLoading(true);
      // TODO: Replace with actual API call when backend is ready
      // await authApiService.forgotPassword(email);
      
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set cooldown after successful resend
      localStorage.setItem(
        'lastResendPasswordResetTime',
        Date.now().toString()
      );
      setCooldownTime(TIMEOUTS.RESEND_PASSWORD_RESET / 1000); // Convert to seconds

      toast.success('Email reenviado exitosamente');
    } catch (error) {
      toast.error('Error al reenviar email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md animate-fade-in shadow-lg border-primary-200 p-8">
          <div className="animate-slide-up pb-6">
            <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
              Email enviado
            </h1>
            <p className="text-center text-gray-500 text-base">
              Revisa tu bandeja de entrada
            </p>
          </div>

          <div className="animate-slide-up">
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <p>
                  Hemos enviado un enlace para restablecer tu contraseña a{' '}
                  <strong>{getValues('email')}</strong>
                </p>
                <p className="mt-2 text-sm">
                  El enlace expirará en 1 hora. Si no lo encuentras, revisa tu
                  carpeta de spam.
                </p>
              </div>

              <div className="space-y-2">
                {cooldownTime > 0 && (
                  <p className="text-sm text-gray-600 text-center">
                    Puedes solicitar un nuevo enlace en {cooldownTime} segundo
                    {cooldownTime !== 1 ? 's' : ''}
                  </p>
                )}
                <Button
                  onClick={handleResend}
                  isLoading={isLoading}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading || cooldownTime > 0}
                >
                  {isLoading
                    ? 'Reenviando...'
                    : cooldownTime > 0
                      ? `Espera ${cooldownTime}s`
                      : 'Reenviar email'}
                </Button>

                <Button
                  onClick={() => router.push(ROUTES.LOGIN)}
                  variant="link"
                  className="w-full"
                >
                  ← Volver al inicio de sesión
                </Button>
              </div>
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
            Olvidé mi contraseña
          </h1>
          <p className="text-center text-gray-500 text-base">
            Ingresa tu email para recibir un enlace de recuperación
          </p>
        </div>

        <div className="animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              icon={<FaEnvelope className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un correo electrónico válido',
                },
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
                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
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

