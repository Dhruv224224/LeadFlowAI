import { motion, useReducedMotion } from 'framer-motion';
import {
  Workflow, Database, MessageSquare, Calendar, Mic, Mail, Slack, Briefcase,
} from 'lucide-react';
import { Section, fadeUpItem } from './anim';

const services = [
  { icon: Workflow, title: 'AI Workflow Automation', desc: 'End-to-end automation powered by n8n and AI agents working 24/7.', color: '#2563EB' },
  { icon: Database, title: 'CRM Integration', desc: 'Sync leads and contacts with HubSpot automatically in real time.', color: '#FF7A59' },
  { icon: MessageSquare, title: 'WhatsApp Automation', desc: 'Send personalized confirmations and updates via WhatsApp instantly.', color: '#22C55E' },
  { icon: Calendar, title: 'Google Calendar Scheduling', desc: 'Automate meeting booking with smart calendar integration.', color: '#60A5FA' },
  { icon: Mic, title: 'AI Voice Solutions', desc: 'Professional AI-generated voice confirmations using ElevenLabs.', color: '#A78BFA' },
  { icon: Mail, title: 'Email Automation', desc: 'Beautiful HTML emails sent automatically at every workflow step.', color: '#EF4444' },
  { icon: Slack, title: 'Slack Integration', desc: 'Real-time team notifications and alerts across your channels.', color: '#F8FAFC' },
  { icon: Briefcase, title: 'Business Consulting', desc: 'Strategic guidance to map your processes into automated workflows.', color: '#FBBF24' },
];

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <Section id="services" className="section-divider">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60">Everything you need to automate and scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUpItem}
              whileHover={reduce ? undefined : { y: -6 }}
              className="glass rounded-16 p-6 gpu"
            >
              <div
                className="w-12 h-12 rounded-12 flex items-center justify-center mb-4"
                style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}40` }}
              >
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-text-main/55 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
