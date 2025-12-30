'use client';

import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import ROUTES from '@/config/routes.config';
import Button from '@/components/ui/Button/Button';
import Card, { CardHeader, CardContent } from '@/components/ui/Card/Card';

export default function VerificationSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md animate-fade-in shadow-lg border-primary-200">
        <CardHeader className="animate-slide-up">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-center text-primary-700">
            ¡Email verificado exitosamente!
          </h1>
        </CardHeader>

        <CardContent className="animate-slide-up">
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              <p>Tu dirección de email ha sido verificada correctamente.</p>
              <p className="mt-2 text-sm">
                Ahora puedes iniciar sesión en tu cuenta y comenzar a usar todos
                los servicios de la plataforma.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push(ROUTES.LOGIN)}
                className="w-full hover:shadow-md"
              >
                Iniciar sesión ahora
              </Button>

              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full"
              >
                Ir al inicio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

