import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './useTheme';

// Desktop: pill switch
export function ThemeTogglePill() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border flex-shrink-0 my-auto"
      style={{
        backgroundColor: isDark ? '#1e1e3f' : '#f1f5f9',
        borderColor: isDark ? '#3b3b6b' : '#cbd5e1',
        boxShadow: isDark
          ? '0 0 12px rgba(96,165,250,0.2)'
          : '0 0 12px rgba(251,191,36,0.2)',
        minHeight: '44px',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      <span
        className="relative w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: isDark ? '#f8fafc' : '#fbbf24',
          transform: 'translateZ(0)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={reduce ? false : { opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduce ? undefined : { opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="w-3.5 h-3.5 text-slate-900" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={reduce ? false : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduce ? undefined : { opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="w-3.5 h-3.5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span
        className="text-sm font-medium leading-none select-none"
        style={{ color: isDark ? '#f8fafc' : '#475569' }}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}

// Mobile: icon-only circular button
export function ThemeToggleIcon() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        transform: 'translateZ(0)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <Sun className="w-5 h-5 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <Moon className="w-5 h-5 text-slate-700" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}