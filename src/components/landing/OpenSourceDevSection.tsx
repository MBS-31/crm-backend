"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  FolderTree,
  FileCode,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  FileText
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

export default function OpenSourceDevSection() {
  const [copied, setCopied] = useState(false);

  const fileTree = [
    { name: "crm/", type: "folder", open: true },
    { name: "├── frontend/        # Next.js 15 App Router & Tailwind CSS", type: "file" },
    { name: "├── backend/         # REST API, WebSockets, Worker Queues", type: "file" },
    { name: "├── database/        # PostgreSQL Prisma / Migrations & Seeds", type: "file" },
    { name: "├── storage/         # MinIO S3 Object Storage config", type: "file" },
    { name: "├── integrations/    # WhatsApp, SIP/VoIP, SMTP, Twilio", type: "file" },
    { name: "├── docker-compose.yml # 1-Click Multi-Container Stack", type: "file", highlight: true },
    { name: "├── .env.example     # Pre-configured environment variables", type: "file" },
    { name: "└── README.md        # Comprehensive Architecture Specs", type: "file" },
  ];

  const badges = [
    "Full Frontend Source",
    "Full Backend Source",
    "Database Schema & Seeds",
    "Docker Compose Config",
    "OpenAPI Documentation",
    "Custom Integrations SDK",
  ];

  return (
    <section className="py-24 md:py-32 relative bg-[#070913] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block mb-3">
            Open Source & Developer First
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Built to be modified.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Full source code. No black boxes. Inspect every database migration, customize pipeline stages, or build custom microservices on top of the open API.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Code Editor Style Folder Tree */}
          <div className="lg:col-span-7 rounded-2xl bg-black/70 border border-white/[0.1] shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">repository-structure.sh</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy Clone"}</span>
              </button>
            </div>

            {/* Tree Lines */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-1.5 overflow-x-auto">
              {fileTree.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-center ${
                    f.highlight ? "text-blue-300 font-semibold bg-blue-500/10 px-1.5 py-0.5 rounded" : ""
                  }`}
                >
                  <span className="text-slate-500 select-none mr-3 text-[11px] w-4">{i + 1}</span>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>

            {/* Terminal Git Command */}
            <div className="px-5 py-3 bg-[#0A0D1A] border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git
              </span>
              <span className="text-[10px] text-slate-500">MIT License</span>
            </div>
          </div>

          {/* Right: Badges & Repository CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Hackable & Extensible</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether you need to integrate custom proprietary ERP APIs, write automation cron jobs, or add custom lead scoring models, our modular repository structure gives you complete control.
              </p>
            </div>

            {/* Badges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {badges.map((b) => (
                <div
                  key={b}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2 text-xs font-medium text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-200 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <GithubIcon className="w-4 h-4" />
                Explore Repository
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE#readme"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-white/[0.04] text-slate-300 font-medium text-xs hover:bg-white/[0.08] border border-white/[0.08] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                Read Architecture Specs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
