# CRM PostgreSQL Database

This directory contains the database definition, initialization scripts, seed data, and Docker infrastructure for the **CRM Backend**.

---

## 🚀 Quick Start (Docker)

Start PostgreSQL container with persistent volume and automatic schema/seed initialization:

```bash
docker compose -f database/docker-compose.yml up -d
```

To stop:
```bash
docker compose -f database/docker-compose.yml down
```

---

## 🔑 Connection Parameters

| Parameter | Value |
|---|---|
| **Host** | `localhost` |
| **Port** | `5432` |
| **Database** | `crm_db` |
| **Username** | `postgres` |
| **Password** | `postgrespassword` (or `postgres`) |
| **Connection URL** | `postgresql://postgres:postgrespassword@localhost:5432/crm_db` |

---

## 📁 Directory Structure

```
database/
├── schema.sql           # DDL: All tables, types, constraints, foreign keys, indexes
├── seed.sql             # Initial telemetry seed data (organizations, users, customers, deals, leads, etc.)
├── docker-compose.yml   # Docker compose configuration for running PostgreSQL container
└── README.md            # Database documentation
```

---

## 📊 Database Tables (20 Relations)

1. **`organizations`** — Multi-tenant tenant boundaries, subscription plans (`Enterprise Plan`, `Growth Plan`, `Starter Plan`), active users, region.
2. **`users`** — User identity, executive roles (`SUPER ADMIN`, `SALES OPS`, `MANAGER`, `EXECUTIVE`, `READONLY`), titles, departments.
3. **`customers`** — Enterprise accounts, ARR (in INR), health scores (0–100), sentiment (`Positive`, `Neutral`, `Negative`), churn risk, next best actions.
4. **`customer_relationships`** — Aggregated connection count telemetry (deals, emails, whatsapp, calls, tasks, documents).
5. **`leads`** — Pipeline leads, priority tier (`HOT`, `WARM`, `COLD`), fit/engagement/intent weights, uncontacted days, values.
6. **`deals`** — Commercial deal pipeline, 5 stages (`DISCOVERY` ➔ `PROPOSAL` ➔ `NEGOTIATION` ➔ `CLOSED WON` ➔ `CLOSED LOST`), risks, probabilities, AI insights.
7. **`call_recordings`** — Telephony records, MinIO audio keys, duration, sentiment, talk/listen ratios, silence counts.
8. **`call_transcripts`** — Diarized speech transcripts with speaker identification and timestamps.
9. **`call_action_items`** — Automated action items extracted from call transcripts.
10. **`conversations`** — Unified multi-channel conversations (Email, WhatsApp, SMS, Calls).
11. **`chat_messages`** — Message history with sender role, attachments, and AI flags.
12. **`ai_agent_executions`** — Autonomous agent run requests with status (`planning`, `ready_to_approve`, `executing`, `completed`).
13. **`ai_agent_plan_steps`** — Multi-step breakdown of autonomous tasks.
14. **`ai_agent_audit_logs`** — Audit trail for AI autonomous decision execution.
15. **`workflows`** — Visual workflow graphs stored with trigger events, nodes, and edges (`JSONB`).
16. **`radar_items`** — Proactive 360° anomaly signals, churn warnings, expansion targets.
17. **`sales_rep_coaching`** — Quota pacing, objection handling ratings, strengths, and coaching advice.
18. **`audit_logs`** — Immutable system security logs with IP addresses, actions, and actors.
19. **`role_permissions`** — RBAC permission matrix (View, Create, Edit, Delete).
20. **`notifications`** — User notification feed with read/unread statuses.

---

## 🛠 Manual Execution

If you have PostgreSQL installed locally or in another container:

```bash
# Run schema
psql -h localhost -U postgres -d crm_db -f database/schema.sql

# Run seed data
psql -h localhost -U postgres -d crm_db -f database/seed.sql
```
