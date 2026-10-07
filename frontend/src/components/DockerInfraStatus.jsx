import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  FileText,
  Volume2
} from 'lucide-react';
import { DockerIcon, PostgresIcon, MinioIcon } from './Icons';

export default function DockerInfraStatus() {
  const [showComposeSnippet, setShowComposeSnippet] = useState(false);

  const containers = [
    {
      name: 'crm-frontend',
      image: 'logip-crm/frontend:v1.2',
      port: '5173:80',
      status: 'Up (Healthy)',
      cpu: '0.4%',
      mem: '58 MB',
      icon: Server,
      iconColor: 'text-blue-500',
    },
    {
      name: 'crm-backend-api',
      image: 'logip-crm/backend:v1.2',
      port: '8000:8000',
      status: 'Up (Healthy)',
      cpu: '1.2%',
      mem: '142 MB',
      icon: Terminal,
      iconColor: 'text-emerald-500',
    },
    {
      name: 'crm-postgres',
      image: 'postgres:16-alpine',
      port: '5432:5432',
      status: 'Up (Healthy)',
      cpu: '0.8%',
      mem: '210 MB',
      icon: PostgresIcon,
      isCustomIcon: true,
    },
    {
      name: 'crm-minio-storage',
      image: 'minio/minio:RELEASE.2024',
      port: '9000:9000, 9001:9001',
      status: 'Up (Healthy)',
      cpu: '0.5%',
      mem: '185 MB',
      icon: MinioIcon,
      isCustomIcon: true,
    },
    {
      name: 'crm-redis-broker',
      image: 'redis:7.2-alpine',
      port: '6379:6379',
      status: 'Up (Healthy)',
      cpu: '0.2%',
      mem: '32 MB',
      icon: Cpu,
      iconColor: 'text-rose-500',
    },
  ];

  const minioBuckets = [
    {
      name: 'crm-recordings',
      purpose: 'WebRTC / SIP audio call recordings (.wav & .mp3)',
      filesCount: '1,420 files',
      size: '34.2 GB',
      policy: 'Private / Encrypted AES-256',
      icon: Volume2,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'crm-documents',
      purpose: 'Customer attachments, agreements & invoices',
      filesCount: '2,890 files',
      size: '8.6 GB',
      policy: 'Role-Restricted (5-Tier RBAC)',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  const composeSample = `version: '3.8'

services:
  crm-frontend:
    build: ./frontend
    ports: ["5173:80"]
    depends_on: [crm-backend-api]

  crm-backend-api:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://crm:secret@crm-postgres:5432/crm_db
      - S3_ENDPOINT=http://crm-minio-storage:9000
      - S3_BUCKET_RECORDINGS=crm-recordings
      - WHATSAPP_CLOUD_API_TOKEN=\${WHATSAPP_TOKEN}
    depends_on: [crm-postgres, crm-minio-storage, crm-redis-broker]

  crm-postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

  crm-minio-storage:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    ports: ["9000:9000", "9001:9001"]
    volumes:
      - minio_data:/data

  crm-redis-broker:
    image: redis:7.2-alpine
    ports: ["6379:6379"]

volumes:
  postgres_data:
  minio_data:`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DockerIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Docker Compose Multi-Container Orchestration
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                5/5 Containers Healthy
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Self-Hosted Local Infrastructure with Persistent Volumes (PostgreSQL 16 & MinIO S3 Object Storage)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowComposeSnippet(!showComposeSnippet)}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 flex items-center gap-1.5"
        >
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <span>{showComposeSnippet ? 'Hide docker-compose.yml' : 'View docker-compose.yml'}</span>
        </button>
      </div>

      {showComposeSnippet && (
        <div className="bg-slate-900 rounded-2xl p-4 text-slate-200 font-mono text-[11px] overflow-x-auto shadow-inner relative border border-slate-800">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
            <span>docker-compose.yml (Local Self-Hosted Stack)</span>
            <span className="text-emerald-400">Validated 100% Production Ready</span>
          </div>
          <pre className="leading-relaxed">{composeSample}</pre>
        </div>
      )}

      {/* Live Containers Table */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Running Containerized Services
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {containers.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.name}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {c.isCustomIcon ? (
                      <Icon className="w-4 h-4" />
                    ) : (
                      <Icon className={`w-4 h-4 ${c.iconColor}`} />
                    )}
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {c.name}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Healthy
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 font-mono">
                  <div>Port: <span className="text-slate-800 font-semibold">{c.port}</span></div>
                  <div>CPU: <span className="text-slate-800 font-semibold">{c.cpu}</span></div>
                  <div>Mem: <span className="text-slate-800 font-semibold">{c.mem}</span></div>
                  <div>Image: <span className="text-slate-800 truncate block">{c.image.split(':')[0]}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MinIO Object Storage Buckets */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-rose-500" />
            MinIO S3-Compatible Object Storage (Persistent Call Audio & Documents)
          </h4>
          <span className="text-xs font-bold text-slate-700">
            Total Allocated: 42.8 GB / 500 GB (8.5%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {minioBuckets.map((bucket) => {
            const BIcon = bucket.icon;
            return (
              <div
                key={bucket.name}
                className="border border-slate-200 rounded-2xl p-4 bg-white flex items-start gap-3.5 shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${bucket.color}`}>
                  <BIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      bucket://{bucket.name}
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                      {bucket.size}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {bucket.purpose}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <span>{bucket.filesCount}</span>
                    <span className="text-blue-600 font-semibold">{bucket.policy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
