import {
  FileText,
  Hash,
  Database,
  MessageSquare,
  Calendar,
  Mic,
  HardDrive,
  Share2,
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
  { n: 6, icon: Mic, title: 'ElevenLabs AI Voice', desc: 'Professional voice confirmation generated', color: '#A78BFA' },
  { n: 7, icon: HardDrive, title: 'Google Drive', desc: 'Voice recording uploaded and stored', color: '#FBBF24' },
  { n: 8, icon: Share2, title: 'Share Recording', desc: 'Recording link shared with the customer', color: '#34D399' },
  { n: 9, icon: Mail, title: 'HTML Email', desc: 'Beautiful confirmation email sent automatically', color: '#EF4444' },
  { n: 10, icon: Slack, title: 'Slack Notification', desc: 'Team alerted in real time', color: '#F8FAFC' },
  { n: 11, icon: Bell, title: 'Admin Email', desc: 'Internal notification sent to admin', color: '#F97316' },
  { n: 12, icon: CheckCircle2, title: 'Done', desc: 'Full automation complete in under 60 seconds', color: '#22C55E' },
];
