import { createContext, useContext, useReducer, useEffect } from 'react';
import { TEMPLATES } from '../data/templates';
import { FONT_PAIRINGS, loadGoogleFonts } from '../data/fonts';

const InvitationContext = createContext(null);

const defaultTemplate = TEMPLATES[0];
const defaultFontPairing = FONT_PAIRINGS[0];

const initialState = {
  id: null,
  title: 'My Wedding Invitation',
  template: defaultTemplate.id,
  fontPairing: defaultFontPairing.id,
  fonts: {
    heading: defaultTemplate.defaults.fonts.heading,
    body: defaultTemplate.defaults.fonts.body,
  },
  colors: { ...defaultTemplate.defaults.colors },
  content: {
    brideName: 'Emma',
    groomName: 'James',
    weddingDate: '2026-09-15',
    weddingTime: '16:00',
    venueName: 'The Grand Garden Estate',
    venueAddress: '123 Rose Garden Lane, Beverly Hills, CA 90210',
    message:
      'We invite you to share in our joy as we begin our journey together as one.',
    ceremonyTime: '4:00 PM',
    receptionTime: '6:00 PM',
    dressCode: 'Semi-Formal',
    rsvpDeadline: '2026-08-15',
    coupleEmail: '',
    loveStory:
      'We met on a sunny afternoon at a coffee shop, and from that first conversation, we knew something magical had begun.',
  },
};

function invitationReducer(state, action) {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_TEMPLATE': {
      const template = TEMPLATES.find((t) => t.id === action.payload);
      if (!template) return state;
      // Find matching font pairing for the template defaults
      const matchingFont = FONT_PAIRINGS.find(
        (f) => f.heading.family === template.defaults.fonts.heading
      );
      return {
        ...state,
        template: template.id,
        fontPairing: matchingFont ? matchingFont.id : state.fontPairing,
        fonts: { ...template.defaults.fonts },
        colors: { ...template.defaults.colors },
      };
    }
    case 'SET_FONT_PAIRING': {
      const pairing = FONT_PAIRINGS.find((f) => f.id === action.payload);
      if (!pairing) return state;
      return {
        ...state,
        fontPairing: pairing.id,
        fonts: {
          heading: pairing.heading.family,
          body: pairing.body.family,
        },
      };
    }
    case 'SET_COLORS':
      return {
        ...state,
        colors: { ...state.colors, ...action.payload },
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: { ...state.content, ...action.payload },
      };
    case 'LOAD_STATE':
      return { ...action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function InvitationProvider({ children }) {
  const [state, dispatch] = useReducer(invitationReducer, initialState);

  // Load Google Fonts when font pairing changes
  useEffect(() => {
    const pairing = FONT_PAIRINGS.find((f) => f.id === state.fontPairing);
    if (pairing) {
      loadGoogleFonts([pairing.heading.google, pairing.body.google]);
    }
  }, [state.fontPairing]);

  // Update CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', state.colors.primary);
    root.style.setProperty('--color-secondary', state.colors.secondary);
    root.style.setProperty('--color-accent', state.colors.accent);
    root.style.setProperty('--color-text', state.colors.text);
    root.style.setProperty('--color-background', state.colors.background);
    root.style.setProperty('--font-heading', state.fonts.heading);
    root.style.setProperty('--font-body', state.fonts.body);
  }, [state.colors, state.fonts]);

  return (
    <InvitationContext.Provider value={{ state, dispatch }}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
}

export default InvitationContext;
