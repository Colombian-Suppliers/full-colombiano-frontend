/**
 * Store Utilities
 * Funciones para manejar estados y utilidades de tiendas
 */

export type VerificationStatus =
  | 'pending'
  | 'in_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

/**
 * Obtiene los estilos CSS para un estado de verificación
 * @param status - Estado de verificación
 * @returns Objeto con clases CSS
 */
export const getVerificationStatusStyles = (status: VerificationStatus) => {
  const styles = {
    pending: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      badge: 'bg-yellow-100 text-yellow-800',
    },
    in_review: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
    },
    verified: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-800',
    },
    rejected: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: 'text-red-600',
      badge: 'bg-red-100 text-red-800',
    },
    suspended: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      border: 'border-gray-200',
      icon: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-800',
    },
  };

  return styles[status] || styles.pending;
};

/**
 * Obtiene el texto descriptivo para un estado de verificación
 * @param status - Estado de verificación
 * @returns Texto del estado
 */
export const getVerificationStatusText = (status: VerificationStatus): string => {
  const texts = {
    pending: 'Pendiente de Verificación',
    in_review: 'En Revisión',
    verified: 'Verificado',
    rejected: 'Rechazado',
    suspended: 'Suspendido',
  };

  return texts[status] || 'Desconocido';
};

/**
 * Obtiene la descripción detallada para un estado de verificación
 * @param status - Estado de verificación
 * @returns Descripción del estado
 */
export const getVerificationStatusDescription = (
  status: VerificationStatus
): string => {
  const descriptions = {
    pending:
      'Tu tienda está pendiente de verificación. Por favor completa todos los documentos requeridos.',
    in_review:
      'Tu tienda está siendo revisada por nuestro equipo. Te notificaremos cuando el proceso esté completo.',
    verified:
      '¡Felicitaciones! Tu tienda ha sido verificada y puede comenzar a vender.',
    rejected:
      'Tu solicitud de verificación ha sido rechazada. Por favor revisa los comentarios y vuelve a intentarlo.',
    suspended:
      'Tu tienda ha sido suspendida temporalmente. Contacta a soporte para más información.',
  };

  return descriptions[status] || 'Estado desconocido';
};

/**
 * Valida si una tienda puede realizar ventas
 * @param status - Estado de verificación
 * @returns true si puede vender, false si no
 */
export const canStoreSell = (status: VerificationStatus): boolean => {
  return status === 'verified';
};

/**
 * Valida si una tienda puede editar su información
 * @param status - Estado de verificación
 * @returns true si puede editar, false si no
 */
export const canStoreEdit = (status: VerificationStatus): boolean => {
  return status !== 'suspended';
};

/**
 * Obtiene el siguiente paso recomendado según el estado
 * @param status - Estado de verificación
 * @returns Texto con el siguiente paso
 */
export const getNextStep = (status: VerificationStatus): string => {
  const nextSteps = {
    pending: 'Completa tu perfil y sube los documentos requeridos',
    in_review: 'Espera la revisión de nuestro equipo (1-3 días hábiles)',
    verified: 'Comienza a agregar productos a tu catálogo',
    rejected: 'Revisa los comentarios y corrige la información solicitada',
    suspended: 'Contacta a soporte para resolver la suspensión',
  };

  return nextSteps[status] || 'Contacta a soporte';
};

/**
 * Formatea el nombre de una tienda para URL
 * @param storeName - Nombre de la tienda
 * @returns Slug para URL
 */
export const formatStoreSlug = (storeName: string): string => {
  return storeName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Valida un nombre de tienda
 * @param storeName - Nombre de la tienda
 * @returns true si es válido, false si no
 */
export const isValidStoreName = (storeName: string): boolean => {
  if (!storeName || storeName.trim().length < 3) return false;
  if (storeName.length > 50) return false;

  // Check for invalid characters
  const invalidChars = /[<>{}[\]\\\/]/;
  if (invalidChars.test(storeName)) return false;

  return true;
};

/**
 * Calcula el porcentaje de completitud del perfil de una tienda
 * @param store - Objeto con datos de la tienda
 * @returns Porcentaje de completitud (0-100)
 */
export const calculateStoreCompleteness = (store: any): number => {
  if (!store) return 0;

  const requiredFields = [
    'name',
    'description',
    'logo',
    'banner',
    'phone',
    'email',
    'address',
    'city',
    'department',
    'categories',
  ];

  const completedFields = requiredFields.filter((field) => {
    const value = store[field];
    if (Array.isArray(value)) return value.length > 0;
    return value && value.toString().trim().length > 0;
  });

  return Math.round((completedFields.length / requiredFields.length) * 100);
};

