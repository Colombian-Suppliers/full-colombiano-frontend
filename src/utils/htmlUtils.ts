/**
 * HTML Utilities
 * Funciones para manipular contenido HTML
 */

/**
 * Extrae el contenido de texto de un string HTML
 * @param html - String con contenido HTML
 * @returns Texto sin etiquetas HTML
 */
export const extractBodyContent = (html: string): string => {
  if (!html) return '';

  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  const decoded = textarea.value;

  // Clean up extra whitespace
  return decoded.trim().replace(/\s+/g, ' ');
};

/**
 * Trunca un string HTML a un número específico de caracteres
 * @param html - String con contenido HTML
 * @param maxLength - Longitud máxima del texto
 * @returns Texto truncado con "..."
 */
export const truncateHtml = (html: string, maxLength: number = 150): string => {
  const text = extractBodyContent(html);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Obtiene una vista previa en texto plano de un contenido HTML
 * @param html - String con contenido HTML
 * @param maxLength - Longitud máxima del texto (default: 150)
 * @returns Vista previa en texto plano
 */
export const getPlainTextPreview = (html: string, maxLength: number = 150): string => {
  return truncateHtml(html, maxLength);
};

/**
 * Sanitiza contenido HTML para prevenir XSS
 * @param html - String con contenido HTML
 * @returns HTML sanitizado
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  // Basic sanitization - remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');

  return sanitized;
};

/**
 * Convierte texto plano a HTML con saltos de línea
 * @param text - Texto plano
 * @returns HTML con <br> tags
 */
export const textToHtml = (text: string): string => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};

/**
 * Extrae la primera imagen de un contenido HTML
 * @param html - String con contenido HTML
 * @returns URL de la primera imagen o null
 */
export const extractFirstImage = (html: string): string | null => {
  if (!html) return null;

  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);

  return match ? match[1] : null;
};

/**
 * Cuenta las palabras en un contenido HTML
 * @param html - String con contenido HTML
 * @returns Número de palabras
 */
export const countWords = (html: string): number => {
  const text = extractBodyContent(html);
  if (!text) return 0;

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
};

/**
 * Estima el tiempo de lectura de un contenido HTML
 * @param html - String con contenido HTML
 * @param wordsPerMinute - Palabras por minuto (default: 200)
 * @returns Tiempo de lectura en minutos
 */
export const estimateReadingTime = (
  html: string,
  wordsPerMinute: number = 200
): number => {
  const wordCount = countWords(html);
  return Math.ceil(wordCount / wordsPerMinute);
};

