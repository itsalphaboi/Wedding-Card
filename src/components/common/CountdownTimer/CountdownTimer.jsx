import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountdown } from '../../../utils/dateFormatter';
import styles from './CountdownTimer.module.css';

/**
 * CountdownTimer — Live countdown to the wedding day.
 *
 * @param {object} props
 * @param {string} props.weddingDate  - ISO date string (YYYY-MM-DD)
 * @param {string} props.weddingTime  - Time string (HH:MM), defaults to '00:00'
 * @param {string} props.label        - Optional heading text
 */
export default function CountdownTimer({
  weddingDate,
  weddingTime = '00:00',
  label = 'Counting Down To Our Forever',
}) {
  const [countdown, setCountdown] = useState(() =>
    getCountdown(weddingDate, weddingTime)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdown(weddingDate, weddingTime));
    }, 1000);
    return () => clearInterval(id);
  }, [weddingDate, weddingTime]);

  if (countdown.isPast) {
    return (
      <motion.div
        className={styles.arrived}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        The Day Has Arrived! 🎉
      </motion.div>
    );
  }

  const units = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Minutes' },
    { value: countdown.seconds, label: 'Seconds' },
  ];

  return (
    <div className={styles.wrapper}>
      {label && (
        <motion.p
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {label}
        </motion.p>
      )}

      <div className={styles.grid}>
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                className={styles.number}
                initial={{ y: -20, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: 20, opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className={styles.unit}>{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
