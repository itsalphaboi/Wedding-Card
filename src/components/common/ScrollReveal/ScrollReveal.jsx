import { motion } from 'framer-motion';

/**
 * ScrollReveal — A reusable scroll-triggered reveal wrapper.
 *
 * Wraps children in a Framer Motion div that fades/slides into view
 * when scrolled into the viewport.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children  - Content to reveal
 * @param {'up'|'down'|'left'|'right'} props.direction - Slide direction (default: 'up')
 * @param {number}  props.delay     - Animation delay in seconds (default: 0)
 * @param {number}  props.duration  - Animation duration in seconds (default: 0.6)
 * @param {string}  props.className - Additional CSS class
 * @param {boolean} props.once      - Trigger only once (default: true)
 * @param {number}  props.amount    - Viewport threshold 0-1 (default: 0.2)
 * @param {number}  props.offset    - Pixel offset for slide (default: 50)
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.2,
  offset = 50,
}) {
  // Compute initial x/y offset based on direction
  const offsets = {
    up: { x: 0, y: offset },
    down: { x: 0, y: -offset },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
  };

  const { x, y } = offsets[direction] || offsets.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
    >
      {children}
    </motion.div>
  );
}
