import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Section, fadeUpItem } from './anim';

const faqs = [
  { q: 'How quickly does the automation run after I submit the form?', a: 'The entire workflow — CRM update, WhatsApp, calendar, AI voice, email, and Slack — completes in under 60 seconds after you submit the consultation form.' },
  { q: 'Will I receive a WhatsApp message confirmation?', a: 'Yes. A personalized WhatsApp confirmation is sent automatically via Twilio the moment your form is submitted, including your reference ID and next steps.' },
  { q: 'How does the AI voice confirmation work?', a: 'We use ElevenLabs to generate a professional voice confirmation, upload the recording to Google Drive, and share the link with you so you can listen anytime.' },
  { q: 'Is my data secure?', a: 'Absolutely. All data is transmitted over encrypted channels, stored securely, and never shared with third parties. We follow enterprise-grade security practices.' },
  { q: 'Can I reschedule my consultation?', a: 'Yes. Simply reply to your confirmation email or WhatsApp message and our team will help you find a new time that works for you.' },
  { q: 'What tools are integrated in this workflow?', a: 'The workflow connects HubSpot CRM, WhatsApp (Twilio), Google Calendar, ElevenLabs AI Voice, Google Drive, Gmail, and Slack — all orchestrated by n8n.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60">Everything you need to know.</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} variants={fadeUpItem} className="glass rounded-16 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-label={f.q}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left min-h-[48px]"
                >
                  <span className="font-semibold text-base md:text-lg">{f.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={reduce ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-text-main/60 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
