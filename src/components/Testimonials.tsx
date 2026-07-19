import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Section, fadeUpItem } from './anim';

const testimonials = [
  {
    initials: 'SR', name: 'Sarah Reynolds', role: 'Founder', company: 'BrightPath Studio',
    text: 'LeadFlow AI transformed our lead process. We went from manual follow-ups to a fully automated pipeline in days. Bookings doubled in the first month.',
  },
  {
    initials: 'MK', name: 'Marcus Kim', role: 'Head of Growth', company: 'NorthPeak Agency',
    text: 'The WhatsApp + AI voice combo is unreal. Clients get a personalized confirmation instantly and our team is always in the loop via Slack. Game changer.',
  },
  {
    initials: 'AP', name: 'Aisha Patel', role: 'Operations Lead', company: 'Lumen SaaS',
    text: 'We booked 80+ consultations in our first quarter using this workflow. The automation is flawless and the setup was done for us. Worth every second.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      setActive((a) =>
        dx > 0 ? (a - 1 + testimonials.length) % testimonials.length : (a + 1) % testimonials.length
      );
    }
  };

  return (
    <Section id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            What Clients{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60">Real results from real businesses.</p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUpItem}
              whileHover={reduce ? undefined : { y: -6 }}
              className="glass rounded-16 p-7 gpu"
            >
              <Quote className="w-8 h-8 text-primary/60 mb-4" />
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text-main/80 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-light-blue flex items-center justify-center font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-text-main/50">{t.role} · {t.company}</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-text-main/30">
                (Sample Testimonial)
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
              transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
              className="glass rounded-16 p-7 gpu"
            >
              <Quote className="w-8 h-8 text-primary/60 mb-4" />
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text-main/80 leading-relaxed mb-6">{testimonials[active].text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-light-blue flex items-center justify-center font-bold text-white">
                  {testimonials[active].initials}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[active].name}</div>
                  <div className="text-xs text-text-main/50">
                    {testimonials[active].role} · {testimonials[active].company}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-text-main/30">
                (Sample Testimonial)
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center`}
              >
                <span className={`block rounded-full transition-all duration-200 ${i === active ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/20'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
