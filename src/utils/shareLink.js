/**
 * Encode/decode invitation state for URL sharing.
 * Uses Base64-encoded JSON for client-side persistence.
 */

/**
 * Encode invitation state into a URL-safe string.
 * @param {Object} state - The full invitation state
 * @returns {string} Base64-encoded string
 */
export function encodeInvitation(state) {
  try {
    const json = JSON.stringify(state);
    // Use btoa with URI encoding for Unicode support
    const encoded = btoa(unescape(encodeURIComponent(json)));
    return encoded;
  } catch (e) {
    console.error('Failed to encode invitation:', e);
    return '';
  }
}

/**
 * Decode invitation state from a URL-safe string.
 * @param {string} encoded - Base64-encoded string
 * @returns {Object|null} Decoded invitation state, or null on failure
 */
export function decodeInvitation(encoded) {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to decode invitation:', e);
    return null;
  }
}

/**
 * Generate a shareable URL for the invitation.
 * @param {Object} state - The full invitation state
 * @returns {string} Full URL with encoded invitation data
 */
export function generateShareLink(state) {
  const encoded = encodeInvitation(state);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#/invite/${encoded}`;
}

/**
 * Copy text to clipboard with fallback.
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (e) {
    console.error('Failed to copy:', e);
    return false;
  }
}

/**
 * Share via Web Share API (mobile).
 * @param {Object} state - The invitation state
 * @returns {Promise<boolean>} True if shared successfully
 */
export async function shareInvitation(state) {
  const url = generateShareLink(state);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${state.content.brideName} & ${state.content.groomName}'s Wedding`,
        text: 'You are invited to our wedding! 💍',
        url,
      });
      return true;
    } catch (e) {
      if (e.name !== 'AbortError') console.error('Share failed:', e);
      return false;
    }
  }
  return copyToClipboard(url);
}
