import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { ThemeTogglePill, ThemeToggleIcon } from './ThemeToggle';
import { useTheme } from './useTheme';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

function scrollToId(href: string) {
  const el = document.querySelector(href);
  if (el) {
    const top = (el as HTMLElement).offsetTop - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const reduce = useReducedMotion();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = links.map((l) => l.href.slice(1));
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(`#${id}`);
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduce ? { duration: 0.01 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: 9999 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-200 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-2">
        {/* Mobile: hamburger left */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text-main min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, '#home')}
          className="flex items-center gap-2 font-bold text-lg md:text-xl flex-shrink-0 mx-auto md:mx-0"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          LeadFlow <span className="text-light-blue">AI</span>
        </a>

        {/* Desktop: nav links + toggle + CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className={`link-underline text-sm transition-colors min-h-[44px] flex items-center ${
                active === l.href ? 'text-light-blue' : 'text-text-main/70 hover:text-light-blue'
              }`}
            >
              {l.label}
            </a>
          ))}
          <ThemeTogglePill />
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free consultation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-12 bg-primary text-white font-semibold text-sm glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] min-h-[44px]"
          >
            <Zap className="w-4 h-4" />
            Book Free Consultation
          </a>
        </div>

        {/* Mobile: theme icon right */}
        <div className="md:hidden flex items-center flex-shrink-0">
          <ThemeToggleIcon />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden glass border-t border-white/10"
          >
            {/* Theme row at top of drawer */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
              <span className="text-sm font-medium text-text-main/60">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0',
                }}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>

            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className={`text-text-main/80 hover:text-light-blue transition-colors min-h-[48px] flex items-center text-base ${
                    active === l.href ? 'text-light-blue' : ''
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={N8N_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-12 bg-primary text-white font-semibold text-base glow-primary min-h-[48px] mt-2"
              >
                <Zap className="w-5 h-5" />
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
