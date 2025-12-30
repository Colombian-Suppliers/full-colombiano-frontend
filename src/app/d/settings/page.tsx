'use client';

import Button from '@/components/ui/Button/Button';
import {
  MdPerson,
  MdSecurity,
  MdNotifications,
  MdPayment,
  MdLanguage,
} from 'react-icons/md';

interface SettingItem {
  label: string;
  value: string;
  editable: boolean;
  type?: string;
}

interface SettingsSection {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: SettingItem[];
}

/**
 * Settings Page
 * Complete settings management for seller profile, security, notifications, payments, and preferences
 */
export default function SettingsPage() {
  const settingsSections: SettingsSection[] = [
    {
      icon: MdPerson,
      title: 'Perfil',
      description: 'Gestiona tu información personal y de contacto',
      items: [
        { label: 'Nombre completo', value: 'Juan Pérez', editable: true },
        { label: 'Email', value: 'juan@example.com', editable: true },
        { label: 'Teléfono', value: '+57 300 123 4567', editable: true },
        {
          label: 'Dirección',
          value: 'Calle 123 #45-67, Bogotá',
          editable: true,
        },
      ],
    },
    {
      icon: MdSecurity,
      title: 'Seguridad',
      description: 'Configura la seguridad de tu cuenta',
      items: [
        {
          label: 'Contraseña',
          value: '••••••••',
          editable: true,
          type: 'password',
        },
        {
          label: 'Autenticación de dos factores',
          value: 'Desactivada',
          editable: true,
        },
        { label: 'Sesiones activas', value: '1 sesión', editable: false },
      ],
    },
    {
      icon: MdNotifications,
      title: 'Notificaciones',
      description: 'Personaliza cómo quieres recibir notificaciones',
      items: [
        {
          label: 'Notificaciones por email',
          value: 'Activadas',
          editable: true,
        },
        { label: 'Notificaciones push', value: 'Activadas', editable: true },
        { label: 'Resumen semanal', value: 'Activado', editable: true },
        { label: 'Alertas de seguridad', value: 'Activadas', editable: true },
      ],
    },
    {
      icon: MdPayment,
      title: 'Pagos',
      description: 'Configura tus métodos de pago y retiros',
      items: [
        { label: 'Cuenta bancaria', value: '****1234', editable: true },
        {
          label: 'Método de retiro preferido',
          value: 'Transferencia bancaria',
          editable: true,
        },
        { label: 'Frecuencia de retiros', value: 'Semanal', editable: true },
      ],
    },
    {
      icon: MdLanguage,
      title: 'Preferencias',
      description: 'Configura el idioma y otras preferencias',
      items: [
        { label: 'Idioma', value: 'Español', editable: true },
        { label: 'Zona horaria', value: 'Colombia (GMT-5)', editable: true },
        { label: 'Formato de fecha', value: 'DD/MM/YYYY', editable: true },
        { label: 'Moneda', value: 'COP', editable: true },
      ],
    },
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ajustes Generales
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona tu cuenta, seguridad y preferencias
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {settingsSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <section.icon className="text-2xl text-primary-600 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 ml-10">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">
                          {item.label}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.value}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.editable && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="text-xs"
                          >
                            Editar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Esta funcionalidad estará disponible próximamente
                  </p>
                </div>
              </div>
            ))}

            {/* Sección de Acciones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones de Cuenta
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Exportar Datos
                    </h3>
                    <p className="text-sm text-gray-600">
                      Descarga una copia de todos tus datos
                    </p>
                  </div>
                  <Button variant="outline" disabled>
                    Exportar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-red-900">
                      Eliminar Cuenta
                    </h3>
                    <p className="text-sm text-red-600">
                      Esta acción no se puede deshacer
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    disabled
                  >
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Estas funcionalidades estarán disponibles próximamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
