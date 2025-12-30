'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaTimesCircle, FaClock } from 'react-icons/fa';
import ROUTES from '@/config/routes.config';
import Button from '@/components/ui/Button/Button';
import Card, { CardHeader, CardContent } from '@/components/ui/Card/Card';

function VerificationErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorType = searchParams?.get('error') || 'generic';
  const errorMessage =
    searchParams?.get('message') || 'Error desconocido en la verificación';

  const getErrorConfig = (type: string) => {
    switch (type) {
      case 'token_expired':
        return {
          icon: <FaClock className="text-yellow-500 text-4xl" />,
          title: 'Enlace expirado',
          message: 'El enlace de verificación ha expirado.',
          description:
            'Los enlaces de verificación son válidos por 24 horas. Solicita un nuevo enlace para continuar.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-700',
          primaryAction: 'Solicitar nuevo enlace',
          primaryRoute: ROUTES.RESEND_VERIFICATION,
        };
      case 'token_invalid':
        return {
          icon: <FaTimesCircle className="text-red-500 text-4xl" />,
          title: 'Enlace inválido',
          message: 'El enlace de verificación no es válido.',
          description:
            'El enlace puede estar corrupto o ya haber sido utilizado. Solicita un nuevo enlace de verificación.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          primaryAction: 'Solicitar nuevo enlace',
          primaryRoute: ROUTES.RESEND_VERIFICATION,
        };
      case 'already_verified':
        return {
          icon: <FaTimesCircle className="text-blue-500 text-4xl" />,
          title: 'Email ya verificado',
          message: 'Tu email ya está verificado.',
          description:
            'No necesitas verificar este email nuevamente. Puedes iniciar sesión normalmente.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          primaryAction: 'Iniciar sesión',
          primaryRoute: ROUTES.LOGIN,
        };
      default:
        return {
          icon: <FaTimesCircle className="text-red-500 text-4xl" />,
          title: 'Verificación fallida',
          message: errorMessage,
          description:
            'Ha ocurrido un error durante la verificación. Inténtalo nuevamente o solicita un nuevo enlace.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          primaryAction: 'Solicitar nuevo enlace',
          primaryRoute: ROUTES.RESEND_VERIFICATION,
        };
    }
  };

  const config = getErrorConfig(errorType);

  return (
    <Card className="w-full max-w-md animate-fade-in shadow-lg border-primary-200">
      <CardHeader className="animate-slide-up">
        <div className="flex justify-center mb-4">{config.icon}</div>
        <h1 className="text-2xl font-bold text-center text-primary-700">
          {config.title}
        </h1>
      </CardHeader>

      <CardContent className="animate-slide-up">
        <div className="text-center space-y-6">
          <div
            className={`${config.bgColor} border ${config.borderColor} ${config.textColor} px-4 py-3 rounded-md`}
          >
            <p className="font-medium">{config.message}</p>
            <p className="mt-2 text-sm">{config.description}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push(config.primaryRoute)}
              className="w-full hover:shadow-md"
            >
              {config.primaryAction}
            </Button>

            <Button
              onClick={() => router.push(ROUTES.LOGIN)}
              variant="outline"
              className="w-full"
            >
              Ir al inicio de sesión
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerificationErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <Card className="w-full max-w-md p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </Card>
        }
      >
        <VerificationErrorContent />
      </Suspense>
    </div>
  );
}

