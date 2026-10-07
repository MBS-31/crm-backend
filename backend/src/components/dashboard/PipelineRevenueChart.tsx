"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart2, Calendar } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

const revenueTrendData = [
  { month: "May", arr: 84000000, pipeline: 220000000 },
  { month: "Jun", arr: 92000000, pipeline: 260000000 },
  { month: "Jul", arr: 98000000, pipeline: 290000000 },
  { month: "Aug", arr: 108000000, pipeline: 340000000 },
  { month: "Sep", arr: 119000000, pipeline: 390000000 },
  { month: "Oct", arr: 128000000, pipeline: 426000000 },
];

const pipelineStageData = [
  { stage: "Discovery", value: 42000000, deals: 34, color: "#38bdf8" },
  { stage: "Proposal", value: 168000000, deals: 48, color: "#818cf8" },
  { stage: "Negotiation", value: 185000000, deals: 32, color: "#c084fc" },
  { stage: "Closed Won", value: 31000000, deals: 14, color: "#34d399" },
];

export default function PipelineRevenueChart() {
  const [activeTab, setActiveTab] = useState<"revenue" | "stages">("revenue");

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
      {/* Chart Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Revenue Velocity & Pipeline Health
          </h3>
          <p className="text-[11px] text-slate-400">
            Historical ARR trajectory and weighted stage distribution
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab("revenue")}
            className={cn(
              "px-3 py-1 rounded-lg font-medium transition-colors",
              activeTab === "revenue"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Revenue Forecast
          </button>
          <button
            onClick={() => setActiveTab("stages")}
            className={cn(
              "px-3 py-1 rounded-lg font-medium transition-colors",
              activeTab === "stages"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Pipeline Stages
          </button>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="h-64 w-full my-3">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === "revenue" ? (
            <AreaChart
              data={revenueTrendData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#64748b" textAnchor="end" tick={{ fontSize: 11 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `₹${(val / 10000000).toFixed(0)}Cr`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl bg-[#0e1628] border border-white/10 p-3 text-xs shadow-2xl space-y-1.5">
                        <div className="font-bold text-white border-b border-white/10 pb-1">
                          {label} 2026 Metrics
                        </div>
                        <div className="text-cyan-400 flex items-center justify-between gap-4">
                          <span>Total ARR:</span>
                          <span className="font-mono font-bold">
                            {formatINR(payload[0].value as number, true)}
                          </span>
                        </div>
                        <div className="text-violet-400 flex items-center justify-between gap-4">
                          <span>Total Pipeline:</span>
                          <span className="font-mono font-bold">
                            {formatINR(payload[1].value as number, true)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="arr"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorArr)"
                name="ARR"
              />
              <Area
                type="monotone"
                dataKey="pipeline"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorPipeline)"
                name="Pipeline"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={pipelineStageData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="stage" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `₹${(val / 10000000).toFixed(0)}Cr`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl bg-[#0e1628] border border-white/10 p-3 text-xs shadow-2xl">
                        <div className="font-bold text-white mb-1">{data.stage} Stage</div>
                        <div className="text-cyan-400 font-mono font-bold text-sm">
                          {formatINR(data.value, true)}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {data.deals} Active Deals
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#0284c7" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Metric summary badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/5 text-xs">
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-slate-400 block">ARR Run-rate</span>
          <span className="font-mono font-bold text-cyan-300">₹12.8 Cr</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-slate-400 block">Negotiation Stage</span>
          <span className="font-mono font-bold text-violet-300">₹18.5 Cr</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-slate-400 block">Average Deal Cycle</span>
          <span className="font-mono font-bold text-emerald-300">28 Days</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-slate-400 block">Win Rate</span>
          <span className="font-mono font-bold text-amber-300">38.4%</span>
        </div>
      </div>
    </div>
  );
}
