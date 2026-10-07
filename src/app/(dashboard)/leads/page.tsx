"use client";

import React, { useState } from "react";
import { mockLeads } from "@/data/mockData";
import { formatINR } from "@/lib/utils";
import { useUIStore, useCopilotStore } from "@/stores";
import {
  UserCheck,
  Flame,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Mail,
  Zap,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
  const [tierFilter, setTierFilter] = useState<"ALL" | "HOT" | "WARM" | "COLD">("ALL");
  const [search, setSearch] = useState("");
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const filtered = mockLeads.filter((lead) => {
    const matchesTier = tierFilter === "ALL" ? true : lead.tier === tierFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.industry?.toLowerCase().includes(search.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Predictive Lead Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Machine learning lead scoring weighted by Fit, Engagement, and Intent telemetry.
          </p>
        </div>

        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI: Rank Best Inbound Leads</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, company, or industry..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        {/* Tier filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          {(["ALL", "HOT", "WARM", "COLD"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={cn(
                "px-3 py-1 rounded-lg font-bold transition-colors",
                tierFilter === tier
                  ? tier === "HOT"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : tier === "WARM"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : tier === "COLD"
                    ? "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {tier === "HOT" && "🔥 "}
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid with Visual Score Ring (Prompt #14) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lead) => {
          const isHot = lead.tier === "HOT";
          const isWarm = lead.tier === "WARM";

          return (
            <div
              key={lead.id}
              className={cn(
                "glass-panel glass-panel-hover rounded-2xl p-5 border flex flex-col justify-between relative group",
                isHot
                  ? "border-amber-500/30 shadow-lg shadow-amber-950/20 bg-gradient-to-b from-amber-950/10 to-transparent"
                  : isWarm
                  ? "border-blue-500/20"
                  : "border-white/5 opacity-80"
              )}
            >
              <div>
                {/* Header: Name, Company, Tier Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                      {lead.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">{lead.company}</p>
                    <span className="text-[10px] text-slate-400">{lead.title}</span>
                  </div>

                  {/* Tier Badge */}
                  <span
                    className={cn(
                      "text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1",
                      isHot
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                        : isWarm
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "bg-slate-700/30 text-slate-400 border border-slate-600/30"
                    )}
                  >
                    {isHot && "🔥"} {lead.tier}
                  </span>
                </div>

                {/* Score Section: Visual Score Ring + Telemetry Breakdown */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 my-3">
                  {/* Visual SVG Score Ring */}
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke={isHot ? "#f59e0b" : isWarm ? "#3b82f6" : "#64748b"}
                        strokeWidth="3.2"
                        strokeDasharray={`${(lead.score / 100) * 94.2} 94.2`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-mono font-black text-sm text-white leading-none">
                        {lead.score}
                      </span>
                      <span className="text-[8px] text-slate-400">/100</span>
                    </div>
                  </div>

                  {/* Telemetry Breakdown (Fit, Engagement, Intent) */}
                  <div className="flex-1 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Fit</span>
                      <span className="font-mono font-bold text-slate-200">{lead.fitWeight}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${lead.fitWeight}%` }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Engagement</span>
                      <span className="font-mono font-bold text-slate-200">{lead.engagementWeight}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                      <div className="bg-blue-400 h-full rounded-full" style={{ width: `${lead.engagementWeight}%` }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Intent</span>
                      <span className="font-mono font-bold text-slate-200">{lead.intentWeight}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${lead.intentWeight}%` }} />
                    </div>
                  </div>
                </div>

                {/* Uncontacted warning & Value */}
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-cyan-400" /> Uncontacted:
                    <strong className={lead.uncontactedDays >= 3 ? "text-rose-400" : "text-emerald-400"}>
                      {lead.uncontactedDays} {lead.uncontactedDays === 1 ? "day" : "days"}
                    </strong>
                  </span>
                  <span className="font-mono font-bold text-cyan-300">
                    Est: {formatINR(lead.value, true)}
                  </span>
                </div>

                {/* Activity note */}
                <p className="text-[11px] text-slate-300 bg-black/30 p-2 rounded-lg border border-white/5 mt-2 line-clamp-2">
                  <span className="text-cyan-400 font-semibold">Signal: </span>
                  {lead.lastActivity}
                </p>
              </div>

              {/* Quick Actions Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      openSoftphoneWith({
                        name: lead.name,
                        company: lead.company,
                        phone: lead.phone,
                      })
                    }
                    className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors"
                    title="Call via Softphone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      openSoftphoneWith({
                        name: lead.name,
                        company: lead.company,
                        phone: lead.phone,
                      })
                    }
                    className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors"
                    title="WhatsApp Outbound"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setCopilotOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>AI Outreach</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
