"use client";

import React, { useState } from "react";
import KpiCards from "@/components/dashboard/KpiCards";
import OpportunityRadarCard from "@/components/dashboard/OpportunityRadarCard";
import CustomerHealthCard from "@/components/dashboard/CustomerHealthCard";
import PipelineRevenueChart from "@/components/dashboard/PipelineRevenueChart";
import HotOpportunitiesCard from "@/components/dashboard/HotOpportunitiesCard";
import { useUIStore, useCopilotStore } from "@/stores";
import { RefreshCw, Sparkles, Filter, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { activeTimeframe, setActiveTimeframe } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const timeframes: ("Today" | "This Week" | "This Month" | "This Quarter" | "Custom")[] = [
    "Today",
    "This Week",
    "This Month",
    "This Quarter",
    "Custom",
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Greeting & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Good morning, Rahul 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here&apos;s your AI-powered enterprise business overview.
          </p>
        </div>

        {/* Timeframe & Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector pill */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-medium transition-colors",
                  activeTimeframe === tf
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Refresh Intelligence Metrics"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5 text-cyan-400", isRefreshing && "animate-spin")}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Global AI Intelligence Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-violet-950/40 border border-cyan-500/30 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                ✨ AI Real-Time Synthesis
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  98.4% Confidence
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                3 high-value enterprise accounts are due for strategic follow-up. Deal momentum in BFSI sector is tracking +28% ahead of target.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCopilotOpen(true)}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <span>Ask Copilot for Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Section 1: KPI Command Cards (Prompt #9) */}
      <KpiCards />

      {/* Section 2: AI Opportunity Radar & Customer Health (Prompt #10, #11) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OpportunityRadarCard />
        <CustomerHealthCard />
      </div>

      {/* Section 3: Interactive Sales Pipeline & Revenue Velocity (Prompt #15, #27) */}
      <PipelineRevenueChart />

      {/* Section 4: Hot Opportunities & AI Recommended Actions (Prompt #48) */}
      <HotOpportunitiesCard />
    </div>
  );
}
