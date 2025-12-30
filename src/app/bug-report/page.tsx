'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea/Textarea';
import Card, {
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/Card/Card';
import {
  MdBugReport,
  MdInfo,
  MdContactMail,
  MdSystemUpdate,
} from 'react-icons/md';
import {
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaQuestion,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function BugReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-detect browser and OS info (simplified)
  const [browserInfo] = useState(() => {
    if (typeof window === 'undefined') return { browser: 'Unknown', version: 'Unknown' };
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    
    if (ua.indexOf('Chrome') > -1) {
      browser = 'Chrome';
      version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Safari') > -1) {
      browser = 'Safari';
      version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Edge') > -1) {
      browser = 'Edge';
      version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    }
    
    return { browser, version };
  });

  const [osInfo] = useState(() => {
    if (typeof window === 'undefined') return { os: 'Unknown', version: 'Unknown' };
    const ua = navigator.userAgent;
    let os = 'Unknown';
    let version = 'Unknown';
    
    if (ua.indexOf('Win') > -1) {
      os = 'Windows';
      version = ua.match(/Windows NT (\d+\.\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Mac') > -1) {
      os = 'macOS';
      version = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
    } else if (ua.indexOf('Linux') > -1) {
      os = 'Linux';
    } else if (ua.indexOf('Android') > -1) {
      os = 'Android';
      version = ua.match(/Android (\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('iOS') > -1) {
      os = 'iOS';
      version = ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
    }
    
    return { os, version };
  });

  const categories = [
    { id: 'ui', name: 'Interfaz de Usuario', description: 'Problemas visuales o de diseño' },
    { id: 'functionality', name: 'Funcionalidad', description: 'Características que no funcionan' },
    { id: 'performance', name: 'Rendimiento', description: 'Lentitud o problemas de velocidad' },
    { id: 'security', name: 'Seguridad', description: 'Vulnerabilidades o problemas de seguridad' },
    { id: 'other', name: 'Otro', description: 'Otros problemas' },
  ];

  const severities = [
    { id: 'low', name: 'Baja - Problema menor' },
    { id: 'medium', name: 'Media - Afecta funcionalidad' },
    { id: 'high', name: 'Alta - Bloquea tareas importantes' },
    { id: 'critical', name: 'Crítica - Sistema no funciona' },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('¡Reporte enviado exitosamente! Te responderemos pronto.');
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error('Error al enviar el reporte');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBrowserIcon = (browserName: string) => {
    switch (browserName?.toLowerCase()) {
      case 'chrome':
        return <FaChrome className="w-5 h-5 text-green-600" />;
      case 'firefox':
        return <FaFirefox className="w-5 h-5 text-orange-600" />;
      case 'safari':
        return <FaSafari className="w-5 h-5 text-blue-600" />;
      case 'edge':
        return <FaEdge className="w-5 h-5 text-blue-700" />;
      default:
        return <FaQuestion className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <MdBugReport className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reportar un Bug
            </h1>
            <p className="text-lg text-gray-600">
              Ayúdanos a mejorar Full Colombiano reportando cualquier problema
              que encuentres
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MdBugReport className="w-5 h-5" />
                Detalles del Problema
              </h2>
              <p className="text-primary-100 text-sm">
                Cuantos más detalles proporciones, más fácil será para nosotros
                solucionarlo
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título del Bug <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="title"
                      placeholder="Describe brevemente el problema"
                      maxLength={100}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Máximo 100 caracteres
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severidad <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="severity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona la severidad</option>
                      {severities.map((severity) => (
                        <option key={severity.id} value={severity.id}>
                          {severity.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} - {category.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="description"
                    placeholder="Describe el problema de manera detallada. ¿Qué estabas haciendo? ¿Qué esperabas que sucediera? ¿Qué sucedió en realidad?"
                    rows={4}
                    maxLength={2000}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo 2000 caracteres
                  </p>
                </div>

                {/* Technical Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <MdSystemUpdate className="w-5 h-5" />
                    Información Técnica (Auto-detectada)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border">
                      {getBrowserIcon(browserInfo.browser)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Navegador: {browserInfo.browser}
                        </p>
                        <p className="text-xs text-gray-500">
                          Versión: {browserInfo.version}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border">
                      <MdSystemUpdate className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Sistema: {osInfo.os}
                        </p>
                        <p className="text-xs text-gray-500">
                          Versión: {osInfo.version}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <MdInfo className="w-5 h-5" />
                    Información Adicional (Opcional)
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pasos para reproducir
                    </label>
                    <Textarea
                      name="stepsToReproduce"
                      placeholder="1. Ve a la página X&#10;2. Haz clic en Y&#10;3. El error ocurre cuando..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comportamiento esperado
                      </label>
                      <Textarea
                        name="expectedBehavior"
                        placeholder="¿Qué debería suceder?"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comportamiento actual
                      </label>
                      <Textarea
                        name="actualBehavior"
                        placeholder="¿Qué sucede en realidad?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <MdContactMail className="w-5 h-5 text-blue-600" />
                    Información de Contacto (Opcional)
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Si deseas que te contactemos sobre este reporte, proporciona
                    tu información.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                      </label>
                      <Input
                        name="contactName"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        name="contactEmail"
                        type="email"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        name="contactPhone"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Enviando Reporte...' : 'Enviar Reporte'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/')}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <MdInfo className="w-4 h-4" />
                  Tu reporte nos ayuda a mejorar la plataforma. Revisamos todos
                  los reportes y priorizamos según la severidad y el impacto.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

