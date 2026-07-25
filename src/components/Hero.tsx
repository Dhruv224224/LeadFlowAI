import { motion, useReducedMotion } from 'framer-motion';
import {
  Zap, Calendar, MessageSquare, Mail, Database, Cloud, Slack, ArrowRight, Sparkles,
} from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { AnimatedCounter, staggerContainer, fadeUpItem } from './anim';
import { useTypewriter } from './useTypewriter';
import ParticleField from './ParticleField';

const stats = [
  { value: 500, suffix: '+', label: 'Consultations' },
  { value: 99, suffix: '%', label: 'Success Rate' },
  { value: 24, suffix: 'hr', label: 'Response' },
  { value: 10, suffix: '+', label: 'Integrations' },
];

const headingWords = [
  'Business Automation', 'CRM Integration', 'WhatsApp Automation',
  'Lead Management', 'Email Automation', 'Workflow Engine',
];
const subtitleWords = ['HubSpot', 'WhatsApp', 'Google Calendar', 'Gmail', 'Slack'];

const integrations = [
  { icon: Database, name: 'HubSpot', color: '#FF7A59' },
  { icon: MessageSquare, name: 'WhatsApp', color: '#22C55E' },
  { icon: Calendar, name: 'Calendar', color: '#60A5FA' },
  { icon: Slack, name: 'Slack', color: '#F8FAFC' },
  { icon: Mail, name: 'Gmail', color: '#EF4444' },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const headingText = useTypewriter(headingWords, 80, 40, 2000);
  const subtitleText = useTypewriter(subtitleWords, 70, 35, 1800);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-gradient-shift" style={{ background: 'var(--hero-gradient)', backgroundSize: '400% 400%' }} />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-light-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/5 rounded-full blur-[140px]" />
      </div>

      <div className="absolute inset-0 -z-[5] opacity-70">
        <ParticleField />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reduce ? undefined : staggerContainer(0.08)}
          className="text-center lg:text-left"
        >
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-light-blue mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Powered by n8n + AI
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="text-[32px] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight min-h-[2.4em] sm:min-h-[2.2em] lg:min-h-[2.2em]"
          >
            <span className="block">AI-Powered</span>
            <span className="bg-gradient-to-r from-primary via-light-blue to-[#A78BFA] bg-clip-text text-transparent inline-flex items-baseline">
              {headingText}
              <span className="ml-1 inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-light-blue animate-pulse rounded-sm" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-6 text-base sm:text-lg lg:text-xl text-text-main/70 max-w-xl mx-auto lg:mx-0 leading-relaxed min-h-[4em] sm:min-h-[3.5em]"
          >
            From lead capture to CRM, WhatsApp confirmation, calendar scheduling,
            and email — fully automated in seconds. Integrates with{' '}
            <span className="text-light-blue font-semibold">
              {subtitleText}
              <span className="inline-block w-[2px] h-[1em] bg-light-blue/80 animate-pulse ml-0.5 align-middle rounded-sm" />
            </span>
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href={N8N_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a free consultation"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-16 bg-primary text-white font-semibold text-base glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] animate-pulse-glow min-h-[48px]"
            >
              <Zap className="w-5 h-5" />
              Book Free Consultation
            </a>
            <a
              href="#workflow"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-16 border border-white/15 text-text-main font-semibold text-base hover:bg-white/5 hover:border-light-blue/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] min-h-[48px]"
            >
              See The Workflow
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-white to-light-blue bg-clip-text text-transparent">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-text-main/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative gpu"
        >
          <div className="glass rounded-16 p-6 lg:p-8 relative overflow-hidden gpu">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-text-main/40 font-mono">leadflow.automation</span>
            </div>

            <div className="text-center mb-6 relative">
              <div className="text-sm text-text-main/50 mb-2">Workflow Status</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/30 text-success text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Active &amp; Running
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 relative">
              {integrations.map((it, i) => (
                <motion.div
                  key={it.name}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-12 p-4 flex flex-col items-center gap-2 gpu"
                >
                  <it.icon className="w-6 h-6" style={{ color: it.color }} />
                  <span className="text-xs text-text-main/70">{it.name}</span>
                </motion.div>
              ))}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <motion.line
                x1="50%" y1="0%" x2="50%" y2="100%"
                stroke="url(#heroGrad)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 flex items-center justify-center gap-2 text-xs text-text-main/40 relative"
            >
              <Cloud className="w-4 h-4 text-light-blue" />
              All systems connected
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
