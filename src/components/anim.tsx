import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, type ReactNode } from 'react';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };
const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

export const VIEWPORT = { once: true, margin: '-100px' as const };

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={reduce ? undefined : staggerContainer(0.08)}
      className={`relative px-6 py-24 md:py-32 overflow-x-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (reduce) {
        count.set(value);
        return;
      }
      const controls = animate(count, value, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, value, count, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export const springTransition = SPRING;
export { motion };
