import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 25, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 250, mass: 0.5 });
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // disable on touch devices
    if (typeof window === 'undefined') return;
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
        spotRef.current.style.background = `radial-gradient(400px at ${e.clientX}px ${e.clientY}px, rgba(37,99,235,0.10), rgba(96,165,250,0.04) 40%, transparent 70%)`;
      }
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Spotlight overlay */}
      <div
        ref={spotRef}
        className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-300 will-change-transform"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Custom cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{ x: dotX, y: dotY }}
      >
        <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-blue shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
      </motion.div>
      {/* Custom cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-light-blue/70"
          animate={{ width: hovering ? 36 : 24, height: hovering ? 36 : 24, opacity: hovering ? 1 : 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ boxShadow: '0 0 16px rgba(37,99,235,0.4)' }}
        />
      </motion.div>
    </>
  );
}
