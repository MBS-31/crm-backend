"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Radar,
  Flame,
  AlertTriangle,
  TrendingUp,
  HeartPulse,
  Clock,
  Zap,
  Filter,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { mockRadarMetrics } from "@/data/mockData";
import { useUIStore, useCopilotStore } from "@/stores";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

function RadarContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter);
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const filterTabs = [
    { id: "all", label: "All Anomalies & Opportunities", count: mockRadarMetrics.items.length, icon: Radar },
    { id: "hot_lead", label: "🔥 Hot Leads", count: mockRadarMetrics.hotLeadsCount, icon: Flame },
    { id: "at_risk_deal", label: "⚠ At-Risk Deals", count: mockRadarMetrics.atRiskDealsCount, icon: AlertTriangle },
    { id: "upsell_candidate", label: "💰 Upsell Candidates", count: mockRadarMetrics.upsellCandidatesCount, icon: TrendingUp },
    { id: "churn_alert", label: "🚨 Churn Alerts", count: mockRadarMetrics.churnAlertsCount, icon: HeartPulse },
    { id: "overdue_followup", label: "📅 Overdue Follow-ups", count: mockRadarMetrics.overdueFollowupsCount, icon: Clock },
  ];

  const filteredItems = mockRadarMetrics.items.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "hot" && item.category === "hot_lead") return true;
    if (selectedCategory === "overdue" && item.category === "overdue_followup") return true;
    return item.category === selectedCategory;
  });

  const handleAction = (item: (typeof mockRadarMetrics.items)[0]) => {
    if (item.actionText.includes("Call")) {
      openSoftphoneWith({
        name: "Rahul Sharma",
        company: "ABC Enterprise",
        phone: "+91 98201 44521",
      });
    } else {
      setCopilotOpen(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Radar className="w-5 h-5 animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              AI Opportunity Radar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Predictive telemetry scoring deals, churn risks, upsells, and overdue SLAs.
          </p>
        </div>

        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Ask AI to Prioritize Today</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-950/40"
                  : "bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                  isSelected
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "bg-white/10 text-slate-300"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Radar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/5 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      item.riskLevel === "critical"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : item.riskLevel === "warning"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    )}
                  >
                    {item.category.replace("_", " ")}
                  </span>
                  {item.value && (
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {item.value}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Detected: Just now
                </span>
                <button
                  onClick={() => handleAction(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.actionText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RadarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Opportunity Radar...</div>}>
      <RadarContent />
    </Suspense>
  );
}
