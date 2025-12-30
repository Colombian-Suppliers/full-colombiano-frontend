'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import ROUTES from '@/config/routes.config';

function VerifyEmailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams?.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token de verificación no encontrado');
        return;
      }

      try {
        const response = await api.auth.verifyEmail({ token });
        setStatus('success');
        setMessage('¡Tu email ha sido verificado exitosamente!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        if (error.response?.status === 400) {
          setMessage('Token inválido o expirado');
        } else if (error.response?.data?.detail) {
          setMessage(error.response.data.detail);
        } else {
          setMessage('Error al verificar el email. Por favor intenta de nuevo.');
        }
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verificando email...
            </h2>
            <p className="text-gray-600">
              Por favor espera mientras verificamos tu email
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Email Verificado!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-4">
              Serás redirigido al login en unos segundos...
            </p>
            <Link href={ROUTES.LOGIN}>
              <Button fullWidth>
                Ir al Login
              </Button>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error de Verificación
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link href={ROUTES.RESEND_VERIFICATION}>
                <Button fullWidth variant="outline">
                  Reenviar Email de Verificación
                </Button>
              </Link>
              <Link href={ROUTES.LOGIN}>
                <Button fullWidth variant="ghost">
                  Volver al Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
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
      <VerifyEmailPageContent />
    </Suspense>
  );
}

