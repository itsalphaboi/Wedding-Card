import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import ScrollReveal from '../../common/ScrollReveal/ScrollReveal';
import CountdownTimer from '../../common/CountdownTimer/CountdownTimer';
import styles from './ArtDecoGlamour.module.css';

const DecoLines = () => (
  <div className={styles.decoLines}>
    <div className={styles.line} />
    <div className={styles.diamond} />
    <div className={styles.line} />
  </div>
);

const FanDeco = () => (
  <svg className={styles.fanTop} viewBox="0 0 100 50">
    <motion.path
      d="M50,50 L10,10 A50,50 0 0,1 90,10 Z"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    <motion.path
      d="M50,50 L25,5 A55,55 0 0,1 75,5 Z"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
    />
    <motion.circle cx="50" cy="50" r="10" fill="var(--color-accent)" 
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 }}
    />
  </svg>
);

function ArtDecoGlamour({ content, colors, fonts }) {
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroFrame}>
          <div className={styles.heroFrameInner} />
        </div>
        <ScrollReveal direction="up" amount={0.1}>
          <div className={styles.heroContent}>
            <FanDeco />
            <h1 className={`${styles.heading} ${styles.names}`}>
              {content.brideName} <br />
              <span style={{ fontSize: '0.6em', color: 'var(--color-accent)' }}>&amp;</span> <br />
              {content.groomName}
            </h1>
            <DecoLines />
            <p className={`${styles.heading} ${styles.date}`}>
              {formatWeddingDate(content.weddingDate)}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* The Celebration (Countdown) */}
      <section className={styles.detailsSection} style={{ paddingBottom: '2rem' }}>
        <ScrollReveal direction="up">
          <h2 className={`${styles.heading} ${styles.sectionTitle}`}>The Celebration</h2>
          <CountdownTimer targetDate={content.weddingDate} targetTime={content.weddingTime || '00:00'} />
        </ScrollReveal>
      </section>

      {/* Event Details */}
      <section className={styles.detailsSection}>
        <div className={styles.cardsGrid}>
          <ScrollReveal direction="left" delay={0.2}>
            <div className={styles.detailCard}>
              <h3 className={`${styles.heading} ${styles.cardTitle}`}>Ceremony</h3>
              <p className={styles.cardText}>{content.ceremonyTime}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <div className={styles.detailCard}>
              <h3 className={`${styles.heading} ${styles.cardTitle}`}>Reception</h3>
              <p className={styles.cardText}>{content.receptionTime}</p>
            </div>
          </ScrollReveal>
          {content.dressCode && (
            <ScrollReveal direction="right" delay={0.6}>
              <div className={styles.detailCard}>
                <h3 className={`${styles.heading} ${styles.cardTitle}`}>Dress Code</h3>
                <p className={styles.cardText}>{content.dressCode}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Venue */}
      <section className={styles.venueSection}>
        <ScrollReveal direction="up">
          <h2 className={`${styles.heading} ${styles.sectionTitle}`}>Venue</h2>
          <div className={styles.venueFrame}>
            <div className={styles.venueFrameInner}>
              <h3 className={`${styles.heading} ${styles.cardTitle}`} style={{ marginTop: '1rem' }}>{content.venueName}</h3>
              <p className={styles.cardText} style={{ marginBottom: '2rem' }}>{content.venueAddress}</p>
              <div className={styles.mapContainer}>
                <iframe
                  title="Wedding Venue Map"
                  className={styles.map}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(content.venueAddress)}&output=embed`}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* RSVP */}
      <section className={styles.rsvpSection}>
        <ScrollReveal direction="up">
          <h2 className={`${styles.heading} ${styles.sectionTitle}`}>RSVP</h2>
          <p className={styles.cardText}>
            Kindly reply by {formatWeddingDate(content.rsvpDeadline)}
          </p>

          {rsvpStatus === 'idle' ? (
            <form className={styles.form} onSubmit={handleRsvpSubmit}>
              <div className={styles.inputGroup}>
                <label className={`${styles.heading} ${styles.label}`}>Name(s)</label>
                <input type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                <label className={`${styles.heading} ${styles.label}`}>Will you attend?</label>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="attending" value="yes" required />
                    Delightfully Accept
                  </label>
                  <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="attending" value="no" />
                    Regretfully Decline
                  </label>
                </div>
              </div>
              <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                <label className={`${styles.heading} ${styles.label}`}>Dietary Restrictions</label>
                <input type="text" className={styles.input} />
              </div>
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
          ) : (
            <motion.div
              className={styles.successMessage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <FanDeco />
              <h3 className={`${styles.heading} ${styles.cardTitle}`}>Thank You</h3>
              <p className={styles.cardText}>Your response has been recorded.</p>
            </motion.div>
          )}
        </ScrollReveal>
      </section>

      {/* Finale */}
      <section className={styles.finaleSection}>
        <ScrollReveal direction="up">
          <DecoLines />
          <h2 className={`${styles.heading} ${styles.finaleText}`}>The Grand Finale</h2>
          {content.message && <p className={styles.cardText} style={{ maxWidth: '600px', margin: '0 auto' }}>{content.message}</p>}
        </ScrollReveal>
      </section>
    </div>
  );
}

export default ArtDecoGlamour;
