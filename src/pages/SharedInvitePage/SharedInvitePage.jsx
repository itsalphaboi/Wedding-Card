import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { decodeInvitation } from '../../utils/shareLink';
import { loadGoogleFonts, FONT_PAIRINGS } from '../../data/fonts';
import { supabase } from '../../lib/supabase';
import EnvelopeOpener from '../../components/common/EnvelopeOpener/EnvelopeOpener';
import RomanticFloral from '../../components/templates/RomanticFloral/RomanticFloral';
import ModernMinimalist from '../../components/templates/ModernMinimalist/ModernMinimalist';
import RusticElegance from '../../components/templates/RusticElegance/RusticElegance';
import CelestialDreamscape from '../../components/templates/CelestialDreamscape/CelestialDreamscape';
import ArtDecoGlamour from '../../components/templates/ArtDecoGlamour/ArtDecoGlamour';
import styles from './SharedInvitePage.module.css';

const templateComponents = {
  'romantic-floral': RomanticFloral,
  'modern-minimalist': ModernMinimalist,
  'rustic-elegance': RusticElegance,
  'celestial-dreamscape': CelestialDreamscape,
  'art-deco-glamour': ArtDecoGlamour,
};

// Simple UUID regex check
const isUUID = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

function SharedInvitePage() {
  const { encodedData } = useParams();
  const [inviteState, setInviteState] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvitation = async () => {
      if (!encodedData) {
        setError(true);
        setLoading(false);
        return;
      }

      let decoded = null;

      if (isUUID(encodedData)) {
        // Fetch from Supabase by ID
        try {
          const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('id', encodedData)
            .single();

          if (error) throw error;
          
          if (data) {
            decoded = {
              id: data.id,
              title: data.title,
              template: data.template,
              fontPairing: data.font_pairing,
              fonts: data.fonts,
              colors: data.colors,
              content: data.content
            };
          }
        } catch (err) {
          console.error('Error fetching invitation:', err);
        }
      } else {
        // Fallback: decode base64 URL data
        decoded = decodeInvitation(encodedData);
      }

      if (decoded && decoded.template && decoded.content) {
        setInviteState(decoded);

        // Load the correct fonts
        if (decoded.fontPairing) {
          const pairing = FONT_PAIRINGS.find((f) => f.id === decoded.fontPairing);
          if (pairing) {
            loadGoogleFonts([pairing.heading.google, pairing.body.google]);
          }
        }

        // Set CSS variables
        if (decoded.colors) {
          const root = document.documentElement;
          root.style.setProperty('--color-primary', decoded.colors.primary);
          root.style.setProperty('--color-secondary', decoded.colors.secondary);
          root.style.setProperty('--color-accent', decoded.colors.accent);
          root.style.setProperty('--color-text', decoded.colors.text);
          root.style.setProperty('--color-background', decoded.colors.background);
        }
        if (decoded.fonts) {
          const root = document.documentElement;
          root.style.setProperty('--font-heading', decoded.fonts.heading);
          root.style.setProperty('--font-body', decoded.fonts.body);
        }
      } else {
        setError(true);
      }
      
      setLoading(false);
    };

    loadInvitation();
  }, [encodedData]);

  if (loading) {
    return (
      <div className={styles.shared} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#666' }}>
        Opening invitation...
      </div>
    );
  }

  if (error || !inviteState) {
    return (
      <div className={styles.error}>
        <div className={styles.errorEmoji}>💌</div>
        <h1 className={styles.errorTitle}>Invitation Not Found</h1>
        <p className={styles.errorText}>
          This invitation link may be invalid or expired. Please check the URL and try again.
        </p>
        <Link to="/" className={styles.errorLink}>
          Create Your Own Invitation
        </Link>
      </div>
    );
  }

  const TemplateComponent = templateComponents[inviteState.template];

  if (!TemplateComponent) {
    return (
      <div className={styles.error}>
        <div className={styles.errorEmoji}>🎨</div>
        <h1 className={styles.errorTitle}>Template Not Found</h1>
        <p className={styles.errorText}>
          The template used for this invitation is not available.
        </p>
        <Link to="/" className={styles.errorLink}>
          Create Your Own Invitation
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.shared}>
      <EnvelopeOpener content={inviteState.content} colors={inviteState.colors} fonts={inviteState.fonts}>
        <TemplateComponent
          content={inviteState.content}
          colors={inviteState.colors}
          fonts={inviteState.fonts}
        />
      </EnvelopeOpener>
    </div>
  );
}

export default SharedInvitePage;
