import { motion } from 'framer-motion';
import { MousePointerClick, Bot, BellRing, CalendarCheck } from 'lucide-react';
import { Section, fadeUpItem } from './anim';

const items = [
  { n: 1, icon: MousePointerClick, title: 'Submit Form', desc: 'Click Book Free Consultation and fill your details', color: '#60A5FA' },
  { n: 2, icon: Bot, title: 'AI Takes Over', desc: 'Workflow triggers instantly across all platforms', color: '#A78BFA' },
  { n: 3, icon: BellRing, title: 'You Get Notified', desc: 'WhatsApp, email, and voice confirmation arrive', color: '#22C55E' },
  { n: 4, icon: CalendarCheck, title: 'We Connect', desc: 'Meet your consultant at the scheduled time', color: '#FBBF24' },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            How It{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60">Four simple steps from form to connection.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.n}
              variants={fadeUpItem}
              whileHover={{ y: -6 }}
              className="glass rounded-16 p-7 text-center hover:glow-primary-hover transition-shadow duration-300"
            >
              <div
                className="mx-auto w-14 h-14 rounded-16 flex items-center justify-center mb-5"
                style={{ backgroundColor: `${it.color}15`, border: `1px solid ${it.color}40` }}
              >
                <it.icon className="w-7 h-7" style={{ color: it.color }} />
              </div>
              <div className="text-5xl font-extrabold text-text-main/10 mb-2">{String(it.n).padStart(2, '0')}</div>
              <h3 className="text-xl font-bold mb-2">{it.title}</h3>
              <p className="text-sm text-text-main/55 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
