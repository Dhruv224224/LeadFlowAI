import { motion } from 'framer-motion';
import { Zap, Brain, BellRing, ShieldCheck, Cloud, CalendarClock } from 'lucide-react';
import { Section, fadeUpItem } from './anim';

const features = [
  { icon: Zap, title: 'Fully Automated', desc: 'No manual steps. The workflow runs end-to-end on its own.', color: '#2563EB' },
  { icon: Brain, title: 'AI Powered', desc: 'AI voice, smart routing, and intelligent content generation.', color: '#A78BFA' },
  { icon: BellRing, title: 'Instant Notifications', desc: 'WhatsApp, email, and Slack alerts in under 60 seconds.', color: '#22C55E' },
  { icon: ShieldCheck, title: 'Secure Data', desc: 'Enterprise-grade security for every lead and customer record.', color: '#60A5FA' },
  { icon: Cloud, title: 'Cloud Storage', desc: 'All recordings and files stored safely on Google Drive.', color: '#FBBF24' },
  { icon: CalendarClock, title: 'Easy Scheduling', desc: 'Customers book a time that works — automatically.', color: '#34D399' },
];

export default function WhyLeadFlow() {
  return (
    <Section id="why">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Why{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              LeadFlow AI
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60">Built for speed, reliability, and scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUpItem}
              whileHover={{ y: -6 }}
              className="glass rounded-16 p-7 hover:glow-primary-hover transition-shadow duration-300 flex items-start gap-4"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-12 flex items-center justify-center"
                style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}40` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-text-main/55 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
