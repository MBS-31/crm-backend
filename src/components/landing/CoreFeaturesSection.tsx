"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserCheck,
  Briefcase,
  Building2,
  CheckSquare,
  HardDrive,
  BarChart3,
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap
} from "lucide-react";

export default function CoreFeaturesSection() {
  const features = [
    {
      title: "Lead Management",
      desc: "Capture, qualify and convert leads with complete activity history, predictive ML scores, and touchpoint tracking.",
      icon: UserCheck,
      badge: "Predictive ML",
      color: "from-blue-500/20 to-indigo-500/10",
      accent: "text-blue-400",
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      title: "Deal Pipeline",
      desc: "Visual sales pipelines with stages, values, owners, win probability, and automated SLA warnings.",
      icon: Briefcase,
      badge: "Kanban",
      color: "from-violet-500/20 to-purple-500/10",
      accent: "text-violet-400",
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "Contacts & Companies",
      desc: "Maintain a unified customer profile across every interaction, linking decision makers and corporate hierarchies.",
      icon: Building2,
      badge: "Customer 360",
      color: "from-cyan-500/20 to-blue-500/10",
      accent: "text-cyan-400",
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "Tasks & Follow-ups",
      desc: "Never miss the next customer action with smart reminders and automated task generation from email replies.",
      icon: CheckSquare,
      badge: "Automation",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      title: "Documents & Files",
      desc: "Securely store contracts, NDAs, and voice attachments using native MinIO / S3-compatible private object storage.",
      icon: HardDrive,
      badge: "MinIO S3",
      color: "from-rose-500/20 to-red-500/10",
      accent: "text-rose-400",
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "Reports & Analytics",
      desc: "Monitor sales rep performance, conversion velocity, deal slip rates, and team quotas with real-time charts.",
      icon: BarChart3,
      badge: "Real-Time",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      title: "Calendar & Events",
      desc: "Manage client discovery meetings, follow-ups, and calendar invitations with direct CRM deal associations.",
      icon: Calendar,
      badge: "Sync Ready",
      color: "from-indigo-500/20 to-blue-500/10",
      accent: "text-indigo-400",
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      title: "Customer Timeline",
      desc: "Every email, WhatsApp text, phone recording, and invoice consolidated in one chronological audit trail.",
      icon: Clock,
      badge: "Omni-Feed",
      color: "from-purple-500/20 to-indigo-500/10",
      accent: "text-purple-400",
      span: "md:col-span-2 lg:col-span-2",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative bg-[#070913] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 inline-block mb-3">
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Everything in one powerful CRM.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Engineered with deep operational depth. No third-party plugin stores required to run full sales cycles.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`relative rounded-2xl p-6 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 group flex flex-col justify-between overflow-hidden ${feat.span}`}
            >
              {/* Subtle gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
              ></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${feat.accent} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 flex items-center justify-between">
                  <span>{feat.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">OpenCRM / Core</span>
                <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
                  Explore module →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
