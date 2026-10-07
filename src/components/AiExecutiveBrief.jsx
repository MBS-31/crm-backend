import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Flame, 
  UserCheck, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import gsap from 'gsap';

export default function AiExecutiveBrief() {
  const { setActiveTab, setCopilotOpen } = useCrmStore();

  const handleAskAi = () => {
    setCopilotOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Salutation & Key Brief Insights */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              AI EXECUTIVE BRIEFING • 07 OCT 2026
            </span>
            <span className="text-slate-400 text-xs font-mono">08:00 AM REVENUE DIGEST</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Good Morning, Margaret 👋
          </h2>

          {/* Core Bullet Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +12%
              </span>
              <span className="text-slate-300">Total Revenue pacing ahead of target</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 4 Deals
              </span>
              <span className="text-slate-300">At-risk of slip (Stark Logistics & FinTech)</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2">
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <Flame className="w-4 h-4" /> 7 Leads
              </span>
              <span className="text-slate-300">High-value leads require contact within 4h</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2">
              <span className="text-purple-400 font-bold flex items-center gap-1">
                <Zap className="w-4 h-4" /> Team A
              </span>
              <span className="text-slate-300">Sales Team A is 18% above monthly quota</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
          <button
            onClick={() => setActiveTab('radar')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>View Opportunity Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleAskAi}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Ask Copilot: "What needs attention?"</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_agent')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Execute Auto-Followups (17 Leads)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
