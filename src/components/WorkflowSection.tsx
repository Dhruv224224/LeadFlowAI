import { motion, useReducedMotion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { Section, fadeUpItem, VIEWPORT } from './anim';
import { workflowSteps } from './workflowSteps';
import ParticleField from './ParticleField';

function StepCard({ step, index }: { step: typeof workflowSteps[number]; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={fadeUpItem}
      transition={{ delay: index * 0.08 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="relative glass rounded-16 p-5 md:p-6 gpu"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-12 flex items-center justify-center"
          style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}40` }}
        >
          <step.icon className="w-6 h-6" style={{ color: step.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${step.color}20`, color: step.color }}
            >
              {String(step.n).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-semibold text-text-main text-base md:text-lg leading-snug">
            {step.title}
          </h3>
          <p className="text-sm text-text-main/50 mt-1">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkflowSection() {
  return (
    <Section id="workflow" className="section-alt section-divider">
      <div className="absolute inset-0 -z-[5] opacity-50 pointer-events-none">
        <ParticleField />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div variants={fadeUpItem} viewport={VIEWPORT} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            The Complete{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Automation Workflow
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60 max-w-2xl mx-auto">
            One form submission triggers 9 automated actions instantly.
          </p>
        </motion.div>

        <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-4 relative">
          {workflowSteps.map((s, i) => (
            <div key={s.n} className="relative">
              <StepCard step={s} index={i} />
              {i < workflowSteps.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.35 }}
                    className="w-px h-4 bg-gradient-to-b from-light-blue/60 to-primary/20 origin-top"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-4 relative">
          <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-light-blue/30 to-success/40" />
          {workflowSteps.map((s, i) => (
            <div key={s.n} className="relative">
              <StepCard step={s} index={i} />
            </div>
          ))}
        </div>

        <motion.div variants={fadeUpItem} className="mt-20 text-center glass rounded-16 p-10 md:p-14 relative overflow-hidden gpu">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/20 rounded-full blur-3xl" />
          <h3 className="text-3xl md:text-4xl font-extrabold relative">
            Ready to automate your business?
          </h3>
          <p className="mt-3 text-text-main/60 relative">Get a free consultation. We'll build your workflow.</p>
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free consultation"
            className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-16 bg-primary text-white font-semibold glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] animate-pulse-glow relative min-h-[48px]"
          >
            <Zap className="w-5 h-5" />
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
