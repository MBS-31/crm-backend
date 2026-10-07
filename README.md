# CRM Platform — Monorepo

A full-stack AI-native CRM platform combining:
- **`backend/`** — Next.js 15 API server (by [@MBS-31](https://github.com/MBS-31))
- **`frontend/`** — React + Vite frontend dashboard (by [@code-with-dipak-777](https://github.com/code-with-dipak-777))
- **`database/`** — PostgreSQL schema, seed data, and Docker Compose setup

---

## ✨ Key Features

### 🧠 AI-Native Capabilities
- **Autonomous AI Agents**: Multi-step AI agent task planning and execution.
- **AI Executive Brief & Copilot**: Natural language queries on CRM data with AI assistance.
- **Call Intelligence**: WebRTC dialer with AI sentiment analysis, audio processing, and automated transcriptions.
- **Smart Drafting**: AI-assisted email/message replies natively in the inbox.

### 🏢 Core CRM Functionality
- **Customer 360 & Relationship Mapping**: Enterprise account management with health scores and ARR tracking.
- **Deal Pipeline & Leads**: Multi-stage commercial deal pipeline with churn/risk prediction.
- **Unified Omni-channel Inbox**: Centralized hub for Emails, SMS, WhatsApp, and calls.
- **Opportunity Radar**: Proactive anomaly and expansion signal detection.

### ⚙️ Automation & Admin
- **Visual Workflow Builder**: Interactive drag-and-drop workflow graphs for automated CRM processes.
- **Sales Rep Coaching**: Quota pacing, strengths mapping, and actionable coaching advice.
- **Multi-tenant RBAC**: Organization-based data siloing with Enterprise Role-Based Access Control.
- **Audit Logging**: Immutable system security logs.

---

## 📁 Repository Structure

```
crm-backend/
├── backend/                    # Next.js 15 API Server
│   ├── src/
│   │   ├── app/api/v1/         # 34 REST API route handlers
│   │   ├── app/(dashboard)/    # 14 dashboard UI pages
│   │   ├── components/         # Shared UI components
│   │   ├── services/           # Service layer
│   │   ├── types/              # TypeScript types
│   │   └── data/               # Mock data & seed fixtures
│   ├── database/               # PostgreSQL setup
│   │   ├── schema.sql          # DDL — 20 tables
│   │   ├── seed.sql            # Initial seed data
│   │   └── docker-compose.yml  # Docker PostgreSQL container
│   └── package.json
│
└── frontend/                   # React + Vite Frontend
    ├── src/
    │   ├── app/                # Next.js pages (landing, dashboard, demo)
    │   ├── components/         # Dashboard UI components
    │   │   └── landing/        # Marketing landing page sections
    │   ├── data/               # Mock CRM data
    │   └── store/              # Zustand state stores
    └── package.json
```

---

## 🚀 Getting Started

### 1. Start the PostgreSQL Database
```bash
docker compose -f backend/database/docker-compose.yml up -d
```

### 2. Start the Backend API Server
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
# API base: http://localhost:3000/api/v1
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 🔗 Repos Connected

| Repo | Description |
|---|---|
| [MBS-31/crm-backend](https://github.com/MBS-31/crm-backend) | Backend API server (this repo) |
| [code-with-dipak-777/CRM-ROBLEM-SOLVE](https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE) | Frontend React dashboard |

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api/v1`

| Module | Endpoints |
|---|---|
| Auth | `GET /auth/me`, `GET /auth/organizations`, `POST /auth/switch-org` |
| Customers | `GET/POST /customers`, `GET /customers/:id`, `PATCH /customers/:id/health` |
| Leads | `GET/POST /leads`, `GET /leads/:id` |
| Deals | `GET/POST /deals`, `GET /deals/:id`, `PATCH /deals/:id/stage` |
| Calls | `GET /calls/latest`, `POST /calls/start` |
| Inbox | `GET /inbox/conversations`, `POST /inbox/conversations/:id/messages`, `POST /inbox/ai-reply` |
| AI Agents | `POST /agent/plan`, `POST /agent/execute`, `POST /copilot/query` |
| Simulator | `POST /simulator/project` |
| Radar | `GET /radar/metrics`, `POST /radar/actions/:id/execute` |
| Workflows | `GET /workflows`, `POST /workflows/:id/simulate` |
| Admin | `GET /admin/audit-logs`, `GET /admin/roles`, `GET /infra/health`, `GET /storage/metrics` |
| Coaching | `GET /coaching/reps` |
| Notifications | `GET /notifications`, `POST /notifications/:id/read` |

---

## 🗄️ Database

PostgreSQL 16 running in Docker with **20 tables** covering:
Organizations, Users, Customers, Leads, Deals, Calls, Transcripts, Inbox, AI Agents, Workflows, Radar, Coaching, Audit Logs, RBAC, and Notifications.
