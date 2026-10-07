"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

export default function DeploymentSection() {
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Clone Repository",
      desc: "Fetch the complete full-stack source code directly from GitHub with all submodules.",
      cmd: "git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git",
    },
    {
      num: "02",
      title: "Configure .env",
      desc: "Copy pre-populated environment template and define your secure database and MinIO credentials.",
      cmd: "cd CRM-ROBLEM-SOLVE && cp .env.example .env",
    },
    {
      num: "03",
      title: "Run Docker Compose",
      desc: "Spin up the Next.js frontend, Node/FastAPI backend, PostgreSQL 16, and MinIO storage.",
      cmd: "docker compose up -d --build",
    },
    {
      num: "04",
      title: "Open Your CRM",
      desc: "Navigate to localhost:3000 in your browser and sign in with the pre-seeded Super Admin user.",
      cmd: "open http://localhost:3000",
    },
  ];

  const fullScript = `# 1. Clone the open-source repository
git clone https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE.git
cd CRM-ROBLEM-SOLVE

# 2. Setup your local environment
cp .env.example .env

# 3. Launch isolated multi-container stack
docker compose up -d

# 4. Success! Open dashboard
# Web UI:    http://localhost:3000
# API Docs:  http://localhost:5000/api/docs
# MinIO S3:  http://localhost:9001`;

  const copyScript = () => {
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="deployment" className="py-24 md:py-32 relative bg-[#070913] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-3">
            Local Deployment
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            From Git clone to running CRM.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Get up and running in under three minutes with standard container tooling. No complex manual dependency setups.
          </p>
        </div>

        {/* 4-Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {steps.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-400/80 transition-colors">
                    Step {idx + 1} of 4
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{s.desc}</p>
              </div>

              <div className="p-2 rounded-lg bg-black/50 border border-white/5 font-mono text-[10px] text-slate-300 truncate">
                $ {s.cmd}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal Block */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-black/80 border border-white/[0.1] shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">bash terminal (bash)</span>
            </div>
            <button
              onClick={copyScript}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to clipboard!" : "Copy Full Script"}</span>
            </button>
          </div>

          {/* Script Content */}
          <pre className="p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
            <code>{fullScript}</code>
          </pre>

          {/* Footer CTA */}
          <div className="px-5 py-4 bg-[#0A0D1A] border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Fully compatible with Linux, macOS, and Windows WSL2
            </span>
            <a
              href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
            >
              Start Self-Hosting Now
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
