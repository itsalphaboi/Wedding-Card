/**
 * Curated font pairings for wedding invitations.
 * Each pairing includes a heading font (script/display) and body font (serif/sans-serif).
 * Google Fonts are loaded dynamically via link injection.
 */

export const FONT_PAIRINGS = [
  {
    id: 'classic-romance',
    name: 'Classic Romance',
    heading: { family: "'Great Vibes', cursive", google: 'Great+Vibes' },
    body: { family: "'Cormorant Garamond', serif", google: 'Cormorant+Garamond:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'modern-luxe',
    name: 'Modern Luxe',
    heading: { family: "'Playfair Display', serif", google: 'Playfair+Display:wght@400;500;600;700;800;900' },
    body: { family: "'Inter', sans-serif", google: 'Inter:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'rustic-charm',
    name: 'Rustic Charm',
    heading: { family: "'Amatic SC', cursive", google: 'Amatic+SC:wght@400;700' },
    body: { family: "'Lora', serif", google: 'Lora:wght@400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'timeless-grace',
    name: 'Timeless Grace',
    heading: { family: "'Cinzel', serif", google: 'Cinzel:wght@400;500;600;700;800;900' },
    body: { family: "'EB Garamond', serif", google: 'EB+Garamond:wght@400;500;600;700;800' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'whimsical',
    name: 'Whimsical',
    heading: { family: "'Dancing Script', cursive", google: 'Dancing+Script:wght@400;500;600;700' },
    body: { family: "'Quicksand', sans-serif", google: 'Quicksand:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    heading: { family: "'Poiret One', cursive", google: 'Poiret+One' },
    body: { family: "'Raleway', sans-serif", google: 'Raleway:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'garden-party',
    name: 'Garden Party',
    heading: { family: "'Sacramento', cursive", google: 'Sacramento' },
    body: { family: "'Nunito', sans-serif", google: 'Nunito:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
  {
    id: 'bold-beautiful',
    name: 'Bold & Beautiful',
    heading: { family: "'Abril Fatface', serif", google: 'Abril+Fatface' },
    body: { family: "'Source Sans 3', sans-serif", google: 'Source+Sans+3:wght@300;400;500;600;700' },
    preview: 'Aa Bb Cc',
  },
];

/**
 * Load Google Fonts dynamically by injecting a <link> tag.
 * @param {string[]} fontGoogleIds - Array of Google Font query strings
 */
export function loadGoogleFonts(fontGoogleIds) {
  const existing = document.querySelector('link[data-wcard-fonts]');
  if (existing) existing.remove();

  const families = fontGoogleIds.map((f) => `family=${f}`).join('&');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  link.setAttribute('data-wcard-fonts', 'true');
  document.head.appendChild(link);
}

export const getFontPairingById = (id) => FONT_PAIRINGS.find((f) => f.id === id);
