import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Copy, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useInvitation } from '../../context/InvitationContext';
import { copyToClipboard } from '../../utils/shareLink';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = useInvitation();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchInvitations = async () => {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setInvitations(data || []);
      } catch (err) {
        console.error('Error fetching invitations:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleEdit = (invitation) => {
    // Load the invitation data into the global context so the builder can edit it
    dispatch({ type: 'SET_ID', payload: invitation.id });
    dispatch({ type: 'SET_TITLE', payload: invitation.title });
    dispatch({ type: 'SET_TEMPLATE', payload: invitation.template });
    dispatch({ type: 'SET_FONT_PAIRING', payload: invitation.font_pairing });
    dispatch({ type: 'SET_FONTS', payload: invitation.fonts });
    dispatch({ type: 'SET_COLORS', payload: invitation.colors });
    dispatch({ type: 'SET_CONTENT', payload: invitation.content });
    // Navigate to builder
    navigate('/builder');
  };

  const handleCopyLink = async (id) => {
    // Generate a clean URL using the database ID
    const url = `${window.location.origin}/#/invite/${id}`;
    await copyToClipboard(url);
    alert('Link copied to clipboard!');
  };

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span>💍</span> WCard
        </Link>
        <div className={styles.nav}>
          <span className={styles.userEmail}>{user.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>My Invitations</h1>
          <Link to="/builder" className={styles.createBtn}>
            <Plus size={18} /> Create New
          </Link>
        </div>

        {loading ? (
          <div>Loading your designs...</div>
        ) : invitations.length > 0 ? (
          <div className={styles.grid}>
            {invitations.map((inv) => (
              <div key={inv.id} className={styles.card}>
                <div className={styles.cardTitle}>{inv.title || 'Untitled Invitation'}</div>
                <div className={styles.cardMeta}>
                  <span>Template: {inv.template}</span>
                  <span>{new Date(inv.updated_at).toLocaleDateString()}</span>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.actionBtn} onClick={() => handleEdit(inv)}>
                    <Pencil size={16} /> Edit
                  </button>
                  <button className={styles.actionBtn} onClick={() => handleCopyLink(inv.id)}>
                    <Copy size={16} /> Link
                  </button>
                  <Link to={`/invite/${inv.id}`} className={`${styles.actionBtn} ${styles.primary}`}>
                    <Eye size={16} /> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No invitations yet</h3>
            <p>Start designing your perfect wedding invitation.</p>
            <Link to="/builder" className={styles.createBtn} style={{ display: 'inline-flex' }}>
              <Plus size={18} /> Create First Invitation
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
