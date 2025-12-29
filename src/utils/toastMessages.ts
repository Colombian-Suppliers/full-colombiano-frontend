/**
 * Toast Messages in Spanish
 * Centraliza todos los mensajes de toast (success, error, alert) de la aplicación en español
 */

// Mensajes de éxito - Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '¡Bienvenido! Has iniciado sesión correctamente.',
  REGISTER_SUCCESS: '¡Cuenta creada exitosamente! Bienvenido.',
  REGISTER_SUCCESS_WITH_EMAIL:
    '¡Cuenta creada exitosamente! Revisa tu email para confirmar tu cuenta.',
  LOGOUT_SUCCESS: 'Has cerrado sesión correctamente.',
  EMAIL_VERIFICATION_SUCCESS:
    '¡Email verificado exitosamente! Ahora puedes iniciar sesión.',
  PASSWORD_RESET_SUCCESS: 'Contraseña actualizada exitosamente.',
  FORGOT_PASSWORD_SUCCESS:
    'Se ha enviado un enlace de recuperación a tu correo electrónico.',
  RESEND_VERIFICATION_SUCCESS:
    'Se ha enviado un nuevo enlace de verificación a tu correo.',
  RESEND_RESET_SUCCESS:
    'Se ha enviado un nuevo enlace de recuperación a tu correo.',
};

// Mensajes de error - Error Messages
export const ERROR_MESSAGES = {
  // Autenticación
  LOGIN_ERROR: 'Las credenciales proporcionadas son incorrectas.',
  REGISTER_ERROR: 'Error al crear la cuenta. Intenta nuevamente.',
  PASSWORD_SECURITY: 'La contraseña no cumple con los requisitos de seguridad.',
  EMAIL_EXISTS: 'El correo electrónico ya está registrado.',
  INVALID_CREDENTIALS: 'Credenciales inválidas.',
  USER_NOT_FOUND: 'Usuario no encontrado.',
  ACCOUNT_NOT_VERIFIED: 'Cuenta no verificada.',
  TOKEN_EXPIRED: 'El token ha expirado.',
  INVALID_TOKEN: 'Token inválido.',
  EMAIL_NOT_VERIFIED: 'Correo electrónico no verificado.',
  
  // Validaciones
  REQUIRED_FIELD: 'Este campo es obligatorio.',
  INVALID_EMAIL: 'Correo electrónico inválido.',
  INVALID_PHONE: 'Número de teléfono inválido.',
  WEAK_PASSWORD: 'La contraseña es demasiado débil.',
  PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres.',
  
  // API y Red
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Inténtalo más tarde.',
  GEO_ERROR: 'Error al cargar la información geográfica.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado. Inténtalo nuevamente.',
  
  // Validaciones generales
  VALIDATION_ERROR: 'Por favor completa todos los campos correctamente.',
};

// Mensajes de alerta/advertencia - Alert Messages
export const ALERT_MESSAGES = {
  SESSION_EXPIRED:
    'Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.',
  EMAIL_ALREADY_VERIFIED: 'Tu correo electrónico ya ha sido verificado.',
  UNSAVED_CHANGES: 'Tienes cambios sin guardar. ¿Deseas continuar?',
};

// Export all messages as TOAST_MESSAGES
export const TOAST_MESSAGES = {
  ...SUCCESS_MESSAGES,
  ...ERROR_MESSAGES,
  ...ALERT_MESSAGES,
};

export default TOAST_MESSAGES;

