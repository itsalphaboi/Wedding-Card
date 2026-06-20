import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../common/ScrollReveal/ScrollReveal';
import CountdownTimer from '../../common/CountdownTimer/CountdownTimer';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import styles from './ModernMinimalist.module.css';

/* ═══════════════════════════════════════════════════════════
   Modern Minimalist Template
   Clean lines, geometric accents, bold elegance
   ═══════════════════════════════════════════════════════════ */

// ─── Geometric Decorations ───────────────────────────────

/** Animated geometric line that draws itself on scroll */
function GeoLine({ x1, y1, x2, y2, color, delay = 0 }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.2 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
    />
  );
}

/** Animated circle that draws on scroll */
function GeoCircle({ cx, cy, r, color, delay = 0 }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      stroke={color}
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.15 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
    />
  );
}

/** Gold confetti dots for success animation */
function ConfettiDots({ color }) {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.cos((i / 20) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 20) * Math.PI * 2) * (60 + Math.random() * 40),
    size: 3 + Math.random() * 5,
    delay: Math.random() * 0.3,
  }));

  return (
    <div className={styles.confettiContainer}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={styles.confettiDot}
          style={{ width: dot.size, height: dot.size, background: color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: dot.x,
            y: dot.y,
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 1,
            delay: dot.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Template ───────────────────────────────────────

export default function ModernMinimalist({ content, colors, fonts }) {
  const {
    brideName = 'Bride',
    groomName = 'Groom',
    weddingDate = '2026-12-31',
    weddingTime = '16:00',
    ceremonyTime = '4:00 PM',
    receptionTime = '6:00 PM',
    dressCode = 'Black Tie',
    venueName = 'The Grand Hall',
    venueAddress = '123 Elegant Street, Metro City',
    message = 'Together with their families, request the pleasure of your company.',
    rsvpDeadline = '',
  } = content || {};

  const {
    primary = '#2D2D2D',
    secondary = '#C9A84C',
    accent = '#C9A84C',
    text = '#1A1A1A',
    background = '#FAF9F6',
  } = colors || {};

  const {
    heading = "'Playfair Display', serif",
    body = "'Inter', sans-serif",
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

  // Monogram: first letters of both names
  const monogram = `${groomName.charAt(0)}${brideName.charAt(0)}`.toUpperCase();
  const formattedDate = formatWeddingDate(weddingDate);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;

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

  return (
    <div className={styles.template} style={cssVars}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        {/* Background geometric accents */}
        <svg
          className={styles.geoLine}
          style={{ top: '10%', left: '5%', width: 200, height: 200 }}
          viewBox="0 0 200 200"
        >
          <GeoLine x1="0" y1="100" x2="200" y2="100" color={accent} />
          <GeoLine x1="100" y1="0" x2="100" y2="200" color={accent} delay={0.3} />
          <GeoCircle cx="100" cy="100" r="80" color={accent} delay={0.5} />
        </svg>

        <svg
          className={styles.geoLine}
          style={{ bottom: '10%', right: '5%', width: 150, height: 150 }}
          viewBox="0 0 150 150"
        >
          <GeoCircle cx="75" cy="75" r="60" color={accent} delay={0.2} />
          <GeoLine x1="0" y1="75" x2="150" y2="75" color={accent} delay={0.6} />
        </svg>

        {/* Monogram with animated geometric border */}
        <motion.div
          className={styles.monogramFrame}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg className={styles.monogramBorder} viewBox="0 0 240 240">
            <motion.rect
              x="10" y="10" width="220" height="220"
              rx="4"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
            />
            <motion.rect
              x="20" y="20" width="200" height="200"
              rx="2"
              fill="none"
              stroke={accent}
              strokeWidth="0.5"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.6 }}
            />
          </svg>
          <span className={styles.monogramText}>{monogram}</span>
        </motion.div>

        <motion.h1
          className={styles.heroNames}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {groomName}
          <span className={styles.heroAmpersand}>&amp;</span>
          {brideName}
        </motion.h1>

        <motion.p
          className={styles.heroDate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {formattedDate}
        </motion.p>

        <motion.div
          className={styles.heroLine}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </section>

      {/* ═══ COUNTDOWN ═══ */}
      <section className={styles.countdownSection}>
        <ScrollReveal>
          <CountdownTimer
            weddingDate={weddingDate}
            weddingTime={weddingTime}
            label="Counting Down To Our Forever"
          />
        </ScrollReveal>
      </section>

      {/* ═══ EVENT DETAILS ═══ */}
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>The Details</h2>
          <p className={styles.sectionSubtitle}>Join us as we celebrate</p>
          <hr className={styles.goldLine} />
        </ScrollReveal>

        <div className={styles.detailsGrid}>
          <ScrollReveal direction="left" delay={0}>
            <div className={styles.detailCard}>
              <p className={styles.detailLabel}>Ceremony</p>
              <h3>{ceremonyTime}</h3>
              <p>{venueName}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className={styles.detailCard}>
              <p className={styles.detailLabel}>Reception</p>
              <h3>{receptionTime}</h3>
              <p>Dinner &amp; Celebration</p>
            </div>
          </ScrollReveal>

          {dressCode && (
            <ScrollReveal direction="up" delay={0.3} className={styles.dressCode}>
              <div className={styles.detailCard}>
                <p className={styles.detailLabel}>Attire</p>
                <h3>{dressCode}</h3>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ═══ VENUE ═══ */}
      <section className={`${styles.section} ${styles.venueSection}`}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>The Venue</h2>
          <hr className={styles.goldLine} />
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
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Respond</h2>
          <p className={styles.sectionSubtitle}>
            {rsvpDeadline ? `Kindly reply by ${rsvpDeadline}` : 'We hope you can make it'}
          </p>
          <hr className={styles.goldLine} />
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <ScrollReveal key="form" delay={0.1}>
              <form className={styles.rsvpForm} onSubmit={handleRsvpSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="mm-name">Full Name</label>
                  <input
                    id="mm-name"
                    type="text"
                    placeholder=""
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Attendance</label>
                  <div className={styles.attendingButtons}>
                    {['Accept', 'Decline', 'Maybe'].map((option) => (
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
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mm-guests">Guests</label>
                  <select
                    id="mm-guests"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mm-dietary">Dietary Requirements</label>
                  <textarea
                    id="mm-dietary"
                    value={rsvp.dietary}
                    onChange={(e) => setRsvp({ ...rsvp, dietary: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mm-message">Message</label>
                  <textarea
                    id="mm-message"
                    value={rsvp.message}
                    onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit RSVP
                </motion.button>
              </form>
            </ScrollReveal>
          ) : (
            <motion.div
              key="success"
              className={styles.successMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ConfettiDots color={accent} />
              <h3>Response Received</h3>
              <p>Thank you for letting us know.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={styles.footer}>
        <ScrollReveal>
          <p className={styles.footerNames}>
            {groomName} &amp; {brideName}
          </p>
          <p className={styles.footerText}>{formattedDate}</p>
          {message && <p className={styles.footerText}>{message}</p>}
        </ScrollReveal>
      </footer>
    </div>
  );
}
