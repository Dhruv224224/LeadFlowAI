# 🚀 LeadFlow AI — AI-Powered Business Automation Platform

<div align="center">

![LeadFlow AI Banner](https://img.shields.io/badge/LeadFlow%20AI-Business%20Automation-2563EB?style=for-the-badge&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lead--flow--ai--azure.vercel.app-22C55E?style=for-the-badge&logo=vercel&logoColor=white)](https://lead-flow-ai-azure.vercel.app)
[![Consultation Form](https://img.shields.io/badge/Book%20Consultation-Live%20Form-F97316?style=for-the-badge&logo=n8n&logoColor=white)](https://dhruv224.app.n8n.cloud/form/lead-enquiry)
[![Built with N8N](https://img.shields.io/badge/Powered%20by-N8N-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**One form submission. 9 automated actions. Under 60 seconds.**

[🌐 Live Website](https://lead-flow-ai-azure.vercel.app) · [📋 Book Consultation](https://dhruv224.app.n8n.cloud/form/lead-enquiry) · [🐛 Report Bug](https://github.com/Dhruv224224/LeadFlowAI/issues)

</div>

---

## 📖 About The Project

**LeadFlow AI** is a complete AI-powered business automation system built with N8N. The moment a lead fills a consultation form, 9 automated actions fire instantly — CRM registration, WhatsApp confirmation, calendar scheduling, email delivery, and real-time admin notifications.

Zero manual work. Fully automated end to end.

> 💡 *"Stop chasing leads manually. Let AI handle every touchpoint the moment someone shows interest."*

---

## ⚡ The Automation Workflow

A single form submission triggers this complete sequence in under 60 seconds:

```
Lead fills consultation form
         ↓
Generate unique Reference ID (LF-XXXXXXXXXX)
         ↓
Register contact in HubSpot CRM (lifecycle: Lead)
         ↓
Send personalized WhatsApp message via Twilio
         ↓
Schedule Google Calendar meeting + send invite
         ↓
Send professional HTML confirmation email
         ↓
Send Slack notification to admin channel
         ↓
Send admin summary email with full workflow status
         ↓
✅ Complete — 9 actions in under 60 seconds
```

---

## ✨ Features

### 🤖 Core Automation (N8N Workflow)
- **Unique Reference ID** — Every lead gets a traceable ID (LF-timestamp format)
- **HubSpot CRM** — Contact auto-created with lifecycle stage, phone, email, and service tag
- **WhatsApp Automation** — Personalized message via Twilio with lead's name and service
- **Google Calendar** — Meeting scheduled 24 hours out with invite sent to lead's email
- **HTML Email** — Beautiful confirmation email with Reference ID and full meeting details
- **Slack Notifications** — Real-time admin alerts with full lead details
- **Admin Email** — Complete workflow status report after every successful lead

### 🛡️ Error Handling
- Every workflow node has dedicated error handling
- If any step fails → Slack alert fires immediately
- Admin notified of exactly which step failed with lead details
- Zero silent failures

### 🌐 Landing Page
- Premium dark/light mode SaaS UI
- Interactive workflow visualization
- Live activity toast notifications
- Fully mobile responsive
- Smooth Framer Motion animations

---

## ⭐ Premium Features (Optional Add-ons)

> These features are available as optional upgrades and were demonstrated in the demo version of LeadFlow AI. They can be enabled by connecting the respective third-party APIs.

| Feature | Tool Required | Description |
|---------|--------------|-------------|
| 🎙️ AI Voice Confirmation | ElevenLabs API | Generates a personalized human-sounding voice message for each lead |
| ☁️ Cloud Voice Storage | Google Drive API | Automatically uploads and stores the voice recording |
| 🔗 Voice Share | Google Drive Share | Shares the recording link with the lead via email |

> **Note:** These premium features require paid API credits (ElevenLabs) and are not included in the default workflow. The core automation works fully without them.

---

## 🛠️ Tech Stack

### Automation & Integrations
| Tool | Purpose |
|------|---------|
| **N8N** | Workflow automation engine |
| **HubSpot** | CRM — contact management |
| **Twilio** | WhatsApp Business API |
| **Google Calendar** | Meeting scheduling |
| **Gmail** | HTML email delivery |
| **Slack** | Admin notifications |

### Frontend (Landing Page)
| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Vite** | Build tool |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Vercel** | Deployment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- N8N account (cloud or self-hosted)
- HubSpot free account
- Twilio account with WhatsApp sandbox
- Google account (Calendar + Gmail)
- Slack workspace

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Dhruv224224/LeadFlowAI.git
cd LeadFlowAI
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the N8N form URL**
```bash
# Open src/config.ts and update:
export const N8N_FORM_URL = "https://your-n8n-instance.app.n8n.cloud/form/your-form-id";
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open** [http://localhost:5173](http://localhost:5173)

### N8N Workflow Setup

1. Import the workflow JSON from `/workflow/leadflow-ai-workflow.json`
2. Connect all credentials:
   - HubSpot API key
   - Twilio Account SID + Auth Token
   - Google OAuth (Calendar + Gmail)
   - Slack Bot Token
3. Activate the workflow
4. Copy the Form Trigger URL and paste it into `src/config.ts`

> **Want premium features?** To enable AI Voice Confirmation, additionally connect ElevenLabs API key and Google Drive OAuth in your N8N credentials.

---

## 📁 Project Structure

```
LeadFlowAI/
├── src/
│   ├── components/               # React components
│   │   ├── Navbar.tsx            # Sticky navigation with dark/light toggle
│   │   ├── Hero.tsx              # Hero section with animated dashboard
│   │   ├── WorkflowSection.tsx   # Animated workflow visualization
│   │   ├── TryWorkflow.tsx       # Interactive workflow demo
│   │   ├── Services.tsx          # Services cards
│   │   ├── HowItWorks.tsx        # 4-step process section
│   │   ├── WhyLeadFlow.tsx       # Feature highlights
│   │   ├── Testimonials.tsx      # Testimonial cards
│   │   ├── FAQ.tsx               # Animated accordion FAQ
│   │   ├── Contact.tsx           # Contact section
│   │   ├── Footer.tsx            # Footer
│   │   ├── AIAssistant.tsx       # Aria — AI chatbot widget
│   │   ├── ToastNotifications.tsx# Live activity toasts
│   │   ├── CursorSpotlight.tsx   # Custom cursor effect
│   │   ├── ScrollProgress.tsx    # Scroll progress bar
│   │   ├── BackToTop.tsx         # Back to top button
│   │   ├── LoadingScreen.tsx     # Initial loading animation
│   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   ├── useTheme.ts           # Theme hook
│   │   └── anim.ts               # Framer Motion variants
│   ├── config.ts                 # N8N form URL configuration
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── tailwind.config.js            # Tailwind configuration
├── vite.config.ts                # Vite configuration
└── README.md
```

---

## 🎯 How It Works

1. **Visit the landing page** → explore the workflow visualization
2. **Click "Book Free Consultation"** → N8N form opens
3. **Fill your details** → Name, Email, Phone, Service Interested In
4. **Submit** → 9 automated actions fire instantly
5. **Check your phone** → WhatsApp message arrives in seconds
6. **Check your email** → HTML confirmation with meeting details
7. **Check your calendar** → Meeting invite already there

---

## 📸 Screenshots

### Landing Page — Dark Mode
> Premium dark SaaS UI with animated workflow visualization and particle background

### Landing Page — Light Mode
> Clean professional light mode with glassmorphism cards

### N8N Workflow
> 9-node automation workflow with error handling on every step

### WhatsApp Confirmation
> Personalized message delivered via Twilio immediately after form submission

### HTML Confirmation Email
> Beautiful email with Reference ID and full meeting details

### HubSpot CRM
> Contact automatically created with lead lifecycle stage

### Google Calendar
> Meeting scheduled with full lead details in the event description

### Slack Notification
> Real-time admin alert with complete workflow status

---

## 🌐 Live Demo

**Landing Page:** [https://lead-flow-ai-azure.vercel.app](https://lead-flow-ai-azure.vercel.app)

**Consultation Form (triggers live workflow):** [https://dhruv224.app.n8n.cloud/form/lead-enquiry](https://dhruv224.app.n8n.cloud/form/lead-enquiry)

---

## 👨‍💻 Author

**Dhruv Maheshwari**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/dhruvmaheshwari-cse)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/Dhruv224224)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat&logo=gmail)](mailto:dhruvmaheshwari18vk@gmail.com)

> B.Tech CSE Student | Amity University, Gwalior | AI/ML Developer | Automation Engineer

---

## 🙏 Acknowledgements

- [N8N](https://n8n.io) — Workflow automation engine
- [HubSpot](https://hubspot.com) — CRM platform
- [Twilio](https://twilio.com) — WhatsApp API
- [Vercel](https://vercel.com) — Deployment platform

---

<div align="center">

**Built by Dhruv Maheshwari**

⭐ Star this repo if it inspired you to build something!

</div>
