import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  RefreshCw, 
  ArrowUpRight 
} from 'lucide-react';

export default function WhatIfSimulatorView() {
  const [conversionRate, setConversionRate] = useState(16); // percentage
  const [avgDealSize, setAvgDealSize] = useState(28); // in Lakhs
  const [leadVolume, setLeadVolume] = useState(120); // leads/mo

  // Calculations
  const baselineRevenue = (120 * 0.12 * 25).toFixed(1); // 12% conv, 25L deal = 36.0L
  const simulatedDeals = Math.round((leadVolume * conversionRate) / 100);
  const projectedRevenue = (simulatedDeals * avgDealSize).toFixed(1);
  const delta = (projectedRevenue - baselineRevenue).toFixed(1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            What-If Sales & Revenue Simulator
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Dynamic Monte Carlo Projection
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Simulate revenue shifts by adjusting conversion velocity, lead velocity, and average enterprise deal sizes
          </p>
        </div>

        <button
          onClick={() => {
            setConversionRate(14);
            setAvgDealSize(28);
            setLeadVolume(120);
          }}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Simulator Inputs & Result Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sliders */}
        <div className="lg:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-5">
          {/* Slider 1: Conversion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">1. Lead-to-Deal Conversion Rate</span>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {conversionRate}% (Baseline: 12%)
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="30"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>8% (Low)</span>
              <span>12% (Current)</span>
              <span>30% (High Velocity)</span>
            </div>
          </div>

          {/* Slider 2: Average Deal Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">2. Average Enterprise Deal Size</span>
              <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                ₹{avgDealSize} Lakhs (Baseline: ₹25L)
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              value={avgDealSize}
              onChange={(e) => setAvgDealSize(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹15 Lakhs</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          {/* Slider 3: Monthly Inbound Lead Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">3. Monthly Inbound Lead Volume</span>
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {leadVolume} Leads / mo
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              value={leadVolume}
              onChange={(e) => setLeadVolume(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50 Leads</span>
              <span>120 Leads</span>
              <span>300 Leads</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Dynamic Projected Revenue Card */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 shadow-md">
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block font-mono">
              Simulated Forecast Result
            </span>
            <div className="mt-2">
              <span className="text-3xl font-extrabold text-white font-mono block">
                ₹{projectedRevenue}L
              </span>
              <span className="text-xs text-slate-400">
                Projected Quarterly Revenue
              </span>
            </div>
          </div>

          {/* Delta Comparison */}
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Baseline Forecast:</span>
              <span className="font-mono text-slate-300">₹{baselineRevenue}L</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Potential Revenue Delta:
              </span>
              <span className="font-mono text-emerald-400">
                {delta >= 0 ? `+₹${delta}L` : `-₹${Math.abs(delta)}L`}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-snug italic pt-2 border-t border-slate-800">
            "Increasing conversion from 12% to {conversionRate}% with an average deal size of ₹{avgDealSize}L yields a projected increase of +₹{delta}L in closed revenue."
          </div>
        </div>
      </div>
    </div>
  );
}
