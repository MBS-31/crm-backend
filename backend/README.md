# CRM Backend API

This directory contains the backend for the AI-Native CRM Platform, built with **Next.js 15 (App Router)** and **PostgreSQL**.

## 🏗 Architecture Overview

The backend uses a modernized Next.js API route structure mapped to standard REST endpoints. 
- **API Routes**: Located in `src/app/api/v1/`
- **Data Access Layer**: `src/services/` contains modularized logic for handling requests, which interfaces with the database or mock data layer.
- **Domain Models**: Types and interfaces are defined in `src/types/index.ts`.
- **Database**: PostgreSQL 16 schema and docker configurations are located in `database/`.

## 🚀 Running the API Locally

1. **Start the Database**
   ```bash
   cd database
   docker compose up -d
   ```

2. **Start the API Server**
   ```bash
   # From the `backend` folder
   npm install
   npm run dev
   ```
   The API will be available at `http://localhost:3000/api/v1`.

## 📡 API Modules & Endpoints

| Module | Endpoints | Description |
|---|---|---|
| **Auth** | `/auth/me`, `/auth/organizations` | User identity and tenant switching |
| **Customers** | `/customers`, `/customers/:id` | Enterprise accounts and health metrics |
| **Leads** | `/leads`, `/leads/:id` | Lead pipeline and AI scoring |
| **Deals** | `/deals`, `/deals/:id`, `/deals/:id/stage` | Commercial deal progression |
| **Calls** | `/calls/start`, `/calls/latest` | WebRTC endpoints and call transcripts |
| **Inbox** | `/inbox/conversations`, `/inbox/ai-reply` | Unified messaging hub and AI drafting |
| **AI Agents** | `/agent/plan`, `/agent/execute` | Autonomous decision execution |
| **Workflows** | `/workflows`, `/workflows/:id/simulate` | Visual automation node processing |
| **Radar** | `/radar/metrics` | Proactive anomaly detection |

## 🧪 Postman Collection

A full, pre-configured Postman collection is included for immediate testing:
- **File**: `crm-backend.postman_collection.json`
- **Usage**: Import into Postman. It contains pre-configured requests for all 34 endpoints and uses a `{{baseUrl}}` variable defaulting to `http://localhost:3000/api/v1`.

## 🗄️ Database Documentation

Please see the dedicated database documentation at [`database/README.md`](database/README.md) for details on the 20 relational tables, constraints, and initial seed data.
