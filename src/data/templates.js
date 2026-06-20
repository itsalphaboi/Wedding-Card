/**
 * Template definitions for the wedding invitation builder.
 * Each template defines its visual identity, default styling, and section layout.
 */

export const TEMPLATES = [
  {
    id: 'romantic-floral',
    name: 'Romantic Floral',
    emoji: '🌸',
    tagline: 'Soft petals & timeless romance',
    description:
      'Watercolor flowers, soft pastels, and flowing script typography create a dreamy, romantic atmosphere.',
    features: ['Floating petal animations', 'Parallax flower borders', 'Watercolor backgrounds'],
    defaults: {
      fonts: { heading: "'Great Vibes', cursive", body: "'Cormorant Garamond', serif" },
      colors: {
        primary: '#F4C2C2',
        secondary: '#B2AC88',
        accent: '#D4AF37',
        text: '#3C2415',
        background: '#FFFEF9',
      },
    },
    sections: ['hero', 'love-story', 'event-details', 'venue', 'rsvp', 'closing'],
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    emoji: '✨',
    tagline: 'Clean lines & bold elegance',
    description:
      'Sophisticated typography, geometric accents, and generous white space for a sleek, contemporary feel.',
    features: ['Geometric line draws', 'Scale-up transitions', 'Gold accent animations'],
    defaults: {
      fonts: { heading: "'Playfair Display', serif", body: "'Inter', sans-serif" },
      colors: {
        primary: '#2D2D2D',
        secondary: '#C9A84C',
        accent: '#C9A84C',
        text: '#1A1A1A',
        background: '#FAF9F6',
      },
    },
    sections: ['hero', 'countdown', 'event-details', 'venue', 'rsvp', 'footer'],
  },
  {
    id: 'rustic-elegance',
    name: 'Rustic Elegance',
    emoji: '🍂',
    tagline: 'Earth tones & natural charm',
    description:
      'Botanical illustrations, warm earth tones, and kraft paper textures for a cozy, nature-inspired celebration.',
    features: ['Vine growth animations', 'Botanical illustrations', 'Texture overlays'],
    defaults: {
      fonts: { heading: "'Amatic SC', cursive", body: "'Lora', serif" },
      colors: {
        primary: '#722F37',
        secondary: '#228B22',
        accent: '#D4AF37',
        text: '#2C1810',
        background: '#FFFDD0',
      },
    },
    sections: ['hero', 'our-story', 'ceremony-reception', 'venue', 'rsvp', 'thank-you'],
  },
  {
    id: 'celestial-dreamscape',
    name: 'Celestial Dreamscape',
    emoji: '🌙',
    tagline: 'Stars, moons & cosmic romance',
    description:
      'Deep midnight blues, twinkling stars, and shimmering metallics for a magical, celestial atmosphere.',
    features: ['Twinkling starfield', 'Constellation path draws', 'Shooting star animations'],
    defaults: {
      fonts: { heading: "'Cinzel', serif", body: "'EB Garamond', serif" },
      colors: {
        primary: '#0D1B2A',
        secondary: '#1B3A5C',
        accent: '#E8D5B7',
        text: '#E8E6E3',
        background: '#0A1628',
      },
    },
    sections: ['hero', 'written-in-stars', 'event-details', 'venue', 'rsvp', 'closing'],
  },
  {
    id: 'art-deco-glamour',
    name: 'Art Deco Glamour',
    emoji: '🥂',
    tagline: 'Gold, geometry & Gatsby grandeur',
    description:
      'Bold black and gold, geometric fan patterns, and 1920s glamour for a truly luxurious celebration.',
    features: ['Geometric fan animations', 'Gold border draws', 'Art deco patterns'],
    defaults: {
      fonts: { heading: "'Poiret One', cursive", body: "'Raleway', sans-serif" },
      colors: {
        primary: '#1A1A1A',
        secondary: '#C9A84C',
        accent: '#E8D5B7',
        text: '#F5F0E8',
        background: '#0D0D0D',
      },
    },
    sections: ['hero', 'celebration', 'event-details', 'venue', 'rsvp', 'finale'],
  },
];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id);
