# AI-Native CRM Backend — Architecture & API Specification

Backend service blueprint for the **logip AI-Native Customer Intelligence & Automation Platform** frontend.

---

## 1. System Architecture Overview

The backend is designed as an event-driven, AI-native micro-service / modular monolith powering high-throughput enterprise CRM workloads, real-time communications, predictive ML scoring, and autonomous agent executions.

```
                     ┌──────────────────────────────────────────────┐
                     │          Frontend Client (React + Vite)      │
                     └──────────────────────┬───────────────────────┘
                                            │ HTTP / WebSocket / SSE
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │           API Gateway / Reverse Proxy        │
                     └──────┬────────────────┬───────────────┬──────┘
                            │                │               │
                            ▼                ▼               ▼
                 ┌──────────────────┐ ┌──────────────┐ ┌───────────────┐
                 │ Core CRM API     │ │ Comms & VoIP │ │ AI Agent & ML │
                 │ (Express / Fast) │ │ (WebRTC/SIP) │ │ (LangChain/LLM│
                 └─────────┬────────┘ └──────┬───────┘ └───────┬───────┘
                           │                 │                 │
    ┌──────────────────────┼─────────────────┼─────────────────┼──────────────────────┐
    │                      ▼                 ▼                 ▼                      │
    │  ┌──────────────────────┐   ┌──────────────────┐   ┌─────────────────────────┐  │
    │  │ PostgreSQL 16 (Core) │   │ Redis 7 (Cache / │   │ MinIO S3 Object Storage │  │
    │  │ Tenants, Deals, Logs │   │ PubSub & Queues) │   │ Voice Calls & Media     │  │
    │  └──────────────────────┘   └──────────────────┘   └─────────────────────────┘  │
    │                                                                                 │
    │                               DOCKER COMPOSE STACK                              │
    └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack Recommendations

| Layer | Recommended Technologies |
| :--- | :--- |
| **API Runtime** | Node.js (TypeScript) with **NestJS / Express** OR Python with **FastAPI** |
| **Database** | **PostgreSQL 16** (with pgvector for semantic search & RAG embeddings) |
| **ORM / Migration** | **Prisma** or **Drizzle ORM** (Node.js) / **SQLAlchemy + Alembic** (Python) |
| **Caching & Queues**| **Redis 7** (BullMQ / Celery for async background tasks) |
| **Object Storage**  | **MinIO** (S3-compatible storage for `.wav` call recordings and attachments) |
| **AI / LLM Stack**  | **OpenAI GPT-4o / Anthropic Claude 3.5 Sonnet / Google Gemini 1.5 Pro** via LangChain or LlamaIndex |
| **WebRTC & Comms**  | **LiveKit / Asterisk / FreeSWITCH** + **WhatsApp Cloud API (Meta Graph API v21.0)** |
| **Containerization**| **Docker & Docker Compose** |

---

## 3. Database Schema Blueprint (Prisma Reference)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Multi-Tenant Organization
model Organization {
  id          String       @id @default(uuid())
  name        String
  domain      String       @unique
  plan        String       @default("ENTERPRISE")
  users       User[]
  customers   Customer[]
  leads       Lead[]
  workflows   Workflow[]
  auditLogs   AuditLog[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

// 2. User & 5-Tier RBAC
enum Role {
  SUPER_ADMIN
  SALES_OPS
  MANAGER
  EXECUTIVE
  READONLY
}

model User {
  id             String        @id @default(uuid())
  orgId          String
  organization   Organization  @relation(fields: [orgId], references: [id])
  name           String
  email          String        @unique
  passwordHash   String
  role           Role          @default(EXECUTIVE)
  avatarUrl      String?
  quotaPacing    Float         @default(100.0)
  talkRatio      Float         @default(45.0)
  auditLogs      AuditLog[]
  createdAt      DateTime      @default(now())
}

// 3. Customer 360 Entity
model Customer {
  id               String         @id @default(uuid())
  orgId            String
  organization     Organization   @relation(fields: [orgId], references: [id])
  name             String
  company          String
  role             String
  email            String
  phone            String
  arr              Float
  sentimentScore   Float          @default(85.0)
  churnRisk        String         @default("LOW") // LOW, MEDIUM, HIGH, CRITICAL
  healthScore      Int            @default(85)
  nextBestAction   String?
  deals            Deal[]
  conversations    Conversation[]
  callRecordings   CallRecordings[]
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

// 4. Deal Pipeline
enum DealStage {
  DISCOVERY
  PROPOSAL
  NEGOTIATION
  CLOSED_WON
  CLOSED_LOST
}

model Deal {
  id          String      @id @default(uuid())
  customerId  String
  customer    Customer    @relation(fields: [customerId], references: [id])
  title       String
  amount      Float
  stage       DealStage   @default(DISCOVERY)
  closeDate   DateTime
  riskLevel   String      @default("LOW") // LOW, MEDIUM, HIGH
  createdAt   DateTime    @default(now())
}

// 5. Predictive Lead Intelligence
model Lead {
  id                 String       @id @default(uuid())
  orgId              String
  organization       Organization @relation(fields: [orgId], references: [id])
  name               String
  company            String
  email              String
  score              Int          @default(50) // 0 - 100
  tier               String       @default("WARM") // HOT, WARM, COLD
  fitWeight          Float        @default(0.3)
  engagementWeight   Float        @default(0.4)
  intentWeight       Float        @default(0.3)
  uncontactedDays    Int          @default(0)
  createdAt          DateTime     @default(now())
}

// 6. Call Intelligence & MinIO Storage
model CallRecordings {
  id              String    @id @default(uuid())
  customerId      String
  customer        Customer  @relation(fields: [customerId], references: [id])
  repName         String
  durationSeconds Int
  audioStorageKey String    // MinIO S3 Object Key (e.g. s3://crm-calls/2026/call-01.wav)
  transcript      String    @db.Text
  sentiment       String    @default("POSITIVE")
  talkRatio       Float
  listenRatio     Float
  silenceCount    Int       @default(0)
  actionItems     Json      // Stored list of checklists
  createdAt       DateTime  @default(now())
}

// 7. Visual Workflow Automation DAG
model Workflow {
  id          String       @id @default(uuid())
  orgId       String
  organization Organization @relation(fields: [orgId], references: [id])
  name        String
  active      Boolean      @default(true)
  nodesJson   Json         // Array of canvas nodes (Trigger, Condition, AI, Action)
  edgesJson   Json         // Array of connections
  runCount    Int          @default(0)
  createdAt   DateTime     @default(now())
}

// 8. Immutable Audit Trail
model AuditLog {
  id          String       @id @default(uuid())
  orgId       String
  organization Organization @relation(fields: [orgId], references: [id])
  userId      String?
  user        User?        @relation(fields: [userId], references: [id])
  action      String
  entity      String
  details     Json
  ipAddress   String?
  createdAt   DateTime     @default(now())
}
```

---

## 4. API Specification & Endpoints

Base URL: `/api/v1`

### 4.1 Authentication & Multi-Tenant RBAC
- `POST /auth/login`: Authenticate user, returns JWT and tenant org context.
- `POST /auth/refresh`: Refresh expired access token.
- `GET /auth/me`: Retrieve current authenticated profile and active role permissions.
- `POST /auth/switch-org`: Switch multi-tenant organization context (`X-Org-Id`).

### 4.2 AI Customer Copilot & Intelligence
- `POST /copilot/query`: Accepts prompt (e.g., *"Tell me everything important about Rahul before I call him"*). Supports **Server-Sent Events (SSE)** for streaming markdown tokens.
- `GET /copilot/dossier/:customerId`: Generates full customer dossier with sentiment trends, deal risks, and recommended talking points.
- `POST /copilot/action`: Executes a Copilot-suggested 1-click CRM action (e.g., reschedule follow-up, send proposal).

### 4.3 Customer 360° & Opportunity Radar
- `GET /customers`: List customers with filter by health score and risk level.
- `GET /customers/:id`: Detailed Customer 360 payload with relationship graph nodes & edges.
- `GET /radar/summary`: Returns grouped metrics: Hot Leads, At-Risk Deals, Upsell Candidates, Churn Alerts, and Overdue Follow-ups.

### 4.4 Predictive Lead Scoring
- `GET /leads`: List scored leads (0–100) categorized into HOT, WARM, and COLD.
- `POST /leads/recalculate-scores`: Triggers predictive scoring ML pipeline based on recent touchpoints and email responses.

### 4.5 Unified Communications & Softphone
- `GET /inbox/conversations`: Fetch unified omnichannel threads (WhatsApp, Email, Calls, SMS).
- `POST /inbox/send`: Send outbound message via WhatsApp Cloud API or Email.
- `POST /webhooks/whatsapp`: Webhook receiver for inbound Meta WhatsApp Cloud API messages and delivery receipts.
- `GET /calls/:callId`: Returns call metadata, talk/listen metrics, transcript, and pre-signed MinIO audio URL (`.wav`).
- `POST /calls/signaling`: WebRTC softphone SDP handshake and ICE candidate exchange.

### 4.6 Autonomous AI Agent
- `POST /agent/plan`: Receives natural language instruction, parses parameters, checks tool definitions, and returns structured execution plan preview.
- `POST /agent/execute`: Takes approved plan ID, triggers queued tasks with rollback guarantees, and outputs execution audit report.

### 4.7 Visual Workflow Builder Engine
- `GET /workflows`: List all configured automation workflows.
- `POST /workflows`: Create or update workflow nodes and edges JSON.
- `POST /workflows/:id/simulate`: Run test dry-run with mock customer payload and return node-by-node execution logs.

### 4.8 What-If Sales Simulator & Coaching
- `POST /simulator/calculate`: Accepts conversion rate, average deal size, and lead volume; calculates Monte Carlo revenue projections and win rate deltas.
- `GET /coaching/reps`: Returns performance diagnostics for all sales reps (quota pacing, talk ratios, objection handling scores).

### 4.9 Infrastructure Status
- `GET /infra/health`: Returns live status of Docker containers (PostgreSQL, MinIO, Redis, Worker queues).

---

## 5. Docker Infrastructure Setup

Create `docker-compose.yml` in your backend directory:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: crm-postgres
    restart: always
    environment:
      POSTGRES_USER: crm_admin
      POSTGRES_PASSWORD: crm_secure_password_2026
      POSTGRES_DB: crm_enterprise
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: crm-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  minio:
    image: minio/minio:latest
    container_name: crm-minio
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minio_admin
      MINIO_ROOT_PASSWORD: minio_secure_password_2026
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data

volumes:
  pgdata:
  redisdata:
  miniodata:
```

---

## 6. Environment Configuration (`.env.example`)

```ini
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database & Cache
DATABASE_URL="postgresql://crm_admin:crm_secure_password_2026@localhost:5432/crm_enterprise?schema=public"
REDIS_URL="redis://localhost:6379"

# Object Storage (MinIO)
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY="minio_admin"
MINIO_SECRET_KEY="minio_secure_password_2026"
MINIO_BUCKET_CALLS="crm-audio-recordings"

# AI & LLM Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
DEFAULT_LLM_MODEL="gpt-4o"

# WhatsApp Cloud API (Meta Graph)
META_WA_PHONE_NUMBER_ID="your_phone_number_id"
META_WA_ACCESS_TOKEN="your_system_user_token"
META_WA_WEBHOOK_VERIFY_TOKEN="custom_secure_verify_token"

# JWT Authentication
JWT_SECRET="super_secret_jwt_key_crm_2026"
JWT_EXPIRES_IN="7d"
```

---

## 7. Quickstart Guide

```bash
# 1. Start Docker stack
docker-compose up -d

# 2. Install backend dependencies
npm install

# 3. Run database migrations & seed initial records
npx prisma migrate dev --name init
npm run seed

# 4. Start backend server with hot reload
npm run dev
# Server running on http://localhost:5000
```
