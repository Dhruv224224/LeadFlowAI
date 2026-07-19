import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 300, mass: 0.5 });
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reduce) return;
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    setEnabled(true);

    const interactiveSelector =
      'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(400px at ${e.clientX}px ${e.clientY}px, rgba(37,99,235,0.06), rgba(96,165,250,0.03) 40%, transparent 70%)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest(interactiveSelector));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [dotX, dotY, reduce]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={spotRef}
        className="fixed inset-0 z-[5] pointer-events-none will-change-transform"
        style={{ mixBlendMode: 'screen' }}
      />
      <motion.div className="fixed top-0 left-0 z-[100] pointer-events-none" style={{ x: dotX, y: dotY }}>
        <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-blue shadow-[0_0_12px_rgba(96,165,250,0.9)] gpu" />
      </motion.div>
      <motion.div className="fixed top-0 left-0 z-[100] pointer-events-none" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-light-blue/70 gpu"
          animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32, opacity: hovering ? 1 : 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ boxShadow: '0 0 16px rgba(37,99,235,0.4)' }}
        />
      </motion.div>
    </>
  );
}
