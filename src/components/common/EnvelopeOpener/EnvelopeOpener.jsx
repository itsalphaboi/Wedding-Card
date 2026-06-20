import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatWeddingDate } from '../../../utils/dateFormatter';
import { getContrastColor, darkenColor, lightenColor } from '../../../utils/contrastColor';
import styles from './EnvelopeOpener.module.css';

/**
 * EnvelopeOpener — wraps any template with a letter-opening intro animation.
 *
 * Props:
 *   children   — the template component to reveal
 *   content    — { brideName, groomName, weddingDate }
 *   colors     — { primary, secondary, accent, text, background }
 *   fonts      — { heading, body }
 */
function EnvelopeOpener({ children, content, colors, fonts }) {
  const [phase, setPhase] = useState('closed'); // 'closed' | 'opening' | 'revealed'

  const envelopeColor = colors.primary;
  const envelopeDarker = darkenColor(envelopeColor, 12);
  const envelopeLighter = lightenColor(envelopeColor, 15);
  const flapColor = darkenColor(envelopeColor, 6);
  const sealColor = colors.accent || '#C9A84C';
  const textOnEnvelope = getContrastColor(envelopeColor);
  const bgColor = darkenColor(colors.background, 5);
  const letterBg = colors.background;
  const letterText = colors.text;

  // Generate sparkle positions once
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
  }));

  const handleOpen = useCallback(() => {
    if (phase === 'closed') {
      setPhase('opening');
      // After flap opens and letter slides up, reveal the invitation
      setTimeout(() => setPhase('revealed'), 1800);
    }
  }, [phase]);

  return (
    <>
      <AnimatePresence>
        {phase !== 'revealed' && (
          <motion.div
            className={styles.envelope}
            onClick={handleOpen}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Background */}
            <motion.div
              className={styles.envelopeBackground}
              style={{ background: `radial-gradient(ellipse at center, ${bgColor}, ${darkenColor(bgColor, 15)})` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {/* Sparkles */}
              {sparkles.map((s) => (
                <motion.div
                  key={s.id}
                  className={styles.sparkle}
                  style={{
                    left: s.left,
                    top: s.top,
                    width: s.size,
                    height: s.size,
                    background: colors.accent,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: s.duration,
                    delay: s.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Main content */}
            <div className={styles.envelopeContent}>
              {/* Envelope */}
              <motion.div
                className={styles.envelopeWrapper}
                initial={{ scale: 0.8, y: 20 }}
                animate={{
                  scale: phase === 'opening' ? 1.05 : 1,
                  y: phase === 'opening' ? -40 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Envelope body */}
                <div
                  className={styles.envelopeBody}
                  style={{ background: envelopeColor }}
                >
                  <div className={styles.envelopeTexture} />
                  <div
                    className={styles.envelopeFoldBottom}
                    style={{ background: envelopeDarker }}
                  />
                  <div className={styles.envelopeFoldLeft} />
                  <div className={styles.envelopeFoldRight} />
                </div>

                {/* Letter card inside */}
                <motion.div
                  className={styles.letterCard}
                  style={{
                    background: letterBg,
                    color: letterText,
                    fontFamily: fonts.heading,
                  }}
                  animate={
                    phase === 'opening'
                      ? { y: '-70%', opacity: 1 }
                      : { y: '0%', opacity: 1 }
                  }
                  transition={{ duration: 0.9, delay: phase === 'opening' ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.letterNames}>{content.brideName}</div>
                  <div className={styles.letterAmpersand} style={{ fontFamily: fonts.body }}>&</div>
                  <div className={styles.letterNames}>{content.groomName}</div>
                  <div
                    className={styles.letterDate}
                    style={{ fontFamily: fonts.body }}
                  >
                    {formatWeddingDate(content.weddingDate, 'MMMM d, yyyy')}
                  </div>
                </motion.div>

                {/* Top flap */}
                <motion.div
                  className={styles.envelopeFlap}
                  animate={
                    phase === 'opening'
                      ? { rotateX: -180 }
                      : { rotateX: 0 }
                  }
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: phase === 'opening' ? 0 : 3 }}
                >
                  <div
                    className={styles.envelopeFlapFront}
                    style={{ background: flapColor }}
                  />
                  <div
                    className={styles.envelopeFlapBack}
                    style={{ background: envelopeLighter }}
                  />
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  className={styles.waxSeal}
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${lightenColor(sealColor, 15)}, ${sealColor}, ${darkenColor(sealColor, 20)})`,
                    color: getContrastColor(sealColor),
                  }}
                  animate={
                    phase === 'opening'
                      ? { scale: 0, opacity: 0, rotate: 30 }
                      : {
                          scale: [1, 1.06, 1],
                        }
                  }
                  transition={
                    phase === 'opening'
                      ? { duration: 0.3 }
                      : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  💌
                </motion.div>
              </motion.div>

              {/* Tap prompt */}
              {phase === 'closed' && (
                <motion.p
                  className={styles.tapPrompt}
                  style={{ color: textOnEnvelope, fontFamily: fonts.body }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                  transition={{ opacity: { duration: 2, repeat: Infinity }, y: { duration: 0.6 } }}
                >
                  Tap to open
                  <span className={styles.tapIcon}>✉️</span>
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed invitation */}
      {phase === 'revealed' && (
        <motion.div
          className={styles.invitationReveal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

export default EnvelopeOpener;
