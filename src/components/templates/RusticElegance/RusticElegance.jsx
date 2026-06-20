import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../common/ScrollReveal/ScrollReveal';
import CountdownTimer from '../../common/CountdownTimer/CountdownTimer';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import styles from './RusticElegance.module.css';

/* ═══════════════════════════════════════════════════════════
   Rustic Elegance Template
   Botanical illustrations, warm earth tones, kraft paper charm
   ═══════════════════════════════════════════════════════════ */

// ─── Inline SVG Decorations ──────────────────────────────

/** Wreath frame made of leaves and branches, drawn via pathLength */
function WreathSVG({ color, accentColor }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Main wreath circle — branches */}
      <motion.path
        d="M200 30
           C280 30 370 100 370 200
           C370 300 280 370 200 370
           C120 370 30 300 30 200
           C30 100 120 30 200 30Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* Leaf pairs along the wreath */}
      {[
        { cx: 85, cy: 100, r: -30 },
        { cx: 60, cy: 180, r: -10 },
        { cx: 85, cy: 270, r: 20 },
        { cx: 140, cy: 340, r: 45 },
        { cx: 260, cy: 340, r: 135 },
        { cx: 315, cy: 270, r: 160 },
        { cx: 340, cy: 180, r: 190 },
        { cx: 315, cy: 100, r: 210 },
        { cx: 260, cy: 50, r: 240 },
        { cx: 140, cy: 50, r: -60 },
      ].map((leaf, i) => (
        <motion.g
          key={i}
          transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.r})`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
        >
          {/* Left leaf */}
          <path
            d="M0 0C-5 -12 -2 -22 0 -26C2 -22 5 -12 0 0Z"
            fill={color}
          />
          {/* Right leaf */}
          <path
            d="M0 0C8 -10 15 -14 18 -12C14 -8 8 -5 0 0Z"
            fill={color}
          />
          {/* Small berry */}
          <circle cx="2" cy="-4" r="2" fill={accentColor} opacity="0.5" />
        </motion.g>
      ))}

      {/* Extra tiny berries scattered */}
      {[
        [110, 65], [290, 65], [350, 150], [350, 250],
        [290, 345], [110, 345], [50, 250], [50, 150],
      ].map(([bx, by], i) => (
        <motion.circle
          key={`berry-${i}`}
          cx={bx} cy={by} r="3"
          fill={accentColor}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
        />
      ))}
    </svg>
  );
}

/** Botanical leaf SVG for story accents */
function LeafSprig({ className, color }) {
  return (
    <svg className={className} width="60" height="120" viewBox="0 0 60 120" fill="none">
      {/* Main stem */}
      <motion.path
        d="M30 110 C30 80 30 40 30 10"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {/* Leaf pairs */}
      {[20, 40, 60, 80].map((y, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <ellipse cx={20} cy={y} rx="10" ry="5"
            transform={`rotate(-30 20 ${y})`} fill={color} />
          <ellipse cx={40} cy={y} rx="10" ry="5"
            transform={`rotate(30 40 ${y})`} fill={color} />
        </motion.g>
      ))}
    </svg>
  );
}

/** Vine growth animation for RSVP success */
function VineGrowth({ color }) {
  return (
    <svg className={styles.vineContainer} viewBox="0 0 200 80" fill="none"
      style={{ width: 200, height: 80, display: 'block', margin: '1rem auto' }}>
      <motion.path
        d="M10 40 C40 20 60 60 100 40 C140 20 160 60 190 40"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Leaves along the vine */}
      {[30, 70, 110, 150].map((x, i) => (
        <motion.ellipse
          key={i}
          cx={x} cy={i % 2 === 0 ? 30 : 50} rx="8" ry="4"
          transform={`rotate(${i % 2 === 0 ? -20 : 20} ${x} ${i % 2 === 0 ? 30 : 50})`}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

/** Botanical border for thank-you section */
function BotanicalBorder({ color, accentColor }) {
  return (
    <svg className={styles.botanicalBorder} width="260" height="40" viewBox="0 0 260 40" fill="none">
      <motion.path
        d="M10 20 L250 20"
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      {/* Leaf clusters */}
      {[50, 130, 210].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.2 }}
        >
          <ellipse cx={x} cy={12} rx="8" ry="4" transform={`rotate(-25 ${x} 12)`} fill={color} />
          <ellipse cx={x} cy={28} rx="8" ry="4" transform={`rotate(25 ${x} 28)`} fill={color} />
          <circle cx={x} cy={20} r="2.5" fill={accentColor} />
        </motion.g>
      ))}
    </svg>
  );
}

// ─── Main Template ───────────────────────────────────────

export default function RusticElegance({ content, colors, fonts }) {
  const {
    brideName = 'Bride',
    groomName = 'Groom',
    weddingDate = '2026-12-31',
    weddingTime = '16:00',
    ceremonyTime = '4:00 PM',
    receptionTime = '6:00 PM',
    dressCode = 'Garden Formal',
    venueName = 'The Enchanted Garden',
    venueAddress = '456 Rustic Lane, Country Town',
    loveStory = '',
    message = 'With grateful hearts, we thank you for being part of our story.',
    rsvpDeadline = '',
  } = content || {};

  const {
    primary = '#722F37',
    secondary = '#228B22',
    accent = '#D4AF37',
    text = '#2C1810',
    background = '#FFFDD0',
  } = colors || {};

  const {
    heading = "'Amatic SC', cursive",
    body = "'Lora', serif",
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

  const formattedDate = formatWeddingDate(weddingDate);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;

  const storyParagraphs = loveStory
    ? loveStory.split('\n').filter((p) => p.trim())
    : [
        'Some love stories are written in the stars. Ours began with a simple hello and blossomed into something extraordinary.',
        'Through every season — sunny days and quiet evenings — we discovered a love that feels like coming home.',
        'Now, surrounded by nature\'s beauty, we invite you to witness the beginning of our forever.',
      ];

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
        <div className={styles.wreathContainer}>
          <div className={styles.wreathSvg}>
            <WreathSVG color={secondary} accentColor={accent} />
          </div>
          <div className={styles.wreathInner}>
            <h1 className={styles.heroNames}>
              {groomName}
              <span className={styles.heroAmpersand}>&amp;</span>
              {brideName}
            </h1>
          </div>
        </div>

        <motion.p
          className={styles.heroDate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {formattedDate}
        </motion.p>

        <motion.p
          className={styles.heroTagline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          You are cordially invited ✦
        </motion.p>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.botanicalDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLeaf}>🌿</span>
            <span className={styles.dividerLine} />
          </div>
        </ScrollReveal>

        <div className={styles.storyContent}>
          {/* Decorative leaf sprigs */}
          <LeafSprig
            className={`${styles.leafAccent} ${styles.leafLeft}`}
            color={secondary}
          />
          <LeafSprig
            className={`${styles.leafAccent} ${styles.leafRight}`}
            color={secondary}
          />

          {storyParagraphs.map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <p className={styles.storyParagraph}>{para}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ CEREMONY & RECEPTION ═══ */}
      <section className={styles.section}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Ceremony &amp; Reception</h2>
          <div className={styles.botanicalDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLeaf}>🍃</span>
            <span className={styles.dividerLine} />
          </div>
        </ScrollReveal>

        <div className={styles.cardsRow}>
          <ScrollReveal direction="left" delay={0}>
            <motion.div
              className={styles.eventCard}
              whileInView={{ rotateY: [5, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.eventIcon}>🕊️</span>
              <h3>The Ceremony</h3>
              <p>{ceremonyTime}</p>
              <p>{venueName}</p>
              <p style={{ fontStyle: 'italic', marginTop: '0.5rem', opacity: 0.7 }}>
                Please be seated 15 minutes early
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <motion.div
              className={styles.eventCard}
              whileInView={{ rotateY: [-5, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.eventIcon}>🍷</span>
              <h3>The Reception</h3>
              <p>{receptionTime}</p>
              <p>Dinner, toasts &amp; dancing</p>
              {dressCode && (
                <p style={{ marginTop: '0.5rem' }}>
                  Attire: {dressCode}
                </p>
              )}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ VENUE ═══ */}
      <section className={`${styles.section} ${styles.venueSection}`}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>The Venue</h2>
          <div className={styles.botanicalDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLeaf}>🌿</span>
            <span className={styles.dividerLine} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className={styles.venueName}>{venueName}</p>
          <p className={styles.venueAddress}>{venueAddress}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.mapFrame}>
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
          <h2 className={styles.sectionTitle}>RSVP</h2>
          <div className={styles.botanicalDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLeaf}>🌱</span>
            <span className={styles.dividerLine} />
          </div>
          {rsvpDeadline && (
            <p style={{ textAlign: 'center', marginBottom: '2rem', fontStyle: 'italic', opacity: 0.8 }}>
              Please respond by {rsvpDeadline}
            </p>
          )}
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <ScrollReveal key="form" delay={0.1}>
              <form className={styles.rsvpForm} onSubmit={handleRsvpSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="re-name">Your Name</label>
                  <input
                    id="re-name"
                    type="text"
                    placeholder="Your full name"
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Will You Join Us?</label>
                  <div className={styles.attendingButtons}>
                    {['Gladly Accept', 'With Regrets', 'Perhaps'].map(
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
                  <label htmlFor="re-guests">Number of Guests</label>
                  <select
                    id="re-guests"
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
                  <label htmlFor="re-dietary">Dietary Needs</label>
                  <textarea
                    id="re-dietary"
                    placeholder="Any food allergies or preferences…"
                    value={rsvp.dietary}
                    onChange={(e) => setRsvp({ ...rsvp, dietary: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="re-message">A Note for the Couple</label>
                  <textarea
                    id="re-message"
                    placeholder="Your warm wishes…"
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
                  Send Reply 🌿
                </motion.button>
              </form>
            </ScrollReveal>
          ) : (
            <motion.div
              key="success"
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <VineGrowth color={secondary} />
              <h3>Thank You!</h3>
              <p>Your response has been lovingly received.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ═══ THANK YOU ═══ */}
      <section className={styles.thankYouSection}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>Thank You</h2>
          <div className={styles.botanicalDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLeaf}>🌸</span>
            <span className={styles.dividerLine} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className={styles.thankYouMessage}>{message}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className={styles.thankYouNames}>
            {groomName} &amp; {brideName}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <BotanicalBorder color={secondary} accentColor={accent} />
        </ScrollReveal>
      </section>
    </div>
  );
}
