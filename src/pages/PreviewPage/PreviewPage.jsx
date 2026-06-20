import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Copy, Check, Pencil, Save } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { generateShareLink, copyToClipboard, shareInvitation } from '../../utils/shareLink';
import EnvelopeOpener from '../../components/common/EnvelopeOpener/EnvelopeOpener';
import RomanticFloral from '../../components/templates/RomanticFloral/RomanticFloral';
import ModernMinimalist from '../../components/templates/ModernMinimalist/ModernMinimalist';
import RusticElegance from '../../components/templates/RusticElegance/RusticElegance';
import CelestialDreamscape from '../../components/templates/CelestialDreamscape/CelestialDreamscape';
import ArtDecoGlamour from '../../components/templates/ArtDecoGlamour/ArtDecoGlamour';
import styles from './PreviewPage.module.css';

const templateComponents = {
  'romantic-floral': RomanticFloral,
  'modern-minimalist': ModernMinimalist,
  'rustic-elegance': RusticElegance,
  'celestial-dreamscape': CelestialDreamscape,
  'art-deco-glamour': ArtDecoGlamour,
};

function PreviewPage() {
  const { state, dispatch } = useInvitation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const TemplateComponent = templateComponents[state.template];

  const handleCopyLink = async () => {
    // If the invitation has an ID (is saved to Supabase), share the short link
    if (state.id) {
      const url = `${window.location.origin}/#/invite/${state.id}`;
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
      return;
    }
    
    // Otherwise fallback to base64 long link
    const link = generateShareLink(state);
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (state.id) {
      const url = `${window.location.origin}/#/invite/${state.id}`;
      if (navigator.share) {
        try {
          await navigator.share({
            title: state.title || 'Wedding Invitation',
            text: `You're invited to the wedding of ${state.content.brideName} and ${state.content.groomName}!`,
            url: url,
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      } else {
        handleCopyLink();
      }
      return;
    }
    
    await shareInvitation(state);
  };

  const handleSave = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setSaving(true);
    try {
      const invitationData = {
        user_id: user.id,
        title: state.title || `${state.content.brideName} & ${state.content.groomName}'s Wedding`,
        template: state.template,
        font_pairing: state.fontPairing,
        fonts: state.fonts,
        colors: state.colors,
        content: state.content,
        updated_at: new Date().toISOString(),
      };

      let response;
      if (state.id) {
        // Update existing
        response = await supabase
          .from('invitations')
          .update(invitationData)
          .eq('id', state.id)
          .select()
          .single();
      } else {
        // Insert new
        response = await supabase
          .from('invitations')
          .insert([invitationData])
          .select()
          .single();
      }

      if (response.error) throw response.error;
      
      // Update global context with new ID
      if (!state.id && response.data.id) {
        dispatch({ type: 'SET_ID', payload: response.data.id });
      }

      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err) {
      console.error('Error saving invitation:', err);
      alert('Failed to save invitation.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.preview}>
      {/* Toasts */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className={styles.copiedToast}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ zIndex: 1000 }}
          >
            <Check size={16} /> Link copied!
          </motion.div>
        )}
        {savedToast && (
          <motion.div
            className={styles.copiedToast}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ zIndex: 1000, top: copied ? '80px' : '40px' }}
          >
            <Check size={16} /> Saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template Render */}
      <div className={styles.templateContainer}>
        {TemplateComponent && (
          <EnvelopeOpener content={state.content} colors={state.colors} fonts={state.fonts}>
            <TemplateComponent
              content={state.content}
              colors={state.colors}
              fonts={state.fonts}
            />
          </EnvelopeOpener>
        )}
      </div>

      {/* Floating Toolbar */}
      <motion.div
        className={styles.toolbar}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/builder" className={`${styles.toolbarBtn} ${styles.toolbarBtnSecondary}`}>
          <Pencil size={14} /> Edit
        </Link>
        <button
          className={`${styles.toolbarBtn} ${styles.toolbarBtnSecondary}`}
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={14} /> {saving ? 'Saving...' : 'Save'}
        </button>
        <div className={styles.toolbarDivider} />
        <button
          className={`${styles.toolbarBtn} ${styles.toolbarBtnSecondary}`}
          onClick={handleCopyLink}
        >
          <Copy size={14} /> Link
        </button>
        <button
          className={`${styles.toolbarBtn} ${styles.toolbarBtnPrimary}`}
          onClick={handleShare}
        >
          <Share2 size={14} /> Share
        </button>
      </motion.div>
    </div>
  );
}

export default PreviewPage;
