"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  AlertTriangle,
  TrendingUp,
  HeartPulse,
  Clock,
  ArrowRight,
  Radar,
  Zap,
} from "lucide-react";
import { mockRadarMetrics } from "@/data/mockData";
import { useUIStore } from "@/stores";

export default function OpportunityRadarCard() {
  const router = useRouter();
  const { openSoftphoneWith } = useUIStore();

  const categories = [
    {
      id: "hot_lead",
      label: "Hot Leads",
      count: mockRadarMetrics.hotLeadsCount,
      icon: Flame,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      badgeColor: "bg-amber-500/20 text-amber-300",
      filterPath: "/leads?filter=hot",
    },
    {
      id: "upsell",
      label: "Upsell Candidates",
      count: mockRadarMetrics.upsellCandidatesCount,
      icon: TrendingUp,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
      filterPath: "/customers?filter=expansion",
    },
    {
      id: "at_risk_deal",
      label: "At-Risk Deals",
      count: mockRadarMetrics.atRiskDealsCount,
      icon: AlertTriangle,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      badgeColor: "bg-rose-500/20 text-rose-300",
      filterPath: "/deals?filter=risk_high",
    },
    {
      id: "churn",
      label: "Churn Alerts",
      count: mockRadarMetrics.churnAlertsCount,
      icon: HeartPulse,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      badgeColor: "bg-red-500/20 text-red-300",
      filterPath: "/customers?filter=at_risk",
    },
    {
      id: "overdue",
      label: "Overdue Follow-ups",
      count: mockRadarMetrics.overdueFollowupsCount,
      icon: Clock,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      badgeColor: "bg-violet-500/20 text-violet-300",
      filterPath: "/radar?filter=overdue",
    },
  ];

  const handleAction = (item: (typeof mockRadarMetrics.items)[0]) => {
    if (item.actionText.includes("Call")) {
      openSoftphoneWith({
        name: "Rahul Sharma",
        company: "ABC Enterprise",
        phone: "+91 98201 44521",
      });
    } else if (item.actionText.includes("Proposal") || item.actionText.includes("Deal")) {
      router.push("/deals");
    } else if (item.actionText.includes("Email")) {
      router.push("/inbox?channel=email");
    } else {
      router.push(`/customers/${item.entityId}`);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Radar className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              Opportunity Radar
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                AI Prioritized
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time anomaly & revenue opportunity detections
            </p>
          </div>
        </div>
        <Link
          href="/radar"
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 5 Radar Category Summary Rows */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.filterPath}
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all text-left flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg border ${cat.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-xs font-mono font-bold px-1.5 py-0.2 rounded-full ${cat.badgeColor}`}>
                  {cat.count}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Top 3 Live Radar Signals */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Top Actionable Signals
        </div>
        {mockRadarMetrics.items.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded-xl bg-[#0c1222]/80 border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between gap-3 text-xs"
          >
            <div className="min-w-0">
              <div className="font-semibold text-slate-200 truncate flex items-center gap-1.5">
                {item.title}
                {item.value && (
                  <span className="text-[10px] font-mono text-cyan-400">({item.value})</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate">{item.subtitle}</p>
            </div>
            <button
              onClick={() => handleAction(item)}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium transition-colors"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{item.actionText}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
