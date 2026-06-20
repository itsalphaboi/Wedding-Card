import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';

/**
 * Format a date string into a beautiful wedding display format.
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @param {string} formatStr - date-fns format string
 * @returns {string} Formatted date
 */
export function formatWeddingDate(dateStr, formatStr = 'EEEE, MMMM do, yyyy') {
  try {
    const date = parseISO(dateStr);
    return format(date, formatStr);
  } catch {
    return dateStr;
  }
}

/**
 * Get relative time until the wedding.
 * @param {string} dateStr - ISO date string
 * @returns {string} Human-readable time distance
 */
export function timeUntilWedding(dateStr) {
  try {
    const date = parseISO(dateStr);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return '';
  }
}

/**
 * Calculate countdown parts for the wedding date.
 * @param {string} dateStr - ISO date string
 * @param {string} timeStr - Time string (HH:MM)
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isPast: boolean }}
 */
export function getCountdown(dateStr, timeStr = '00:00') {
  try {
    const target = new Date(`${dateStr}T${timeStr}:00`);
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isPast: false,
    };
  } catch {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
}

/**
 * Get days remaining until the wedding.
 * @param {string} dateStr - ISO date string
 * @returns {number} Days remaining (negative if past)
 */
export function daysUntilWedding(dateStr) {
  try {
    return differenceInDays(parseISO(dateStr), new Date());
  } catch {
    return 0;
  }
}

/**
 * Format time string for display.
 * @param {string} timeStr - Time string (HH:MM)
 * @returns {string} Formatted time (e.g., "4:00 PM")
 */
export function formatTime(timeStr) {
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
}
