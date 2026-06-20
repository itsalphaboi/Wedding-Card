import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../common/ScrollReveal/ScrollReveal';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import styles from './RomanticFloral.module.css';

/* ═══════════════════════════════════════════════════════════
   Romantic Floral Template
   Soft petals, flowing script, watercolor-inspired romance
   ═══════════════════════════════════════════════════════════ */

// ─── Inline SVG Decorations ──────────────────────────────

/** A single rose petal shape */
function PetalSVG({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none">
      <path
        d="M20 0C20 0 0 15 0 32C0 42.5 8.95 52 20 52C31.05 52 40 42.5 40 32C40 15 20 0 20 0Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M20 8C20 8 10 20 10 32C10 38 14.5 44 20 44"
        stroke="white"
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}

/** Flower corner ornament */
function CornerOrnament({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none">
      {/* Main branch */}
      <path
        d="M10 150C30 120 50 100 80 80C100 65 130 55 150 10"
        stroke="var(--color-accent, #d4af37)"
        strokeWidth="1.5"
        opacity="0.5"
        fill="none"
      />
      {/* Leaves along the branch */}
      <path
        d="M40 115C35 105 45 95 55 100C45 95 50 85 60 90"
        stroke="var(--color-secondary, #b2ac88)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
      />
      <path
        d="M70 85C65 75 75 65 85 70C75 65 80 55 90 60"
        stroke="var(--color-secondary, #b2ac88)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
      />
      {/* Small flower */}
      <circle cx="95" cy="45" r="6" fill="var(--color-primary, #f4c2c2)" opacity="0.4" />
      <circle cx="95" cy="45" r="3" fill="var(--color-accent, #d4af37)" opacity="0.5" />
      {/* Leaf shapes */}
      <ellipse cx="50" cy="108" rx="8" ry="4" transform="rotate(-30 50 108)"
        fill="var(--color-secondary, #b2ac88)" opacity="0.3" />
      <ellipse cx="78" cy="78" rx="8" ry="4" transform="rotate(-40 78 78)"
        fill="var(--color-secondary, #b2ac88)" opacity="0.3" />
      {/* Small berries */}
      <circle cx="35" cy="125" r="2.5" fill="var(--color-primary, #f4c2c2)" opacity="0.5" />
      <circle cx="110" cy="35" r="2" fill="var(--color-primary, #f4c2c2)" opacity="0.4" />
    </svg>
  );
}

// ─── Floating Petals Layer ───────────────────────────────

const petalPositions = [
  { top: '8%', left: '5%', size: 28, delay: 0, duration: 6 },
  { top: '15%', right: '8%', size: 35, delay: 1, duration: 7 },
  { top: '25%', left: '12%', size: 22, delay: 2, duration: 5.5 },
  { top: '40%', right: '15%', size: 30, delay: 0.5, duration: 8 },
  { top: '55%', left: '8%', size: 25, delay: 1.5, duration: 6.5 },
  { top: '70%', right: '6%', size: 32, delay: 3, duration: 7.5 },
  { top: '80%', left: '18%', size: 20, delay: 2.5, duration: 5 },
  { top: '90%', right: '12%', size: 26, delay: 0.8, duration: 6.8 },
];

function FloatingPetals({ primaryColor }) {
  return (
    <>
      {petalPositions.map((p, i) => (
        <motion.div
          key={i}
          className={styles.petal}
          style={{ top: p.top, left: p.left, right: p.right }}
          animate={{
            y: [0, -15, 5, -10, 0],
            x: [0, 8, -5, 10, 0],
            rotate: [0, 15, -10, 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <PetalSVG size={p.size} color={primaryColor} />
        </motion.div>
      ))}
    </>
  );
}

// ─── Main Template ───────────────────────────────────────

export default function RomanticFloral({ content, colors, fonts }) {
  const {
    brideName = 'Bride',
    groomName = 'Groom',
    weddingDate = '2026-12-31',
    ceremonyTime = '4:00 PM',
    receptionTime = '6:00 PM',
    dressCode = 'Formal Attire',
    venueName = 'The Grand Ballroom',
    venueAddress = '123 Love Lane, Romance City',
    loveStory = '',
    message = 'We can\'t wait to celebrate with you!',
    rsvpDeadline = '',
  } = content || {};

  const {
    primary = '#F4C2C2',
    secondary = '#B2AC88',
    accent = '#D4AF37',
    text = '#3C2415',
    background = '#FFFEF9',
  } = colors || {};

  const {
    heading = "'Great Vibes', cursive",
    body = "'Cormorant Garamond', serif",
  } = fonts || {};

  const cssVars = {
    '--color-primary': primary,
    '--color-secondary': secondary,
    '--color-accent': accent,
    '--color-text': text,
    '--color-background': background,
    '--font-heading': heading,
    '--font-body': body,
  };

  // RSVP state
  const [rsvp, setRsvp] = useState({
    name: '',
    attending: '',
    guests: '1',
    dietary: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Split love story into paragraphs for timeline
  const storyParagraphs = loveStory
    ? loveStory.split('\n').filter((p) => p.trim())
    : [
        'From the moment we met, we knew something magical had begun.',
        'Through laughter and adventures, our love has blossomed into forever.',
        'And now, we invite you to celebrate the beginning of our greatest journey.',
      ];

  const formattedDate = formatWeddingDate(weddingDate);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;

  return (
    <div className={styles.template} style={cssVars}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <FloatingPetals primaryColor={primary} />
        <CornerOrnament className={`${styles.cornerOrnament} ${styles.cornerTopLeft}`} />
        <CornerOrnament className={`${styles.cornerOrnament} ${styles.cornerTopRight}`} />
        <CornerOrnament className={`${styles.cornerOrnament} ${styles.cornerBottomLeft}`} />
        <CornerOrnament className={`${styles.cornerOrnament} ${styles.cornerBottomRight}`} />

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className={styles.heroNames}>
            {groomName}
            <span className={styles.heroAmpersand}>&amp;</span>
            {brideName}
          </h1>
          <motion.p
            className={styles.heroDate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {formattedDate}
          </motion.p>
        </motion.div>

        <motion.p
          className={styles.heroScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Scroll to explore ↓
        </motion.p>
      </section>

      {/* ═══ LOVE STORY ═══ */}
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Our Love Story</h2>
          <hr className={styles.sectionDivider} />
        </ScrollReveal>

        <div className={styles.timeline}>
          {storyParagraphs.map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction="left">
              <div className={styles.timelineItem}>
                <p className={styles.timelineText}>{para}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ EVENT DETAILS ═══ */}
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Celebration Details</h2>
          <hr className={styles.sectionDivider} />
        </ScrollReveal>

        <div className={styles.detailsGrid}>
          <ScrollReveal direction="left" delay={0}>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>💒</span>
              <h3>Ceremony</h3>
              <p>{ceremonyTime}</p>
              <p>{venueName}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>🥂</span>
              <h3>Reception</h3>
              <p>{receptionTime}</p>
              <p>Dinner, dancing &amp; celebration</p>
            </div>
          </ScrollReveal>

          {dressCode && (
            <ScrollReveal direction="up" delay={0.3} className={styles.dressCode}>
              <div className={styles.detailCard}>
                <span className={styles.detailIcon}>👗</span>
                <h3>Dress Code</h3>
                <p>{dressCode}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ═══ VENUE ═══ */}
      <section className={`${styles.section} ${styles.venueSection}`}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>The Venue</h2>
          <hr className={styles.sectionDivider} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className={styles.venueName}>{venueName}</p>
          <p className={styles.venueAddress}>{venueAddress}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.mapContainer}>
            <iframe
              title="Wedding Venue"
              src={mapSrc}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ RSVP ═══ */}
      <section className={`${styles.section} ${styles.rsvpSection}`}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>RSVP</h2>
          <hr className={styles.sectionDivider} />
          {rsvpDeadline && (
            <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.7 }}>
              Kindly respond by {rsvpDeadline}
            </p>
          )}
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <ScrollReveal key="form" delay={0.1}>
              <form className={styles.rsvpForm} onSubmit={handleRsvpSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="rf-name">Your Name</label>
                  <input
                    id="rf-name"
                    type="text"
                    placeholder="Full name"
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Will You Attend?</label>
                  <div className={styles.attendingButtons}>
                    {['Joyfully Accept', 'Regretfully Decline', 'Maybe'].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          className={`${styles.attendingBtn} ${
                            rsvp.attending === option ? styles.attendingBtnActive : ''
                          }`}
                          onClick={() => setRsvp({ ...rsvp, attending: option })}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rf-guests">Number of Guests</label>
                  <select
                    id="rf-guests"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rf-dietary">Dietary Restrictions</label>
                  <textarea
                    id="rf-dietary"
                    placeholder="Any allergies or dietary needs…"
                    value={rsvp.dietary}
                    onChange={(e) => setRsvp({ ...rsvp, dietary: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rf-message">Message for the Couple</label>
                  <textarea
                    id="rf-message"
                    placeholder="Share your wishes…"
                    value={rsvp.message}
                    onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send with Love 💌
                </motion.button>
              </form>
            </ScrollReveal>
          ) : (
            <motion.div
              key="success"
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.span
                className={styles.heartBurst}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              >
                💕
              </motion.span>
              <h3>Thank You!</h3>
              <p>Your response has been received with love.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className={styles.closingSection}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>With Love</h2>
          <hr className={styles.sectionDivider} />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className={styles.closingMessage}>{message}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className={styles.closingHearts}>
            {['❤️', '🌸', '💐', '🌸', '❤️'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
