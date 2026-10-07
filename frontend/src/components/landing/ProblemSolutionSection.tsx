"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Split,
  Sliders,
  DollarSign,
  ArrowDown,
  ArrowRight,
  Server,
  Database,
  HardDrive,
  Mail,
  Phone,
  MessageSquare,
  Smartphone,
  Layers,
  Cpu,
  User,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function ProblemSolutionSection() {
  const problems = [
    {
      number: "01",
      title: "Closed Infrastructure",
      desc: "Traditional legacy CRMs lock your sensitive customer data into proprietary cloud silos with restricted export capabilities.",
      icon: Lock,
      badge: "Vendor Lock-In",
    },
    {
      number: "02",
      title: "Fragmented Communication",
      desc: "Email, phone logs, WhatsApp chats, and SMS threads reside in disconnected third-party apps, destroying customer context.",
      icon: Split,
      badge: "Context Loss",
    },
    {
      number: "03",
      title: "Limited Customization",
      desc: "Engineering teams cannot customize backend workflow triggers, inspect database schemas, or add custom microservices.",
      icon: Sliders,
      badge: "No Backend Control",
    },
    {
      number: "04",
      title: "Complex & Expensive",
      desc: "Seat-based pricing scales exponentially as your team expands, penalizing growth with bloated enterprise license fees.",
      icon: DollarSign,
      badge: "Runaway Costs",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-[#070913] border-t border-white/[0.06] overflow-hidden">
      {/* Glow lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full glow-orb -z-10"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-violet-600/10 rounded-full glow-orb -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block mb-3">
            The Paradigm Shift
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Everything your CRM needs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-400">
              Nothing locked behind someone else's infrastructure.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Why pay massive recurring per-seat fees to rent a database when you can run a state-of-the-art enterprise CRM on hardware you fully own?
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {problems.map((p, idx) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.03] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-red-400 transition-colors">
                    {p.number}
                  </span>
                  <span className="text-[10px] font-semibold text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                    {p.badge}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 mb-4 group-hover:scale-105 group-hover:text-white transition-all">
                  <p.icon className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.05] text-[11px] text-slate-500 flex items-center justify-between">
                <span>Legacy Limitation</span>
                <span className="text-red-400 font-mono">✕ Restricted</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Solution: One Self-Hosted CRM Stack Showcase */}
        <div className="relative rounded-3xl bg-gradient-to-b from-indigo-950/30 via-slate-900/60 to-black/80 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              The Open Solution
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              One self-hosted CRM stack.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From web client to persistent database and object storage, every component runs within your isolated environment.
            </p>
          </div>

          {/* Animated Architecture Flow Diagram */}
          <div className="relative max-w-4xl mx-auto">
            {/* Primary Vertical/Horizontal Flow: User -> Next.js -> API -> Postgres & MinIO */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 items-center">
              {/* Node 1: User */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center hover:border-blue-500/50 transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-2">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">USER</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Desktop & Mobile</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-blue-400/60 animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Node 2: Next.js Frontend */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-center hover:border-blue-400 transition-all shadow-lg shadow-blue-950/50">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 mx-auto flex items-center justify-center mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">NEXT.JS FRONTEND</div>
                <div className="text-[10px] text-blue-300/80 font-mono mt-0.5">App Router • React 19</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-indigo-400/60 animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Node 3: Backend API */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-center hover:border-indigo-400 transition-all shadow-lg shadow-indigo-950/50">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 mx-auto flex items-center justify-center mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">BACKEND API</div>
                <div className="text-[10px] text-indigo-300/80 font-mono mt-0.5">Fast REST • SSE • RBAC</div>
              </div>
            </div>

            {/* Split downward to Database & MinIO Storage */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>POSTGRESQL 16</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      Persistent
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Stores contacts, deals, pipeline stages, and audit trails.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>MINIO OBJECT STORAGE</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-mono">
                      S3 API
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Archives `.wav` voice calls, contracts, and attachments.
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Communication Layer */}
            <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Integrated Communication Gateways:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-1 font-mono">
                  <Mail className="w-3 h-3" /> EMAIL (SMTP)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20 flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3" /> VOICE / SIP
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-mono">
                  <MessageSquare className="w-3 h-3" /> WHATSAPP CLOUD API
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1 font-mono">
                  <Smartphone className="w-3 h-3" /> SMS GATEWAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
