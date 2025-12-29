/**
 * Date Utilities
 * Funciones para formatear fechas en formato colombiano
 */

import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha en formato colombiano
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha formateada (ej: "15 de enero de 2024")
 */
export const formatDateColombian = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha en formato corto
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha formateada (ej: "15/01/2024")
 */
export const formatDateShort = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha con hora
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha y hora formateada (ej: "15/01/2024 14:30")
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd/MM/yyyy HH:mm');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha de forma relativa (hace X días)
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha relativa (ej: "hace 2 días")
 */
export const formatDateRelative = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
    const years = Math.floor(diffInDays / 365);
    return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return 'Fecha inválida';
  }
};

/**
 * Alias para formatDateRelative (formato colombiano)
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha relativa (ej: "hace 2 días")
 */
export const formatRelativeDateColombian = formatDateRelative;

