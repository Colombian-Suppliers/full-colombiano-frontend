/**
 * HTML Utilities
 * Funciones para manipular contenido HTML
 */

/**
 * Extrae el contenido del body de un string HTML
 * @param html - String con contenido HTML
 * @returns Contenido del body o el HTML original si no hay body
 */
export const extractBodyContent = (html: string): string => {
  if (!html) return '';

  try {
    let processedHtml = html;

    // Decode HTML entities if escaped (e.g. &lt; -> <)
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    const decoded = textarea.value;

    if (decoded !== html) {
      processedHtml = decoded;
    }

    // If the HTML includes a full document, extract body content
    if (processedHtml.includes('<!DOCTYPE') || processedHtml.includes('<html')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(processedHtml, 'text/html');
      const body = doc.querySelector('body');
      if (body && body.innerHTML) {
        return body.innerHTML;
      }
    }

    return processedHtml;
  } catch (error) {
    console.error('Error al extraer contenido del body:', error);
    return html;
  }
};

/**
 * Trunca un string HTML a un número específico de caracteres
 * @param html - String con contenido HTML
 * @param maxLength - Longitud máxima del texto
 * @returns Texto truncado con "..."
 */
export const truncateHtml = (html: string, maxLength: number = 150): string => {
  const text = getPlainTextPreview(html);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Obtiene una vista previa en texto plano de un contenido HTML
 * @param html - String con contenido HTML
 * @param maxLength - Longitud máxima del texto (default: 150)
 * @returns Vista previa en texto plano
 */
export const getPlainTextPreview = (html: string): string => {
  if (!html) return '';

  try {
    const processedHtml = extractBodyContent(html);
    const temp = document.createElement('div');
    temp.innerHTML = processedHtml;
    const text = temp.textContent || temp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error al extraer texto plano:', error);
    return '';
  }
};

/**
 * Sanitiza contenido HTML para prevenir XSS
 * @param html - String con contenido HTML
 * @returns HTML sanitizado
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  try {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const scripts = temp.querySelectorAll('script, iframe, object, embed');
    scripts.forEach((script) => script.remove());

    const allElements = temp.querySelectorAll('*');
    allElements.forEach((element) => {
      const dangerousAttrs = [
        'onclick',
        'onload',
        'onerror',
        'onmouseover',
        'onmouseout',
      ];
      dangerousAttrs.forEach((attr) => {
        if (element.hasAttribute(attr)) {
          element.removeAttribute(attr);
        }
      });
    });

    return temp.innerHTML;
  } catch (error) {
    console.error('Error al sanitizar HTML:', error);
    return '';
  }
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
  const text = getPlainTextPreview(html);
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
