import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './useTheme';

export function ThemeTogglePill() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="relative h-[26px] w-[48px] rounded-full flex-shrink-0 transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center my-auto"
      style={{
        backgroundColor: isLight ? '#e2e8f0' : '#1a1a2e',
        boxShadow: isLight
          ? '0 0 12px rgba(245, 158, 11, 0.25)'
          : '0 0 12px rgba(96, 165, 250, 0.25)',
      }}
    >
      <motion.span
        initial={false}
        animate={{ x: isLight ? 22 : 2 }}
        transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full flex items-center justify-center gpu"
        style={{
          backgroundColor: isLight ? '#fbbf24' : '#f8fafc',
          boxShadow: isLight
            ? '0 0 10px rgba(251, 191, 36, 0.6)'
            : '0 0 10px rgba(255, 255, 255, 0.4)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
            >
              <Sun className="w-3 h-3 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
            >
              <Moon className="w-3 h-3 text-slate-900" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

export function ThemeToggleIcon() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isLight = theme === 'light';
  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-12 hover:bg-white/5 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-light-blue" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
