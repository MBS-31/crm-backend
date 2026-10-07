"use client";

import React, { useState } from "react";
import Link from "./CustomLink";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  LayoutDashboard,
  UserCheck,
  Building2,
  CheckSquare,
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
  PhoneCall,
  Mail,
  Smartphone,
  ChevronRight,
  MoreVertical,
  Activity,
  Sparkles,
  Bot,
  Play,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useLandingStore } from "../../store/useLandingStore";

export default function HeroDashboardPreview() {
  const { setCurrentView } = useLandingStore();
  const [activeTab, setActiveTab] = useState("Deals");
  const [audioPlaying, setAudioPlaying] = useState(true);

  return (
    <div className="relative w-full rounded-2xl md:rounded-[32px] p-2 sm:p-4 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent border border-white/[0.12] shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl overflow-hidden">
      {/* Top Browser / Window Controls Bar */}
      <div className="flex items-center justify-between px-3 py-2.5 mb-2 border-b border-white/[0.06] bg-black/30 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 pl-2 border-l border-white/10 hidden sm:inline">
            https://app.opencrm.internal/pipeline/q3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            onClick={() => setCurrentView('dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all hover:scale-105"
          >
            <span>Enter Live Dashboard</span>
            <span>↗</span>
          </Link>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Docker: All 4 Nodes Healthy
          </span>
        </div>
      </div>

      {/* Main Internal Dashboard Screen */}
      <div className="bg-[#0A0D1A]/95 rounded-xl md:rounded-2xl border border-white/[0.06] p-3 sm:p-5 text-slate-100 overflow-hidden">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Revenue (Q3)</span>
              <DollarSign className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">$842,500</span>
              <span className="text-[11px] font-semibold text-emerald-400">+14.2%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[78%] rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Active Leads</span>
              <Users className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">1,248</span>
              <span className="text-[11px] font-semibold text-emerald-400">+8.6%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-full w-[64%] rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Open Deals</span>
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">64</span>
              <span className="text-[11px] font-semibold text-blue-400">$2.1M Total</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[82%] rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Conversion Rate</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">28.4%</span>
              <span className="text-[11px] font-semibold text-emerald-400">+4.1%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[70%] rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Dashboard Body: Sidebar + Kanban + Omnichannel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Left Mini Sidebar */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1 tracking-wider">
              Workspace
            </span>
            {[
              { name: "Overview", icon: LayoutDashboard },
              { name: "Leads", icon: UserCheck, count: "14" },
              { name: "Deals", icon: Briefcase, count: "64", active: true },
              { name: "Companies", icon: Building2 },
              { name: "Tasks", icon: CheckSquare, count: "5" },
              { name: "Calendar", icon: Calendar },
              { name: "Comms", icon: MessageSquare, badge: "LIVE" },
              { name: "Documents", icon: FileText },
              { name: "Reports", icon: BarChart3 },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  item.active
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </div>
                {item.count && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Center Pipeline Kanban (Columns: Qualified, Proposal, Negotiation) */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">Deal Pipeline Kanban</span>
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  Filter: Enterprise Accounts
                </span>
              </div>
              <span className="text-[11px] text-indigo-400 font-mono">Q3 Pacing: 114%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Column 1: Qualified */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    Qualified
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">$310K</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-white">Stark Industries</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Tier 1
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">Anthony Edward • AI Cluster</p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-slate-200">$180,000</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> 2h ago
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-white">BioGen Labs</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20">
                      Tier 2
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">Dr. Elena Rostova • Cloud</p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-slate-200">$130,000</span>
                    <span className="text-slate-400">1d ago</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Proposal Sent */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    Proposal
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">$405K</span>
                </div>

                {/* Highlight Deal Card (Rahul Sharma) */}
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-950/40 to-blue-950/30 border border-indigo-500/40 shadow-lg shadow-indigo-950/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-white">Apex Global</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Hot Deal
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mb-2">Rahul Sharma • Enterprise MSA</p>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="font-mono font-bold text-emerald-400">$120,000</span>
                    <span className="text-blue-300 font-medium">94 Health</span>
                  </div>
                  <div className="text-[9px] bg-indigo-500/20 rounded p-1 text-indigo-200 border border-indigo-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                    <span>WhatsApp reply received 12m ago</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-white">CyberNetics</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Needs Review
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">David Vance • S3 Migration</p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-slate-200">$210,000</span>
                    <span className="text-amber-400">Risk alert</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Negotiation / Won */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Negotiation
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">$285K</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-emerald-500/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-white">CloudFlow Tech</span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Closing
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">Sarah Jenkins • VoIP Plan</p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-emerald-400">$85,000</span>
                    <span className="text-slate-400">Contract Sent</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <div className="text-[10px] font-semibold text-white">Won: Nexus Digital</div>
                      <div className="text-[9px] text-slate-400">$200,000 ARR Signed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Omnichannel Activity Feed */}
          <div className="lg:col-span-3 flex flex-col gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center justify-between pb-1 border-b border-white/5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Omnichannel Activity</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Email Activity Item */}
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-start gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-3 h-3 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-blue-300">EMAIL</span>
                  <span className="text-slate-400 font-mono">1m ago</span>
                </div>
                <p className="text-[11px] text-slate-200 truncate font-medium">Proposal sent to Acme Corp</p>
                <p className="text-[9px] text-slate-400">MSA & pricing breakdown attached</p>
              </div>
            </div>

            {/* WhatsApp Activity Item */}
            <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-emerald-400">WHATSAPP</span>
                  <span className="text-slate-400 font-mono">12m ago</span>
                </div>
                <p className="text-[11px] text-slate-200 font-medium">Customer replied</p>
                <p className="text-[9px] text-emerald-300/90 italic">"Looks great! Finalizing approval today."</p>
              </div>
            </div>

            {/* Phone WebRTC Activity Item with Waveform */}
            <div className="p-2 rounded-lg bg-violet-950/20 border border-violet-500/25 flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-3 h-3 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-violet-300">PHONE (WebRTC)</span>
                    <span className="text-slate-400 font-mono">34m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-medium">Call completed • 04:32</p>
                  <p className="text-[9px] text-slate-400">Archived to MinIO: s3://calls/rec-84.wav</p>
                </div>
              </div>

              {/* Tiny audio waveform visualization */}
              <div className="bg-black/40 rounded px-2 py-1 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center text-white"
                  >
                    <Play className="w-2 h-2 fill-current" />
                  </button>
                  <span className="text-[9px] font-mono text-slate-400">02:14 / 04:32</span>
                </div>
                <div className="flex items-center gap-0.5 h-3">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 35, 65, 85, 40, 95].map((h, i) => (
                    <span
                      key={i}
                      className={`w-0.5 rounded-full ${
                        i < 8 ? "bg-violet-400" : "bg-white/20"
                      } ${audioPlaying && i % 2 === 0 ? "animate-pulse" : ""}`}
                      style={{ height: `${h}%` }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            {/* SMS Activity Item */}
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-start gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Smartphone className="w-3 h-3 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-amber-300">SMS</span>
                  <span className="text-slate-400 font-mono">1h ago</span>
                </div>
                <p className="text-[11px] text-slate-200 truncate font-medium">OTP / follow-up sent</p>
                <p className="text-[9px] text-slate-400">Delivered via Twilio/Custom SMS Gateway</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
