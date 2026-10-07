"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { useLandingStore } from "@/store/useLandingStore";

export default function FinalCtaSection() {
  const { setDemoModalOpen } = useLandingStore();

  return (
    <section className="py-28 md:py-40 relative bg-gradient-to-b from-[#060812] via-[#080B18] to-[#04060C] border-t border-white/[0.06] overflow-hidden bg-grid-pattern">
      {/* Huge Glowing Center Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/30 to-violet-600/20 rounded-full glow-orb -z-10"></div>

      {/* Floating Communication Nodes in background */}
      <div className="absolute top-16 left-12 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hidden lg:block animate-bounce duration-1000">
        <Mail className="w-5 h-5" />
      </div>
      <div className="absolute top-20 right-16 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hidden lg:block animate-pulse">
        <MessageSquare className="w-5 h-5" />
      </div>
      <div className="absolute bottom-20 left-20 p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hidden lg:block animate-pulse">
        <Phone className="w-5 h-5" />
      </div>
      <div className="absolute bottom-24 right-20 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hidden lg:block animate-bounce duration-1000">
        <Smartphone className="w-5 h-5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/30 inline-flex items-center gap-1.5 mb-6 shadow-lg shadow-indigo-950/40">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Production Ready Self-Hosting
        </span>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Own your CRM. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-violet-400">
            Own your data.
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Deploy a complete enterprise CRM on your own infrastructure and connect every customer conversation in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#deployment"
            className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2 group shadow-lg"
          >
            <Terminal className="w-4 h-4 text-blue-200" />
            Deploy Locally
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View Documentation
          </button>

          <a
            href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-white/[0.08] rounded-xl transition-all duration-200 inline-flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Small trust caption */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span>✓ Zero tracking / telemetry</span>
          <span>✓ 100% Free & Open Source</span>
          <span>✓ MIT License</span>
        </div>
      </div>
    </section>
  );
}
