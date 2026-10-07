"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  UserCheck,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiItem {
  id: string;
  title: string;
  value: string;
  rawNum: number;
  prefix?: string;
  suffix?: string;
  change: string;
  trend: "up" | "down";
  isPositive: boolean;
  icon: React.ElementType;
  color: string;
  tooltip: string;
  sparkline: number[];
}

const kpis: KpiItem[] = [
  {
    id: "arr",
    title: "Total ARR",
    value: "₹12.8 Cr",
    rawNum: 12.8,
    prefix: "₹",
    suffix: " Cr",
    change: "↑ 18.4%",
    trend: "up",
    isPositive: true,
    icon: Sparkles,
    color: "from-cyan-500 to-blue-600",
    tooltip: "Annual Recurring Revenue across all active subscriptions",
    sparkline: [20, 24, 28, 32, 35, 42, 48, 55],
  },
  {
    id: "pipeline",
    title: "Pipeline Value",
    value: "₹42.6 Cr",
    rawNum: 42.6,
    prefix: "₹",
    suffix: " Cr",
    change: "↑ 15.2%",
    trend: "up",
    isPositive: true,
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-600",
    tooltip: "Total weighted value of deals currently in active pipeline",
    sparkline: [30, 28, 35, 40, 38, 44, 49, 52],
  },
  {
    id: "deals",
    title: "Active Deals",
    value: "128",
    rawNum: 128,
    change: "↑ 12%",
    trend: "up",
    isPositive: true,
    icon: Briefcase,
    color: "from-emerald-500 to-teal-600",
    tooltip: "Deals currently in Discovery, Proposal or Negotiation stages",
    sparkline: [80, 92, 105, 110, 118, 122, 128],
  },
  {
    id: "hot_leads",
    title: "Hot Leads",
    value: "64",
    rawNum: 64,
    change: "↑ 24%",
    trend: "up",
    isPositive: true,
    icon: UserCheck,
    color: "from-amber-500 to-orange-600",
    tooltip: "Leads with predictive AI score exceeding 80/100",
    sparkline: [35, 42, 40, 50, 54, 58, 64],
  },
  {
    id: "at_risk",
    title: "At-Risk Customers",
    value: "18",
    rawNum: 18,
    change: "↓ 7%",
    trend: "down",
    isPositive: true, // Decreasing at-risk is good
    icon: AlertTriangle,
    color: "from-rose-500 to-red-600",
    tooltip: "Customers with health score below 50 or elevated churn risk",
    sparkline: [28, 25, 24, 22, 20, 19, 18],
  },
  {
    id: "overdue",
    title: "Overdue Follow-ups",
    value: "23",
    rawNum: 23,
    change: "↓ 12%",
    trend: "down",
    isPositive: true, // Decreasing overdue is good
    icon: Clock,
    color: "from-violet-500 to-purple-600",
    tooltip: "Tasks and touchpoints pending past the designated SLA deadline",
    sparkline: [34, 30, 28, 26, 25, 24, 23],
  },
];

export default function KpiCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".kpi-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5"
    >
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="kpi-card glass-panel glass-panel-hover rounded-2xl p-4 flex flex-col justify-between relative group overflow-hidden border border-white/5"
            title={kpi.tooltip}
          >
            {/* Ambient top border glow */}
            <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity", kpi.color)} />

            {/* Title & Icon Header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {kpi.title}
              </span>
              <div
                className={cn(
                  "p-2 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300 group-hover:text-white transition-colors"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Value Counter */}
            <div className="my-2.5">
              <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-1">
                {kpi.value}
              </div>
            </div>

            {/* Trend & Sparkline */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <div
                className={cn(
                  "flex items-center gap-1 text-[11px] font-semibold",
                  kpi.isPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{kpi.change}</span>
              </div>

              {/* Mini Sparkline SVG */}
              <svg className="w-14 h-4 overflow-visible shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                <polyline
                  fill="none"
                  stroke={kpi.isPositive ? "#34d399" : "#fb7185"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={kpi.sparkline
                    .map((val, idx) => {
                      const min = Math.min(...kpi.sparkline);
                      const max = Math.max(...kpi.sparkline);
                      const x = (idx / (kpi.sparkline.length - 1)) * 52;
                      const y = 14 - ((val - min) / (max - min || 1)) * 12;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
