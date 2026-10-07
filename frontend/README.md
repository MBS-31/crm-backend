# 🚀 logip — AI-Native Customer Intelligence & Automation Platform

[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5.0-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![GSAP](https://img.shields.io/badge/Animations-GSAP_3.15-green?style=flat-square&logo=greensock)](https://greensock.com/)
[![Docker](https://img.shields.io/badge/Infra-Docker_Stack-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![MinIO](https://img.shields.io/badge/Storage-MinIO_S3-C72C48?style=flat-square&logo=minio)](https://min.io/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

> **logip** is an enterprise-grade **AI-Native Customer Intelligence and Autonomous Automation Platform**. Designed to supersede traditional legacy CRM databases, logip acts as an active AI copilot and autonomous intelligence layer that drives deal velocity, predicts customer churn, unifies multi-channel communications, automates complex workflows, and coaches sales reps in real time.

---

## 📑 Table of Contents

- [1. Executive Summary & Vision](#1-executive-summary--vision)
- [2. Platform Architecture & Data Flow](#2-platform-architecture--data-flow)
- [3. Complete Feature Deep-Dive](#3-complete-feature-deep-dive)
  - [3.1 Executive Command Center & AI Briefing](#31-executive-command-center--ai-briefing)
  - [3.2 Interactive Opportunity Radar](#32-interactive-opportunity-radar)
  - [3.3 Context-Aware AI Customer Copilot](#33-context-aware-ai-customer-copilot)
  - [3.4 Customer 360° Workspace & Relationship Graph](#34-customer-360-workspace--relationship-graph)
  - [3.5 Predictive ML Lead & Deal Intelligence](#35-predictive-ml-lead--deal-intelligence)
  - [3.6 Unified Omni-Channel Inbox](#36-unified-omni-channel-inbox)
  - [3.7 WebRTC VoIP Softphone & Call Intelligence](#37-webrtc-voip-softphone--call-intelligence)
  - [3.8 Autonomous AI Agent Engine](#38-autonomous-ai-agent-engine)
  - [3.9 Visual Workflow Automation Canvas](#39-visual-workflow-automation-canvas)
  - [3.10 AI Sales Coach & Diagnostics](#310-ai-sales-coach--diagnostics)
  - [3.11 What-If Sales & Revenue Simulator](#311-what-if-sales--revenue-simulator)
  - [3.12 Enterprise Security, Multi-Tenancy & 5-Tier RBAC](#312-enterprise-security-multi-tenancy--5-tier-rbac)
  - [3.13 Global Semantic Search (Ctrl + K)](#313-global-semantic-search-ctrl--k)
  - [3.14 Docker & MinIO Infrastructure Status](#314-docker--minio-infrastructure-status)
- [4. Project Structure & Codebase Inventory](#4-project-structure--codebase-inventory)
- [5. Component Breakdown](#5-component-breakdown)
- [6. State Management Architecture](#6-state-management-architecture)
- [7. Mock Data & Entity Models](#7-mock-data--entity-models)
- [8. Installation & Local Development](#8-installation--local-development)
- [9. Production Build & Deployment](#9-production-build--deployment)
- [10. Backend & Infrastructure Integration](#10-backend--infrastructure-integration)

---

## 1. Executive Summary & Vision

Traditional legacy CRMs (e.g. Salesforce, HubSpot) operate primarily as passive data repositories that require tedious manual data entry. Sales reps spend up to 65% of their working hours logging emails, transcribing calls, and updating pipeline stages.

**logip transforms CRM into an autonomous, proactive intelligence operating system:**

| Legacy CRM Pain Points | The logip AI-Native Solution |
| :--- | :--- |
| **Manual Data Entry**: Reps manually log notes, emails, and updates. | **Autonomous AI Agents**: Natural language tool calling records interactions automatically. |
| **Static Dashboards**: Rows of numbers without prescriptive actions. | **Opportunity Radar & Next-Best-Action**: Proactive alerts on at-risk deals and hot prospects. |
| **Disjointed Channels**: Separate tabs for WhatsApp, Email, Phone, and SMS. | **Unified Communications Suite**: Single omnichannel inbox with AI-suggested responses. |
| **Unexplainable Lead Scores**: Generic point scoring without context. | **Explainable AI Scoring**: Transparent weight breakdown (Fit, Budget, Velocity, Intent). |
| **Unrecorded Call Insights**: Voice calls left unanalyzed. | **Call Intelligence & MinIO Player**: Talk-to-listen ratios, silence detection, and action checklists. |
| **Static Forecasting**: Rigid spreadsheets prone to estimation errors. | **What-If Monte Carlo Simulator**: Dynamic sliders modeling conversion rate & deal size impacts. |

---

## 2. Platform Architecture & Data Flow

```
                                 ┌───────────────────────────────────────────────┐
                                 │            logip Enterprise UI Layer          │
                                 │          (React 19 + Tailwind v4 + GSAP)      │
                                 └───────────────────────┬───────────────────────┘
                                                         │
                                        ┌────────────────┴───────────────┐
                                        ▼                                ▼
                        ┌──────────────────────────────┐ ┌──────────────────────────────┐
                        │      Zustand Store Engine    │ │    Global Navigation / Modals│
                        │    (src/store/useCrmStore)   │ │ (Search, Dialer, Benchmarks) │
                        └──────────────┬───────────────┘ └──────────────┬───────────────┘
                                       │                                │
        ┌──────────────────────────────┼────────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                                ▼                              ▼
┌───────────────┐             ┌─────────────────┐             ┌──────────────────┐           ┌──────────────────┐
│  Command Core │             │ AI Intelligence │             │  Omni-Channel    │           │ Automation & Ops │
├───────────────┤             ├─────────────────┤             ├──────────────────┤           ├──────────────────┤
│• Executive    │             │• AI Copilot     │             │• Unified Inbox   │           │• Visual Workflow │
│  Briefing     │             │  (Slide-over)   │             │  (WhatsApp/Email)│           │  Builder         │
│• Stats Row    │             │• Customer 360°  │             │• WebRTC Dialer   │           │• Autonomous Agent│
│• Performance  │             │• Lead Scoring   │             │• MinIO Audio     │           │• RBAC Manager    │
│  Chart        │             │• Sales Coach    │             │  Player (.wav)   │           │• Docker Stack    │
│• Tasks / Feed │             │• What-If Sim    │             │• Call Intel      │           │  Health Monitor  │
└───────────────┘             └─────────────────┘             └──────────────────┘           └──────────────────┘
```

---

## 3. Complete Feature Deep-Dive

### 3.1 Executive Command Center & AI Briefing
- **Location**: [`src/components/AiExecutiveBrief.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AiExecutiveBrief.jsx)
- **Features**:
  - Daily Morning AI Brief summarizing company-wide sales health.
  - Metrics tracking: Revenue Pacing (**+12% vs Target**), Quota Pacing (**78% of Q3 Target**), **4 At-Risk Deals**, and **7 High-Value Leads Requiring Action**.
  - One-click trigger buttons: *"Auto-Email Stalled Deals"*, *"Dispatch Follow-ups"*, and *"Schedule Review"*.
  - Seamlessly integrates with original widgets: [`StatsRow.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/StatsRow.jsx), [`PerformanceChart.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/PerformanceChart.jsx), [`CurrentTasks.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/CurrentTasks.jsx), [`ProfileCard.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/ProfileCard.jsx), and [`ActivityFeed.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/ActivityFeed.jsx).

### 3.2 Interactive Opportunity Radar
- **Location**: [`src/components/OpportunityRadar.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/OpportunityRadar.jsx)
- **Features**:
  - Visual 5-zone radar display tracking critical revenue inflection points:
    1. **Hot Leads (12)**: Ready for closing touchpoint.
    2. **At-Risk Deals (7)**: Experiencing engagement stall or budget pushback.
    3. **Upsell Opportunities (18)**: High product adoption candidates.
    4. **Churn Signals (5)**: Drop in usage or negative sentiment detected.
    5. **Overdue Follow-ups (23)**: SLA breaches needing rep intervention.
  - Click-through interactivity that filters and deep-links directly into specific customer dossiers.

### 3.3 Context-Aware AI Customer Copilot
- **Location**: [`src/components/AiCopilotPanel.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AiCopilotPanel.jsx)
- **Features**:
  - Contextual slide-over drawer accessible via the top navbar, floating launcher, or keyboard shortcuts.
  - Real-time streaming conversational assistant with simulated token delivery.
  - One-click quick prompts:
    - *"Tell me everything important about Rahul before I call him"*
    - *"Draft an urgent follow-up for Acme Corp deal"*
    - *"Why is CyberNetics flagged as churn risk?"*
  - Structured output rendering: Executive summary, Sentiment Trajectory, Next-Best Action, Key Talking Points, and 1-Click action dispatchers.

### 3.4 Customer 360° Workspace & Relationship Graph
- **Location**: [`src/components/Customer360View.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/Customer360View.jsx)
- **Features**:
  - Comprehensive customer dossier for enterprise accounts (e.g., **Rahul Sharma - Apex Global Systems**, **Sarah Jenkins - CloudFlow**, **David Vance - CyberNetics**).
  - **Vital Health Scores**:
    - Relationship Health Index (`94/100`)
    - Churn Probability (`6% - LOW`)
    - Account NPS (`+72`)
    - Feature Adoption Index (`88%`)
  - **Entity Relationship Graph**: Interactive visual relationship tree connecting:
    $$\text{Apex Global Systems} \longrightarrow \text{Key Stakeholders} \longrightarrow \text{Open Deals (\$120K)} \longrightarrow \text{Omni-Comms} \longrightarrow \text{MinIO Contracts}$$
  - Prescriptive **Next-Best-Action** card with direct execution button (*"Send Enterprise MSA & Pricing Proposal"*).

### 3.5 Predictive ML Lead & Deal Intelligence
- **Location**: [`src/components/LeadIntelligenceView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/LeadIntelligenceView.jsx), [`src/components/DealsPipelineView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/DealsPipelineView.jsx)
- **Features**:
  - Predictive ML lead score engine ranging from 0 to 100.
  - Automatic tier grouping: **HOT (80-100)**, **WARM (50-79)**, and **COLD (0-49)**.
  - Full **AI Explainability Factor Weights**:
    - Company Size & ICP Fit ($35\%$)
    - Inbound Engagement Velocity ($30\%$)
    - Decision Maker Authority ($20\%$)
    - Intent Data & Tech Stack Signals ($15\%$)
  - Visual Kanban pipeline stages: Discovery, Proposal Sent, Negotiation, Closed Won.

### 3.6 Unified Omni-Channel Inbox
- **Location**: [`src/components/UnifiedInboxView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/UnifiedInboxView.jsx), [`src/components/OmniChannelHub.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/OmniChannelHub.jsx)
- **Features**:
  - Unified message stream aggregating **WhatsApp Cloud API**, **Corporate Email**, **WebRTC Voice Notes**, and **SMS**.
  - Real-time conversation thread switcher with live sentiment badges.
  - AI-Suggested Quick Reply generator tailored to conversation context with 1-click insert.

### 3.7 WebRTC VoIP Softphone & Call Intelligence
- **Location**: [`src/components/CallIntelligenceView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/CallIntelligenceView.jsx), [`src/components/WebRtcDialerModal.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/WebRtcDialerModal.jsx)
- **Features**:
  - In-app softphone dialer modal with DTMF keypad, mute, transfer, and call timer.
  - **MinIO S3 Audio Player**: Integrated waveform audio visualizer playing `.wav` recordings from object storage (`s3://crm-calls/...`).
  - **Speech Diagnostics**:
    - Talk-to-Listen Ratio (e.g., Rep: 42%, Prospect: 58%)
    - Long Silence Detection (2 instances)
    - Sentiment Trajectory: Neutral $\rightarrow$ Highly Positive
    - Key Discussion Topics & Extracted Action Item Checklists.

### 3.8 Autonomous AI Agent Engine
- **Location**: [`src/components/AutonomousAiAgentView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AutonomousAiAgentView.jsx)
- **Features**:
  - Natural language task execution prompt:
    *"Find all high-value leads uncontacted for 3 days, draft personalized follow-ups referencing their tech stack, and queue for review."*
  - **Safety Approval Gate**: Generates a 4-step dry-run execution plan with exact SQL queries and tool payloads for human review before execution.
  - Live progress terminal showing real-time agent dispatch and execution status.

### 3.9 Visual Workflow Automation Canvas
- **Location**: [`src/components/VisualWorkflowBuilder.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/VisualWorkflowBuilder.jsx)
- **Features**:
  - Node-based DAG automation builder:
    $$\text{Trigger} \longrightarrow \text{Condition} \longrightarrow \text{AI Decision} \longrightarrow \text{Action} \longrightarrow \text{Notification}$$
  - Drag-and-click node palette with visual connectors and status indicators.
  - Built-in **Workflow Simulation Engine**: Test workflows against live sample records and inspect step-by-step audit logs.

### 3.10 AI Sales Coach & Diagnostics
- **Location**: [`src/components/SalesCoachView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/SalesCoachView.jsx)
- **Features**:
  - Rep diagnostic scorecard tracking:
    - **Abhi**: 118% Quota Pacing, 42% Talk Ratio, Master at Objection Handling.
    - **Megan**: 92% Quota Pacing, 54% Talk Ratio, Recommended for Discovery Skills Training.
    - **Guy**: 78% Quota Pacing, 62% Talk Ratio, High Pitch Velocity with Coaching Plan.
  - Personalized AI training recommendations and micro-learning modules.

### 3.11 What-If Sales & Revenue Simulator
- **Location**: [`src/components/WhatIfSimulatorView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/WhatIfSimulatorView.jsx)
- **Features**:
  - Interactive Monte Carlo revenue forecasting engine.
  - Dynamic adjustment sliders:
    - **Lead-to-Opportunity Conversion Rate** (e.g., $18\% \rightarrow 24\%$)
    - **Average Enterprise Deal Size** (e.g., $\$45\text{K} \rightarrow \$65\text{K}$)
    - **Inbound Lead Volume** (e.g., $320 \rightarrow 480$ / month)
  - Real-time recalculation of projected ARR delta ($+\$420,000$), win rate improvements, and quota attainment probability.

### 3.12 Enterprise Security, Multi-Tenancy & 5-Tier RBAC
- **Location**: [`src/components/TopNavbar.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/TopNavbar.jsx), [`src/components/RbacManager.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/RbacManager.jsx)
- **Features**:
  - **Multi-Tenant Org Switcher**: Switch between *Acme Global Corp*, *Starlight Technologies*, and *Nexus Ventures*.
  - **5-Tier Role-Based Access Control**:
    1. `Super Admin`: Unrestricted platform access and infrastructure control.
    2. `Sales Ops`: Workflow management, scoring model configuration, audit review.
    3. `Manager`: Pipeline oversight, coaching scorecards, team assignment.
    4. `Executive`: Deal pipeline view, softphone, AI copilot, customer 360.
    5. `Read-Only`: Restricted view-only access without edit permissions.
  - Role switcher dropdown in top navigation for immediate testing of role permissions.

### 3.13 Global Semantic Search (`Ctrl + K`)
- **Location**: [`src/components/GlobalSearchModal.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/GlobalSearchModal.jsx)
- **Features**:
  - Universal keyboard shortcut (`Ctrl + K` or `Cmd + K`) trigger.
  - Instant fuzzy search across Customers, Contacts, Open Deals, Call Recordings, and Workflows.
  - Quick action keyboard navigation (`Up`, `Down`, `Enter`, `Escape`).

### 3.14 Docker & MinIO Infrastructure Status
- **Location**: [`src/components/DockerInfraStatus.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/DockerInfraStatus.jsx)
- **Features**:
  - Real-time container health widget in the top navigation.
  - Diagnostic drawer displaying:
    - **PostgreSQL 16**: Port 5432, Connection Pool (18/50 active), 99.98% Uptime.
    - **MinIO Object Storage**: Port 9000/9001, Bucket `crm-audio-recordings` (14.2 GB used).
    - **Redis 7**: Port 6379, Cache Hit Rate (94.2%), Memory (128 MB).

---

## 4. Project Structure & Codebase Inventory

```
frontend CRM/
├── .oxlintrc.json                 # Oxlint configuration for React hooks & exports
├── .gitignore                     # Git ignore rules (node_modules, dist, .env)
├── BACKEND_README.md              # Complete backend specification (Prisma, APIs, Docker)
├── README.md                      # Master platform documentation (This file)
├── index.html                     # HTML5 root with Plus Jakarta Sans typography
├── package.json                   # Project metadata and dependencies
├── vite.config.js                 # Vite bundler configuration with Tailwind CSS v4
├── public/
│   ├── favicon.svg                # logip brand favicon
│   └── icons.svg                  # SVG sprite sheet
└── src/
    ├── main.jsx                   # React root entry point
    ├── index.css                  # Tailwind CSS v4 import & custom design tokens
    ├── App.jsx                    # Root view router & layout coordinator
    ├── App.css                    # Component animations & micro-interactions
    ├── assets/
    │   ├── hero.png               # Brand imagery
    │   └── vite.svg               # Vite asset
    ├── store/
    │   └── useCrmStore.js         # Zustand central state store
    ├── data/
    │   └── mockCrmData.js         # Enterprise dataset (Customers, Deals, Leads, Reps)
    └── components/
        ├── ActivityFeed.jsx       # Real-time multi-agent activity stream
        ├── AiCopilotPanel.jsx     # Slide-over context-aware AI assistant
        ├── AiExecutiveBrief.jsx   # Morning executive sales health briefing
        ├── AutonomousAiAgentView.jsx # Natural language autonomous task engine
        ├── CallIntelligenceView.jsx  # MinIO audio player, waveform & transcript
        ├── CrmBenchmarkModal.jsx  # Platform benchmark diagnostic modal
        ├── CurrentTasks.jsx       # Daily sales rep task checklists
        ├── Customer360View.jsx    # Complete customer workspace & entity graph
        ├── DealsPipelineView.jsx  # Visual Kanban deals pipeline
        ├── DockerInfraStatus.jsx  # Docker & MinIO container health drawer
        ├── GlobalSearchModal.jsx  # Ctrl + K universal search modal
        ├── Icons.jsx              # Vector SVG icons (Logip, Docker, MinIO, WhatsApp)
        ├── LeadIntelligenceView.jsx # ML predictive lead scoring & explainability
        ├── OmniChannelHub.jsx     # Full-screen communications command center
        ├── OpportunityRadar.jsx   # Interactive 5-zone revenue radar screen
        ├── PerformanceChart.jsx   # Revenue performance & pacing chart
        ├── ProfileCard.jsx        # User profile, quota progress & avatar
        ├── RbacManager.jsx        # 5-Tier role-based access control manager
        ├── SalesCoachView.jsx     # Rep diagnostic scorecards & AI coaching
        ├── Sidebar.jsx            # Grouped enterprise navigation sidebar
        ├── StatsRow.jsx           # Core revenue, conversion & lead metric cards
        ├── TopNavbar.jsx          # Top navigation with Org switcher, RBAC, Search
        ├── UnifiedInboxView.jsx   # WhatsApp, Email, Call & SMS inbox
        ├── VisualWorkflowBuilder.jsx # Node-based automation canvas & simulation
        ├── WebRtcDialerModal.jsx  # In-app WebRTC softphone dialer modal
        └── WhatIfSimulatorView.jsx # Monte Carlo revenue forecast simulator
```

---

## 5. Component Breakdown

| Component | Category | Purpose |
| :--- | :--- | :--- |
| [`TopNavbar.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/TopNavbar.jsx) | Navigation | Multi-tenant org switcher, Docker status, Search trigger, Demo toggle, RBAC selector, Copilot launcher. |
| [`Sidebar.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/Sidebar.jsx) | Navigation | Grouped sidebar (Command Center, CRM Core, AI Intelligence, Communication, Automation, Admin). |
| [`AiExecutiveBrief.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AiExecutiveBrief.jsx) | Executive | Daily morning briefing with pacing metrics and 1-click bulk automations. |
| [`OpportunityRadar.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/OpportunityRadar.jsx) | Executive | Radar visualization for hot leads, at-risk deals, upsells, churn alerts, and overdue follow-ups. |
| [`AiCopilotPanel.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AiCopilotPanel.jsx) | AI Copilot | Slide-over conversational copilot with streaming tokens, customer dossiers, and quick action buttons. |
| [`Customer360View.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/Customer360View.jsx) | CRM Core | Full customer workspace with Vital Scores, next-best-action, and dynamic Entity Relationship Graph. |
| [`LeadIntelligenceView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/LeadIntelligenceView.jsx) | CRM Core | Predictive 0–100 ML scoring, HOT/WARM/COLD tiers, and explainability factor breakdown. |
| [`DealsPipelineView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/DealsPipelineView.jsx) | CRM Core | Kanban deal stages (Discovery, Proposal, Negotiation, Won) with risk indicators. |
| [`UnifiedInboxView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/UnifiedInboxView.jsx) | Communications | WhatsApp Cloud API, Email, Call, and SMS conversations with AI suggested replies. |
| [`CallIntelligenceView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/CallIntelligenceView.jsx) | Communications | MinIO `.wav` audio player with interactive waveform, talk/listen ratio, transcripts, and checklist. |
| [`WebRtcDialerModal.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/WebRtcDialerModal.jsx) | Communications | Softphone modal with DTMF keypad, live timer, and call recording indicators. |
| [`AutonomousAiAgentView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/AutonomousAiAgentView.jsx) | AI Automation | Natural language command parser, dry-run execution plan generator, and approval gate. |
| [`VisualWorkflowBuilder.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/VisualWorkflowBuilder.jsx) | AI Automation | Drag/click node canvas (`Trigger → Condition → AI Decision → Action`) and simulation runner. |
| [`SalesCoachView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/SalesCoachView.jsx) | AI Coaching | Sales rep diagnostic cards (talk ratios, objection handling) and personalized coaching plans. |
| [`WhatIfSimulatorView.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/WhatIfSimulatorView.jsx) | Forecasting | Monte Carlo simulation sliders recalculating revenue impact in real time. |
| [`RbacManager.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/RbacManager.jsx) | Administration | 5-Tier RBAC permission matrix and user assignment manager. |
| [`DockerInfraStatus.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/DockerInfraStatus.jsx) | Administration | Live container health status for PostgreSQL, Redis, and MinIO storage. |
| [`GlobalSearchModal.jsx`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/components/GlobalSearchModal.jsx) | Productivity | `Ctrl + K` global semantic search dialog across all platform entities. |

---

## 6. State Management Architecture

State is managed centrally using **Zustand** in [`src/store/useCrmStore.js`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/store/useCrmStore.js):

```javascript
// Key State Slices in useCrmStore:
activeTab: 'dashboard'             // Current view: dashboard, customer360, leads, inbox, agent, workflows, etc.
currentCustomer: mockCustomer      // Active customer context (e.g., Rahul Sharma)
currentLead: mockLead              // Active lead context for scoring views
userRole: 'super_admin'            // Active RBAC role (super_admin, sales_ops, manager, executive, readonly)
currentOrg: 'Acme Global Corp'     // Active multi-tenant organization
isDemoMode: true                   // Toggles mock simulations vs production API calls
isCopilotOpen: false               // Controls AI Copilot slide-over visibility
isDialerOpen: false                // Controls WebRtc Softphone modal visibility
isSearchOpen: false                // Controls Ctrl + K Global Search modal
isInfraOpen: false                 // Controls Docker stack drawer visibility
copilotMessages: [...]             // Chat history array with streaming support
```

---

## 7. Mock Data & Entity Models

The platform includes a realistic enterprise mock dataset in [`src/data/mockCrmData.js`](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/src/data/mockCrmData.js):

- **Customer 360 Profiles**:
  - `Rahul Sharma` — VP of Technology at Apex Global Systems ($120K ARR, 94 Health, 6% Churn Risk).
  - `Sarah Jenkins` — Head of Operations at CloudFlow Technologies ($85K ARR, 78 Health, 15% Churn Risk).
  - `David Vance` — CTO at CyberNetics ($210K ARR, 48 Health, 64% Churn Risk).
- **Lead Intelligence Pool**: 8 enterprise leads with explainability factor breakdown weights.
- **Opportunity Radar Pool**: 60+ categorized accounts across Hot, At-Risk, Upsell, Churn, and Overdue.
- **Sales Rep Performance Diagnostics**: Abhi (118%), Megan (92%), and Guy (78%).
- **Audit Logs**: Immutable activity trails tracking system and agent executions.

---

## 8. Installation & Local Development

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9+) or **yarn**

### Quickstart Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git
   cd CRM-ROBLEM-SOLVE
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 9. Production Build & Deployment

### Build Command
Compile the optimized production bundle with Vite:
```bash
npm run build
```

### Preview Command
Locally preview the generated production build in `dist/`:
```bash
npm run preview
```

### Linting
Run Oxlint to check code quality and React hook rules:
```bash
npm run lint
```

---

## 10. Backend & Infrastructure Integration

The frontend is built to pair seamlessly with a production Docker container stack and API service. A complete backend blueprint is available in [BACKEND_README.md](file:///c:/Users/kandd/OneDrive/Desktop/frontend%20CRM/BACKEND_README.md).

### Docker Stack Quickstart
```bash
# Spin up PostgreSQL, Redis, and MinIO S3 Object Storage
docker-compose up -d
```

### Infrastructure Endpoints:
- **API Server**: `http://localhost:5000/api/v1`
- **PostgreSQL 16**: `localhost:5432` (`crm_enterprise`)
- **Redis 7**: `localhost:6379`
- **MinIO S3 Console**: `http://localhost:9001` (Admin: `minio_admin` / `minio_secure_password_2026`)
- **MinIO S3 API**: `http://localhost:9000` (`crm-audio-recordings` bucket)

---

## 📄 License & Credits

Developed for enterprise customer intelligence operations. Released under the [MIT License](LICENSE).
