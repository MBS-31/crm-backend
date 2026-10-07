"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Database,
  HardDrive,
  Cpu,
  Layers,
  Container,
  CheckCircle2,
  Terminal,
  Activity,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";

export default function ArchitectureSection() {
  const containers = [
    {
      name: "crm-frontend",
      image: "opencrm/web:latest",
      port: "3000:3000",
      memory: "256 MB",
      status: "Healthy",
      role: "Next.js App Router & Tailwind CSS UI",
      icon: Layers,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    },
    {
      name: "crm-backend",
      image: "opencrm/api:latest",
      port: "5000:5000",
      memory: "512 MB",
      status: "Healthy",
      role: "Core REST, WebSockets & Comms Dispatcher",
      icon: Cpu,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    },
    {
      name: "crm-postgres",
      image: "postgres:16-alpine",
      port: "5432:5432",
      memory: "1.2 GB",
      status: "Healthy",
      role: "Relational DB with RLS & pgvector",
      icon: Database,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
    {
      name: "crm-minio",
      image: "minio/minio:latest",
      port: "9000:9000",
      memory: "384 MB",
      status: "Healthy",
      role: "S3 Compatible Object Storage for Audio & Docs",
      icon: HardDrive,
      color: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    },
  ];

  const highlights = [
    "Docker Compose Ready",
    "Persistent Volumes",
    ".env Configuration",
    "Database Migrations",
    "Seed Scripts Included",
    "OpenAPI / Swagger Specs",
  ];

  return (
    <section id="architecture" className="py-24 md:py-32 relative bg-[#060812] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full glow-orb -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 inline-block mb-3">
            Infrastructure
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Deploy on your infrastructure.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No external cloud dependencies. Run locally with Docker Compose or scale onto your Kubernetes cluster with zero telemetry call-homes.
          </p>

          {/* Highlight badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.03] text-slate-300 border border-white/[0.08]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Docker Container Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {containers.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${c.color}`}>
                    <c.icon className="w-4 h-4" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {c.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-mono mb-1">{c.name}</h4>
                <div className="text-[11px] font-mono text-slate-400 mb-3">{c.image}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{c.role}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Port: {c.port}</span>
                <span>Mem: {c.memory}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Connection Schematic */}
        <div className="rounded-3xl bg-black/60 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Compose Service Topology
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">
              Network: open_crm_internal (Bridge)
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] w-full md:w-auto">
              <div className="text-xs font-bold text-white">Reverse Proxy</div>
              <div className="text-[10px] text-slate-400 font-mono">Traefik / Caddy / Nginx</div>
            </div>
            <div className="text-slate-600 hidden md:block">──────▶</div>
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 w-full md:w-auto">
              <div className="text-xs font-bold text-blue-300">Next.js Web (Port 3000)</div>
              <div className="text-[10px] text-slate-400 font-mono">Server-Side & Client Bundle</div>
            </div>
            <div className="text-slate-600 hidden md:block">──────▶</div>
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 w-full md:w-auto">
              <div className="text-xs font-bold text-indigo-300">API Gateway (Port 5000)</div>
              <div className="text-[10px] text-slate-400 font-mono">Prisma / ORM Layer</div>
            </div>
            <div className="text-slate-600 hidden md:block">──────▶</div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 w-full md:w-auto">
              <div className="text-xs font-bold text-emerald-300">PostgreSQL + MinIO S3</div>
              <div className="text-[10px] text-slate-400 font-mono">Encrypted Data Volumes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
