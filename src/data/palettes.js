/**
 * Curated color palette presets for wedding invitations.
 * Each palette includes primary, secondary, accent, text, and background colors.
 */

export const COLOR_PALETTES = [
  {
    id: 'champagne-blush',
    name: 'Champagne & Blush',
    category: 'timeless',
    colors: {
      primary: '#F4C2C2',
      secondary: '#F7E7CE',
      accent: '#D4AF37',
      text: '#3C2415',
      background: '#FFFEF9',
    },
  },
  {
    id: 'ivory-gold',
    name: 'Ivory & Gold',
    category: 'timeless',
    colors: {
      primary: '#FFFFF0',
      secondary: '#E2DFD2',
      accent: '#CFB53B',
      text: '#2C2C2C',
      background: '#FAFAF5',
    },
  },
  {
    id: 'sage-dusty-rose',
    name: 'Sage & Dusty Rose',
    category: 'nature',
    colors: {
      primary: '#9CAF88',
      secondary: '#DCAE96',
      accent: '#D4AF37',
      text: '#2C3E2C',
      background: '#F5F0EB',
    },
  },
  {
    id: 'eucalyptus-silver',
    name: 'Eucalyptus & Silver',
    category: 'nature',
    colors: {
      primary: '#8DB580',
      secondary: '#C0C0C0',
      accent: '#87A96B',
      text: '#1C3A1C',
      background: '#FFFDD0',
    },
  },
  {
    id: 'charcoal-gold',
    name: 'Charcoal & Gold',
    category: 'modern',
    colors: {
      primary: '#2D2D2D',
      secondary: '#C9A84C',
      accent: '#C9A84C',
      text: '#1A1A1A',
      background: '#FAF9F6',
    },
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    category: 'modern',
    colors: {
      primary: '#1B2A4A',
      secondary: '#C9A84C',
      accent: '#E8D5B7',
      text: '#0D1B2A',
      background: '#F0F2F5',
    },
  },
  {
    id: 'deep-wine',
    name: 'Deep Wine & Bordeaux',
    category: 'bold',
    colors: {
      primary: '#722F37',
      secondary: '#4A0E0E',
      accent: '#FFD700',
      text: '#2C1810',
      background: '#FFF8F0',
    },
  },
  {
    id: 'mocha-terracotta',
    name: 'Mocha & Terracotta',
    category: 'bold',
    colors: {
      primary: '#A67B5B',
      secondary: '#E2725B',
      accent: '#B87333',
      text: '#3E2723',
      background: '#FFF5EE',
    },
  },
  {
    id: 'dusty-mauve',
    name: 'Dusty Mauve & Plum',
    category: 'bold',
    colors: {
      primary: '#C9A9A6',
      secondary: '#673147',
      accent: '#D4AF37',
      text: '#2C1B2E',
      background: '#FAF5F7',
    },
  },
  {
    id: 'powder-blue',
    name: 'Powder Blue & Cream',
    category: 'timeless',
    colors: {
      primary: '#B0D4E8',
      secondary: '#F5E6CC',
      accent: '#7B9BAD',
      text: '#1C3D5A',
      background: '#FAFCFE',
    },
  },
];

export const getPalettesByCategory = (category) =>
  COLOR_PALETTES.filter((p) => p.category === category);

export const getPaletteById = (id) => COLOR_PALETTES.find((p) => p.id === id);
