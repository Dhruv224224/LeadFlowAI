import {
  FileText,
  Hash,
  Database,
  MessageSquare,
  Calendar,
  Mail,
  Slack,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export type WorkflowStep = {
  n: number;
  icon: typeof FileText;
  title: string;
  desc: string;
  color: string;
};

export const workflowSteps: WorkflowStep[] = [
  { n: 1, icon: FileText, title: 'Customer submits consultation form', desc: 'Visitor fills the n8n form trigger', color: '#60A5FA' },
  { n: 2, icon: Hash, title: 'Generate Reference ID', desc: 'Unique ID instantly created for tracking', color: '#A78BFA' },
  { n: 3, icon: Database, title: 'HubSpot CRM', desc: 'Contact automatically created and tagged', color: '#FF7A59' },
  { n: 4, icon: MessageSquare, title: 'WhatsApp Message', desc: 'Personalized confirmation sent via Twilio', color: '#22C55E' },
  { n: 5, icon: Calendar, title: 'Google Calendar', desc: 'Meeting scheduled and invite sent', color: '#60A5FA' },
  { n: 6, icon: Mail, title: 'HTML Email', desc: 'Beautiful confirmation email sent automatically', color: '#EF4444' },
  { n: 7, icon: Slack, title: 'Slack Notification', desc: 'Team alerted in real time', color: '#F8FAFC' },
  { n: 8, icon: Bell, title: 'Admin Email', desc: 'Internal notification sent to admin', color: '#F97316' },
  { n: 9, icon: CheckCircle2, title: 'Done', desc: 'Full automation complete in under 60 seconds', color: '#22C55E' },
];
