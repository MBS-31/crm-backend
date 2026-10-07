# AI-Native Customer Intelligence & Automation Platform
**logip Enterprise CRM — Frontend**

A modern enterprise-grade AI-native customer intelligence and automation platform built with React, Vite, Tailwind CSS, GSAP, and Zustand.

---

## 🚀 Key Platform Features

### 1. Executive Command Center & Briefing
- **Morning Executive Briefing**: Daily revenue pacing (+12%), quota pacing, at-risk deals, and high-value lead tracking with 1-click execution actions.
- **Opportunity Radar**: Multi-dimensional radar view across Hot Leads, At-Risk Deals, Upsell Opportunities, Churn Alerts, and Overdue Follow-ups.
- **Original Dashboard Core**: Preserves full Stats Row, Sales Performance charts, Task lists, User profile, and Real-time Activity Feeds.

### 2. Contextual AI Customer Copilot
- Context-aware slide-over assistant answering deep customer inquiries (*"Tell me everything important about Rahul before I call him"*).
- Generates instant dossiers, sentiment trajectory, talking points, objection handling strategies, and one-click CRM updates.

### 3. Customer 360° Intelligence Workspace
- **Vital Health Scores**: Relationship health, churn probability, NPS sentiment, and adoption metrics.
- **Interactive Entity Relationship Graph**: Dynamic visual relationship map connecting `Company → People → Deals → Communications → Documents`.
- **Next-Best-Action**: Prescriptive recommendations powered by intelligence scoring.

### 4. Predictive Lead & Deal Intelligence
- 0–100 ML lead scoring with HOT/WARM/COLD status tiers.
- AI Explainability factor weights: Company Fit, Engagement Velocity, Budget Authority, and Inbound Intent.

### 5. Unified Communications Suite & Softphone
- **Omni-Channel Inbox**: Seamless conversation threads across WhatsApp Cloud API, Email, WebRTC Calls, and SMS.
- **WebRTC Softphone**: In-app dialer with call recording and live duration timer.
- **Call Intelligence**: MinIO `.wav` audio player with synchronized waveform, talk-to-listen ratios, silence detection, and action item checklists.

### 6. Autonomous AI Agent Engine
- Natural language task execution (*"Find all high-value leads uncontacted for 3 days and create follow-ups"*).
- Pre-execution dry-run plan generation with explicit human approval gates before dispatch.

### 7. Visual Workflow Automation Canvas
- Drag/click node workflow canvas (`Trigger → Condition → AI Decision → Action → Notification`).
- Real-time simulation engine with step-by-step audit logs.

### 8. AI Sales Coach & Diagnostics
- Individual sales rep diagnostic scorecards (talk-to-listen ratio, objection resolution rate, deal cycle velocity).
- Personalized AI training recommendations and micro-learning modules.

### 9. What-If Sales & Revenue Simulator
- Monte Carlo revenue forecasting sliders (Conversion Rate, Average Enterprise Deal Size, Inbound Lead Volume).
- Real-time recalculation of projected ARR, win rates, and quarterly sales impact.

### 10. Enterprise Security & Infrastructure
- **5-Tier RBAC**: Super Admin, Sales Ops, Manager, Account Exec, and Read-Only.
- **Multi-Tenant Organization Switcher**: Instant switching between global enterprise orgs.
- **Docker & MinIO Health Monitor**: Live container status for PostgreSQL, MinIO S3 Object Storage, and Redis.
- **Global Semantic Search**: `Ctrl + K` instant search dialog.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React + Custom Enterprise SVGs
- **State Management**: Zustand
- **Animations**: GSAP
- **Storage / Media**: MinIO S3 Audio Compatibility

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git

# Navigate into directory
cd CRM-ROBLEM-SOLVE

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build
```bash
# Build production bundle
npm run build

# Preview build
npm run preview
```

