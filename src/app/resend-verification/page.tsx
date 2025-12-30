'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import FormField from '@/components/ui/FormField/FormField';
import { showSuccessToast, showErrorToast } from '@/utils/toastUtils';
import ROUTES from '@/config/routes.config';
import { MdEmail } from 'react-icons/md';

export default function ResendVerificationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailValid) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await api.auth.resendVerification({ email });
      showSuccessToast('Email de verificación enviado. Por favor revisa tu bandeja de entrada.');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 2000);
    } catch (err: any) {
      let errorMessage = 'Error al enviar el email de verificación';
      
      if (err.response?.status === 404) {
        errorMessage = 'No se encontró una cuenta con ese email';
      } else if (err.response?.status === 400) {
        errorMessage = 'El email ya está verificado';
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reenviar Verificación
          </h1>
          <p className="text-gray-600">
            Ingresa tu email y te enviaremos un nuevo enlace de verificación
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Correo electrónico"
            error={error}
             isValid={isEmailValid ? !error : undefined}
          >
            <Input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              icon={<MdEmail className="w-5 h-5" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              disabled={isLoading}
            />
          </FormField>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={!isEmailValid || isLoading}
          >
            {isLoading ? 'Enviando...' : 'Reenviar Email de Verificación'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿Ya verificaste tu email?{' '}
              <Link
                href={ROUTES.LOGIN}
                className="text-blue-600 hover:underline font-medium"
              >
                Iniciar sesión
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
                href={ROUTES.REGISTER}
                className="text-blue-600 hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

