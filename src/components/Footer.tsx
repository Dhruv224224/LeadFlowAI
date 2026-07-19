import { Github, Linkedin, Mail, Zap } from 'lucide-react';
import { N8N_FORM_URL } from '../config';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14 safe-bottom">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <a href="#home" className="flex items-center gap-2 font-bold text-xl mb-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            LeadFlow <span className="text-light-blue">AI</span>
          </a>
          <p className="text-sm text-text-main/50">AI-Powered Automation — Built with n8n</p>
          <a
            href={N8N_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free consultation"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-12 bg-primary text-white text-sm font-semibold glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] min-h-[44px]"
          >
            <Zap className="w-4 h-4" />
            Book Free Consultation
          </a>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-text-main/80">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline text-sm text-text-main/55 hover:text-light-blue transition-colors min-h-[44px] flex items-center">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-text-main/80">Connect</h4>
          <div className="flex gap-3">
            <a
              href="https://github.com/Dhruv224224"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 rounded-12 glass flex items-center justify-center hover:bg-primary/20 hover:text-light-blue transition-all duration-200 min-h-[44px] min-w-[44px]"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/dhruvmaheshwari-cse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-12 glass flex items-center justify-center hover:bg-primary/20 hover:text-light-blue transition-all duration-200 min-h-[44px] min-w-[44px]"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:dhruvmaheshwari18vk@gmail.com"
              aria-label="Email"
              className="w-11 h-11 rounded-12 glass flex items-center justify-center hover:bg-primary/20 hover:text-light-blue transition-all duration-200 min-h-[44px] min-w-[44px]"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm text-text-main/40">
        © 2026 LeadFlow AI. Built by Dhruv Maheshwari
      </div>
    </footer>
  );
}
