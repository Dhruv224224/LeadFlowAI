import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageSquare, Calendar, Mic, Briefcase } from 'lucide-react';

type Toast = {
  id: number;
  initials: string;
  name: string;
  message: string;
  timestamp: string;
  icon: typeof CheckCircle2;
  color: string;
};

const messages: Omit<Toast, 'id' | 'timestamp'>[] = [
  { initials: 'RS', name: 'Rahul Sharma', message: 'just booked a consultation', icon: CheckCircle2, color: '#22C55E' },
  { initials: 'PM', name: 'Priya Mehta', message: 'WhatsApp sent — 2 mins ago', icon: MessageSquare, color: '#22C55E' },
  { initials: 'AS', name: 'Arjun Singh', message: 'Meeting scheduled', icon: Calendar, color: '#60A5FA' },
  { initials: 'NG', name: 'Neha Gupta', message: 'AI voice generated', icon: Mic, color: '#A78BFA' },
  { initials: 'VK', name: 'Vikram Kapoor', message: 'New HubSpot contact created', icon: Briefcase, color: '#FF7A59' },
  { initials: 'AD', name: 'Ananya Desai', message: 'just booked a consultation', icon: CheckCircle2, color: '#22C55E' },
  { initials: 'RP', name: 'Rohit Patel', message: 'Slack notification delivered', icon: MessageSquare, color: '#F8FAFC' },
  { initials: 'SK', name: 'Sneha Krishnan', message: 'AI voice generated', icon: Mic, color: '#A78BFA' },
];

function timeAgo(): string {
  const mins = Math.floor(Math.random() * 5) + 1;
  return mins === 1 ? '1 min ago' : `${mins} mins ago`;
}

export default function ToastNotifications() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  useEffect(() => {
    let id = 0;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 8000 + Math.random() * 2000;
      timer = setTimeout(() => {
        const base = messages[Math.floor(Math.random() * messages.length)];
        const toast: Toast = {
          ...base,
          id: id++,
          timestamp: timeAgo(),
        };
        setToasts((t) => [...t.slice(-2), toast]);
        setTimeout(() => remove(toast.id), 4000);
        schedule();
      }, delay);
    };

    // first toast after a short delay
    timer = setTimeout(() => {
      const base = messages[Math.floor(Math.random() * messages.length)];
      const toast: Toast = { ...base, id: id++, timestamp: timeAgo() };
      setToasts((t) => [...t.slice(-2), toast]);
      setTimeout(() => remove(toast.id), 4000);
      schedule();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [remove]);

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col gap-3 pointer-events-none w-[320px] max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -120, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -120, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-16 p-3.5 flex items-start gap-3 shadow-2xl pointer-events-auto relative overflow-hidden"
          >
            <div
              className="absolute -left-8 -top-8 w-20 h-20 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: t.color }}
            />
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-light-blue flex items-center justify-center font-bold text-white text-sm">
                {t.initials}
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg"
                style={{ backgroundColor: t.color }}
              >
                <t.icon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0 relative">
              <p className="text-sm text-text-main leading-snug">
                <span className="font-semibold">{t.name}</span>{' '}
                <span className="text-text-main/70">{t.message}</span>
              </p>
              <p className="text-xs text-text-main/40 mt-1">{t.timestamp}</p>
            </div>
            <button
              onClick={() => remove(t.id)}
              aria-label="Dismiss"
              className="relative flex-shrink-0 text-text-main/30 hover:text-text-main transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
