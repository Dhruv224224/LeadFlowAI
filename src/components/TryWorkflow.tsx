import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, Loader2, Zap, Sparkles } from 'lucide-react';
import { N8N_FORM_URL } from '../config';
import { Section, fadeUpItem } from './anim';
import { workflowSteps } from './workflowSteps';

type Status = 'idle' | 'running' | 'done';

export default function TryWorkflow() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [activeStep, setActiveStep] = useState(-1);
  const [completed, setCompleted] = useState<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const progress = status === 'idle' ? 0 : Math.round((completed.length / workflowSteps.length) * 100);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runDemo = () => {
    if (status === 'running') return;
    clearTimers();
    setStatus('running');
    setCompleted([]);
    setActiveStep(-1);

    workflowSteps.forEach((_, i) => {
      const start = setTimeout(() => setActiveStep(i), i * 600);
      timers.current.push(start);
      const finish = setTimeout(() => {
        setCompleted((c) => [...c, i]);
        if (i === workflowSteps.length - 1) {
          setStatus('done');
          setActiveStep(-1);
        }
      }, i * 600 + 600);
      timers.current.push(finish);
    });
  };

  const reset = () => {
    clearTimers();
    setStatus('idle');
    setActiveStep(-1);
    setCompleted([]);
  };

  useEffect(() => () => clearTimers(), []);

  const canSubmit = form.name.trim() && form.email.trim() && form.phone.trim();

  return (
    <Section id="try-workflow">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUpItem} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-light-blue mb-5">
            <Sparkles className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Try The{' '}
            <span className="bg-gradient-to-r from-primary via-light-blue to-success bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
          <p className="mt-5 text-lg text-text-main/60 max-w-2xl mx-auto">
            Fill the form and trigger the automation. Watch all 12 steps light up in real time.
          </p>
        </motion.div>

        <motion.div variants={fadeUpItem} className="glass rounded-16 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-primary/15 rounded-full blur-3xl" />

          {/* Progress bar */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-text-main/60 font-medium">
                {status === 'idle' && 'Ready to launch'}
                {status === 'running' && 'Automation running...'}
                {status === 'done' && 'Automation complete!'}
              </span>
              <span className="font-mono font-bold text-light-blue">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-light-blue to-success rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 relative">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-main/50 mb-1.5 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    disabled={status === 'running'}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-12 bg-white/5 border border-white/10 text-text-main placeholder:text-text-main/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-main/50 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    disabled={status === 'running'}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-12 bg-white/5 border border-white/10 text-text-main placeholder:text-text-main/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-main/50 mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    disabled={status === 'running'}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-12 bg-white/5 border border-white/10 text-text-main placeholder:text-text-main/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  onClick={status === 'done' ? reset : runDemo}
                  disabled={!canSubmit || status === 'running'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-12 bg-primary text-white font-semibold glow-primary hover:glow-primary-hover transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 min-h-[44px]"
                >
                  {status === 'running' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Running...
                    </>
                  ) : status === 'done' ? (
                    <>
                      <RotateCcw className="w-5 h-5" />
                      Run Again
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Trigger Demo
                    </>
                  )}
                </button>
                {!canSubmit && status === 'idle' && (
                  <p className="text-xs text-text-main/40 text-center">Fill all fields to trigger the demo</p>
                )}
              </div>
            </div>

            {/* Steps */}
            <div className="lg:col-span-3">
              <div className="space-y-2 max-h-[440px] overflow-y-auto pr-2">
                {workflowSteps.map((s, i) => {
                  const isDone = completed.includes(i);
                  const isActive = activeStep === i;
                  return (
                    <div
                      key={s.n}
                      className={`flex items-center gap-3 p-3 rounded-12 border transition-all duration-300 ${
                        isDone
                          ? 'bg-success/10 border-success/40'
                          : isActive
                          ? 'bg-primary/10 border-primary/50 scale-[1.02]'
                          : 'bg-white/[0.02] border-white/5'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                          isDone ? 'bg-success/20' : isActive ? 'bg-primary/20' : 'bg-white/5'
                        }`}
                        style={isDone || isActive ? { border: `1px solid ${s.color}60` } : undefined}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 animate-spin" style={{ color: s.color }} />
                        ) : (
                          <s.icon className="w-5 h-5 text-text-main/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium truncate ${
                            isDone ? 'text-text-main' : isActive ? 'text-light-blue' : 'text-text-main/50'
                          }`}
                        >
                          {s.title}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono ${
                          isDone ? 'text-success' : isActive ? 'text-light-blue' : 'text-text-main/30'
                        }`}
                      >
                        {isDone ? '✓' : isActive ? '...' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Success message */}
          <AnimatePresence>
            {status === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 relative"
              >
                <div className="glass rounded-16 p-6 md:p-8 text-center border-success/30 bg-success/[0.05]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="mx-auto w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Your automation would be complete!</h3>
                  <p className="text-text-main/60 mb-6">
                    Book a real consultation to experience this live.
                  </p>
                  <a
                    href={N8N_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-16 bg-primary text-white font-semibold glow-primary hover:glow-primary-hover transition-all duration-300 hover:-translate-y-1 animate-pulse-glow"
                  >
                    <Zap className="w-5 h-5" />
                    Book Free Consultation
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
