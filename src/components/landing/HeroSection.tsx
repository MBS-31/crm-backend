"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Check,
  Server,
  Database,
  HardDrive,
  Shield,
  Code2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import HeroDashboardPreview from "./HeroDashboardPreview";
import { useLandingStore } from "@/store/useLandingStore";

export default function HeroSection() {
  const { setDemoModalOpen } = useLandingStore();

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/20 to-purple-600/10 rounded-full glow-orb -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full glow-orb -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/10 rounded-full glow-orb -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-violet-500/15 border border-indigo-500/30 text-indigo-300 backdrop-blur-md mb-6 shadow-lg shadow-indigo-950/30"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="uppercase tracking-widest text-[11px]">
              Open Source • Self-Hosted • Enterprise Ready
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Your CRM. <br className="hidden sm:inline" />
            Your Infrastructure. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
              Your Data.
            </span>
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Deploy a complete full-stack CRM on your own infrastructure with powerful pipelines, granular RBAC, persistent storage, and unified{" "}
            <span className="text-white font-medium underline decoration-blue-500/50 underline-offset-4">Email</span>,{" "}
            <span className="text-white font-medium underline decoration-violet-500/50 underline-offset-4">Voice</span>,{" "}
            <span className="text-white font-medium underline decoration-emerald-500/50 underline-offset-4">WhatsApp</span> and{" "}
            <span className="text-white font-medium underline decoration-amber-500/50 underline-offset-4">SMS</span> communication.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-8"
          >
            <Link
              href="/dashboard"
              className="px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2 group shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              Open Live Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="#deployment"
              className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-blue-200" />
              Deploy Locally
            </a>

            <a
              href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-white/[0.08] rounded-xl transition-all duration-200 inline-flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              Explore GitHub
            </a>

            <a
              href="#architecture"
              className="px-3 py-3.5 text-sm font-medium text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group hidden sm:inline-flex"
            >
              Architecture →
            </a>
          </motion.div>

          {/* Small Trust / Tech Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-slate-300">Docker Ready</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-slate-300">PostgreSQL</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-slate-300">MinIO Storage</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-slate-300">5-Tier RBAC</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-slate-300">API First</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview Presentation Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Subtle curved glow border backdrop */}
          <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-b from-blue-500/30 via-indigo-500/10 to-transparent blur-md -z-10"></div>
          <HeroDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
