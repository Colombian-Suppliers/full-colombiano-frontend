import Link from 'next/link';
import { MdHome, MdShoppingCart, MdSearchOff } from 'react-icons/md';
import Button from '@/components/ui/Button/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Icon */}
        <div className="mb-8">
          <MdSearchOff className="w-24 h-24 text-primary-400 mx-auto" />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. Te
          invitamos a explorar nuestras opciones disponibles.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              variant="primary"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MdHome className="w-5 h-5" />
              Ir al inicio
            </Button>
          </Link>

          <Link href="/marketplace">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-primary-300 text-primary-700 hover:bg-primary-50"
            >
              <MdShoppingCart className="w-5 h-5" />
              Explorar marketplace
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda?{' '}
            <Link
              href="/contact-us"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

