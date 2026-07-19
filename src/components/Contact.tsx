import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Zap } from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { Section, fadeUpItem } from './anim';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'dhruvmaheshwari18vk@gmail.com', href: 'mailto:dhruvmaheshwari18vk@gmail.com' },
  { icon: Github, label: 'GitHub', value: 'github.com/Dhruv224224', href: 'https://github.com/Dhruv224224' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/dhruvmaheshwari-cse', href: 'https://linkedin.com/in/dhruvmaheshwari-cse' },
  { icon: MapPin, label: 'Location', value: 'Gwalior, MP, India', href: null },
];

export default function Contact() {
  return (
    <Section id="contact">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUpItem} className="glass rounded-16 p-8 md:p-12 text-center relative overflow-hidden gpu">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight relative">
            Let's{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="mt-4 text-text-main/60 relative">
            Book your free consultation or reach out directly.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left relative">
            {contactItems.map((c) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-12 bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-text-main/40 uppercase tracking-wider">{c.label}</div>
                    <div className="text-sm text-text-main/80 truncate">{c.value}</div>
                  </div>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="flex items-center gap-3 p-4 rounded-12 bg-white/[0.03] border border-white/10 hover:border-light-blue/40 hover:bg-white/5 transition-all duration-200 min-h-[48px]"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-3 p-4 rounded-12 bg-white/[0.03] border border-white/10">
                  {inner}
                </div>
              );
            })}
          </div>

          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free consultation"
            className="mt-10 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-16 bg-primary text-white font-semibold glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] animate-pulse-glow w-full sm:w-auto relative min-h-[48px]"
          >
            <Zap className="w-5 h-5" />
            Book Free Consultation
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
