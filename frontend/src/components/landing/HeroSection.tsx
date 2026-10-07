"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LogIn, Sparkles, Flame, Users, Building2, FileText, BarChart3 } from "lucide-react";

import { useLandingStore } from "../../store/useLandingStore";
import { useCrmStore } from "../../store/useCrmStore";

const QUICK_LINKS = [
  { label: "Leads", href: "#leads", icon: Flame },
  { label: "Contacts", href: "#contacts", icon: Users },
  { label: "Companies", href: "#companies", icon: Building2 },
  { label: "Documents", href: "#documents", icon: FileText },
  { label: "Reports", href: "#reports", icon: BarChart3 },
];

export default function HeroSection() {
  const { setCurrentView, setLoginModalOpen } = useLandingStore();
  const setActiveTab = useCrmStore((s: { setActiveTab: (tab: string) => void }) => s.setActiveTab);

  const openDashboard = () => {
    setActiveTab("dashboard");
    setCurrentView("dashboard");
  };

  return (
    <section id="dashboard" className="relative pt-28 sm:pt-36 pb-20 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/20 to-purple-600/10 rounded-full glow-orb -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full glow-orb -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/10 rounded-full glow-orb -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Manage your customers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
              in one place.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Leads, contacts, companies, documents and reports — all inside one simple CRM dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-8"
          >
            <button
              id="hero-open-dashboard"
              onClick={openDashboard}
              className="px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2 group shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              id="hero-login"
              onClick={() => setLoginModalOpen(true)}
              className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-blue-200" />
              Login / Sign in
            </button>
          </motion.div>

          {/* Quick jump to modules */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  );
}
