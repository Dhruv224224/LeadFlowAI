import { motion } from 'framer-motion';
import { Workflow, Calendar, MessageSquare, Slack, Mail, Database } from 'lucide-react';

const badges = [
  { name: 'n8n', icon: Workflow },
  { name: 'HubSpot', icon: Database },
  { name: 'Google Calendar', icon: Calendar },
  { name: 'WhatsApp', icon: MessageSquare },
  { name: 'Slack', icon: Slack },
  { name: 'Gmail', icon: Mail },
];

export default function TrustBadges() {
  const row = [...badges, ...badges];
  return (
    <div className="relative py-10 border-y border-white/5 overflow-hidden" aria-label="Integration partners">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-12 animate-scroll-x will-change-transform gpu"
        style={{ width: 'max-content' }}
      >
        {row.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-text-main/40 hover:text-light-blue transition-colors duration-200 shrink-0"
          >
            <b.icon className="w-6 h-6" />
            <span className="text-lg font-semibold whitespace-nowrap">{b.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
