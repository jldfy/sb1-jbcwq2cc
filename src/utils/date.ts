import { format, parseISO, addDays as dateFnsAddDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: Date | string | null): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'dd MMM yyyy', { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

export function formatTime(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'HH:mm', { locale: fr });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}

export function calculateEndDate(startDate: Date, duration: number, totalRenewals: number): Date {
  return dateFnsAddDays(startDate, duration * totalRenewals);
}

export function addDays(date: Date, days: number): Date {
  return dateFnsAddDays(date, days);
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}