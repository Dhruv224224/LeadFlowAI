import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { ThemeTogglePill, ThemeToggleIcon } from './ThemeToggle';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active link via IntersectionObserver
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNav(e, '#home')}
          className="flex items-center gap-2 font-bold text-lg md:text-xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          LeadFlow <span className="text-light-blue">AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
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

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggleIcon />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-text-main min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              <div className="flex items-center justify-between min-h-[48px] py-2">
                <span className="text-sm text-text-main/60">Theme</span>
                <ThemeTogglePill />
              </div>
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
