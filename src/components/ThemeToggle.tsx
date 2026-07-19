import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './useTheme';

// Desktop: pill switch with sliding circle + label
export function ThemeTogglePill() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all duration-300 flex-shrink-0 my-auto min-h-[44px]"
      style={{
        backgroundColor: isDark ? '#1e1e3f' : '#f1f5f9',
        borderColor: isDark ? '#3b3b6b' : '#cbd5e1',
        boxShadow: isDark
          ? '0 0 12px rgba(96, 165, 250, 0.3)'
          : '0 0 12px rgba(251, 191, 36, 0.3)',
      }}
    >
      <span
        className="relative w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 gpu"
        style={{
          backgroundColor: isDark ? '#f8fafc' : '#fbbf24',
          boxShadow: isDark
            ? '0 0 8px rgba(255,255,255,0.4)'
            : '0 0 8px rgba(251,191,36,0.6)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
            >
              <Moon className="w-3.5 h-3.5 text-slate-900" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
            >
              <Sun className="w-3.5 h-3.5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span
        className="text-sm font-medium leading-none"
        style={{ color: isDark ? '#f8fafc' : '#475569' }}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}

// Mobile: icon-only circular button — shows the icon you'll switch TO
export function ThemeToggleIcon() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggle}
      whileTap={reduce ? undefined : { scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-slate-700" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
