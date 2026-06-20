/**
 * Utility to determine appropriate text color for contrast against a background.
 * Uses relative luminance calculation per WCAG 2.0 guidelines.
 */

/**
 * Parse a hex color string to RGB values.
 * @param {string} hex - Color in hex format (#RGB, #RRGGBB)
 * @returns {{ r: number, g: number, b: number }}
 */
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const fullHex =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  return {
    r: parseInt(fullHex.substring(0, 2), 16),
    g: parseInt(fullHex.substring(2, 4), 16),
    b: parseInt(fullHex.substring(4, 6), 16),
  };
}

/**
 * Calculate relative luminance of a color per WCAG 2.0.
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {number} Luminance value between 0 and 1
 */
function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get a contrasting text color (dark or light) for a given background color.
 * @param {string} bgHex - Background color in hex format
 * @param {string} lightColor - Color to use on dark backgrounds (default: '#FFFFFF')
 * @param {string} darkColor - Color to use on light backgrounds (default: '#1A1A1A')
 * @returns {string} The contrasting text color
 */
export function getContrastColor(bgHex, lightColor = '#FFFFFF', darkColor = '#1A1A1A') {
  try {
    const rgb = hexToRgb(bgHex);
    const luminance = getLuminance(rgb);
    return luminance > 0.4 ? darkColor : lightColor;
  } catch {
    return darkColor;
  }
}

/**
 * Lighten a hex color by a percentage.
 * @param {string} hex - Color in hex format
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} Lightened hex color
 */
export function lightenColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const amount = Math.round(2.55 * percent);
  const nr = Math.min(255, r + amount);
  const ng = Math.min(255, g + amount);
  const nb = Math.min(255, b + amount);
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

/**
 * Darken a hex color by a percentage.
 * @param {string} hex - Color in hex format
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened hex color
 */
export function darkenColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const amount = Math.round(2.55 * percent);
  const nr = Math.max(0, r - amount);
  const ng = Math.max(0, g - amount);
  const nb = Math.max(0, b - amount);
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

/**
 * Add alpha (opacity) to a hex color.
 * @param {string} hex - Color in hex format
 * @param {number} alpha - Opacity from 0 to 1
 * @returns {string} RGBA color string
 */
export function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
