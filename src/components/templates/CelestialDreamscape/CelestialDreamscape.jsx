import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import ScrollReveal from '../../common/ScrollReveal/ScrollReveal';
import styles from './CelestialDreamscape.module.css';

const Starfield = () => {
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className={styles.starfield}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={styles.star}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const ConstellationSVG = () => (
  <svg className={styles.constellation} viewBox="0 0 100 100" preserveAspectRatio="none">
    <motion.path
      d="M10,20 L30,40 L60,30 L80,70 L40,80 L20,60"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="0.2"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
    {[
      [10, 20], [30, 40], [60, 30], [80, 70], [40, 80], [20, 60]
    ].map(([cx, cy], i) => (
      <motion.circle
        key={i}
        cx={cx}
        cy={cy}
        r="0.8"
        fill="var(--color-accent)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ delay: i * 0.3 + 1, duration: 0.5 }}
      />
    ))}
  </svg>
);

function CelestialDreamscape({ content, colors, fonts }) {
  const [rsvpStatus, setRsvpStatus] = useState('idle');

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpStatus('submitted');
  };

  return (
    <div
      className={styles.template}
      style={{
        '--color-primary': colors.primary,
        '--color-secondary': colors.secondary,
        '--color-accent': colors.accent,
        '--color-text': colors.text,
        '--color-background': colors.background,
        '--font-heading': fonts.heading,
        '--font-body': fonts.body,
      }}
    >
      <Starfield />

      <div className={styles.content}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.svg
            className={styles.moon}
            viewBox="0 0 100 100"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <path d="M50,10 A40,40 0 1,1 10,50 A30,30 0 1,0 50,10" />
          </motion.svg>
          <motion.h1
            className={styles.names}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {content.brideName} <span className={styles.ampersand}>&</span> {content.groomName}
          </motion.h1>
          <motion.div
            className={styles.date}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {formatWeddingDate(content.weddingDate)}
          </motion.div>
        </section>

        {/* Written in the Stars (Love Story) */}
        {content.loveStory && (
          <section className={styles.storySection}>
            <ConstellationSVG />
            <ScrollReveal direction="up" amount={0.3}>
              <h2 className={styles.sectionTitle}>Written in the Stars</h2>
              <p className={styles.storyText}>{content.loveStory}</p>
            </ScrollReveal>
          </section>
        )}

        {/* Event Details */}
        <section className={styles.detailsSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>The Celebration</h2>
          </ScrollReveal>
          <div className={styles.detailsGrid}>
            <ScrollReveal direction="left" delay={0.2}>
              <div className={styles.detailCard}>
                <h3 className={styles.cardTitle}>Ceremony</h3>
                <p className={styles.cardText}>{content.ceremonyTime}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <div className={styles.detailCard}>
                <h3 className={styles.cardTitle}>Reception</h3>
                <p className={styles.cardText}>{content.receptionTime}</p>
              </div>
            </ScrollReveal>
            {content.dressCode && (
              <ScrollReveal direction="right" delay={0.6}>
                <div className={styles.detailCard}>
                  <h3 className={styles.cardTitle}>Dress Code</h3>
                  <p className={styles.cardText}>{content.dressCode}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Venue */}
        <section className={styles.venueSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>Venue</h2>
            <h3 className={styles.venueName}>{content.venueName}</h3>
            <p className={styles.venueAddress}>{content.venueAddress}</p>
            <div className={styles.mapContainer}>
              <iframe
                title="Wedding Venue Map"
                className={styles.map}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(content.venueAddress)}&output=embed`}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </section>

        {/* RSVP */}
        <section className={styles.rsvpSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>RSVP</h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              Kindly reply by {formatWeddingDate(content.rsvpDeadline)}
            </p>

            {rsvpStatus === 'idle' ? (
              <form className={styles.form} onSubmit={handleRsvpSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name(s)</label>
                  <input type="text" className={styles.input} required placeholder="Jane & John Doe" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Will you be joining us?</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="attending" value="yes" required />
                      Joyfully Accept
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="attending" value="no" />
                      Regretfully Decline
                    </label>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Dietary Restrictions</label>
                  <input type="text" className={styles.input} placeholder="e.g. Vegetarian, Nut Allergy" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Message for the couple</label>
                  <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Can't wait to celebrate!" />
                </div>
                <button type="submit" className={styles.submitBtn}>Send RSVP</button>
              </form>
            ) : (
              <motion.div
                className={styles.successMessage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                <div className={styles.successIcon}>✨</div>
                <h3 className={styles.cardTitle}>Thank You!</h3>
                <p>Your RSVP has been received.</p>
              </motion.div>
            )}
          </ScrollReveal>
        </section>

        {/* Closing */}
        <section className={styles.closingSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.closingText}>To the Moon & Back</h2>
            {content.message && <p className={styles.storyText}>{content.message}</p>}
          </ScrollReveal>
          
          <motion.div 
            className={styles.shootingStar}
            style={{ top: '20%', right: '-10%' }}
            animate={{
              x: ['0vw', '-120vw'],
              y: ['0vh', '120vh'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "linear"
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default CelestialDreamscape;
