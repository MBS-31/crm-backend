"use client";

import React, { useState, useEffect } from "react";
import { simulatorService } from "@/services/simulator";
import { SimulatorProjection } from "@/types";
import { formatINR } from "@/lib/utils";
import {
  Sliders,
  TrendingUp,
  Target,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SimulatorPage() {
  const [leadVolume, setLeadVolume] = useState(1000);
  const [conversionRate, setConversionRate] = useState(12);
  const [avgDealSize, setAvgDealSize] = useState(500000);
  const [projection, setProjection] = useState<SimulatorProjection | null>(null);

  useEffect(() => {
    simulatorService
      .calculate({
        leadVolume,
        conversionRate,
        avgDealSize,
      })
      .then((res) => setProjection(res));
  }, [leadVolume, conversionRate, avgDealSize]);

  const handleReset = () => {
    setLeadVolume(1000);
    setConversionRate(12);
    setAvgDealSize(500000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              What-If Sales & Revenue Simulator
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Model pipeline scenarios dynamically across lead volume, win conversion rates, and contract values.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Inputs & Sliders (lg:col-span-5) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 pb-3 border-b border-white/5">
            Scenario Parameters
          </h3>

          {/* Slider 1: Lead Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">Lead Volume</label>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {leadVolume.toLocaleString()} Leads
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={50}
              value={leadVolume}
              onChange={(e) => setLeadVolume(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>100</span>
              <span>2,500</span>
              <span>5,000</span>
            </div>
          </div>

          {/* Slider 2: Conversion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">Conversion Rate</label>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {conversionRate}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={0.5}
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1%</span>
              <span>20%</span>
              <span>40%</span>
            </div>
          </div>

          {/* Slider 3: Average Deal Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300">Average Deal Size</label>
              <span className="font-mono font-bold text-amber-300 text-sm">
                {formatINR(avgDealSize, true)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={5000000}
              step={50000}
              value={avgDealSize}
              onChange={(e) => setAvgDealSize(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹1L</span>
              <span>₹25L</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* Prescriptive Insight Box */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-bold block mb-1">
              ✨ AI Simulation Telemetry:
            </span>
            Increasing conversion rate by just 2% yields an incremental ₹1.0 Cr in net ARR without requiring additional inbound marketing budget.
          </div>
        </div>

        {/* Right Column: Output Projections & Forecast Chart (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Output KPI Cards (Prompt #26: Projected Revenue ₹6.0 Cr, Expected Wins 120, Conversion 12%) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Projected Revenue
              </span>
              <div className="text-2xl font-mono font-black text-white mt-1">
                {projection ? formatINR(projection.projectedRevenue, true) : "₹6.0 Cr"}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {projection ? `+${projection.deltaPercent}% vs Baseline` : "+25%"}
              </span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Expected Wins
              </span>
              <div className="text-2xl font-mono font-black text-cyan-300 mt-1">
                {projection?.expectedWins || 120}
              </div>
              <span className="text-[10px] text-slate-400">Contracts Closed</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Win Rate
              </span>
              <div className="text-2xl font-mono font-black text-amber-300 mt-1">
                {conversionRate}%
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">High Velocity</span>
            </div>
          </div>

          {/* Projected Revenue 6-Month Chart */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Projected Revenue vs Historical Baseline
            </h4>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={projection?.monthlyProjections || []}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="projColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(val) => `₹${(val / 10000000).toFixed(1)}Cr`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-xl bg-[#0e1628] border border-white/10 p-3 text-xs shadow-2xl">
                            <div className="font-bold text-white mb-1">{label} Forecast</div>
                            <div className="text-cyan-400 font-mono">
                              Projected: {formatINR(payload[0].value as number, true)}
                            </div>
                            <div className="text-slate-400 font-mono text-[10px] mt-0.5">
                              Target Baseline: {formatINR(payload[1].value as number, true)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    fill="url(#projColor)"
                    name="Projected"
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#64748b"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    fill="none"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
