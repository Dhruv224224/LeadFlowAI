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

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(href); }),
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
    // Small delay so drawer closes before scroll
    setTimeout(() => scrollToId(href), 50);
  }, []);

  return (
    <>
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
            className="md:hidden p-2 text-text-main flex items-center justify-center flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              minHeight: '44px',
              minWidth: '44px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            className="flex items-center gap-2 font-bold text-lg md:text-xl flex-shrink-0 mx-auto md:mx-0"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            LeadFlow <span className="text-light-blue ml-1">AI</span>
          </a>

          {/* Desktop nav */}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] min-h-[44px]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Zap className="w-4 h-4" />
              Book Free Consultation
            </a>
          </div>

          {/* Mobile: theme icon right — NO duplicate in drawer */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <ThemeToggleIcon />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer — separate from nav to avoid overflow:hidden clipping */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{ zIndex: 9998 }}
              className="fixed inset-0 bg-black/60 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 9999, top: '64px' }}
              className="fixed left-0 right-0 md:hidden glass border-t border-white/10 shadow-2xl"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleNav(e, l.href)}
                    className={`flex items-center text-base font-medium transition-colors rounded-xl px-3 ${
                      active === l.href
                        ? 'text-light-blue bg-white/5'
                        : 'text-text-main/80 hover:text-light-blue hover:bg-white/5'
                    }`}
                    style={{
                      minHeight: '52px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href={N8N_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-semibold text-base glow-primary mt-3"
                  style={{
                    minHeight: '52px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                >
                  <Zap className="w-5 h-5" />
                  Book Free Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}