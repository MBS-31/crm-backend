"use client";

import React, { useState } from "react";
import { mockDeals } from "@/data/mockData";
import { Deal, DealStage } from "@/types";
import { formatINR } from "@/lib/utils";
import { useUIStore, useCopilotStore } from "@/stores";
import {
  Briefcase,
  Plus,
  Filter,
  Search,
  AlertTriangle,
  Sparkles,
  Calendar,
  User,
  ArrowRight,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const KANBAN_STAGES: DealStage[] = [
  "DISCOVERY",
  "PROPOSAL",
  "NEGOTIATION",
  "CLOSED WON",
  "CLOSED LOST",
];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [riskFilter, setRiskFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const handleStageChange = (dealId: string, newStage: DealStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );
  };

  const filteredDeals = deals.filter((d) => {
    const matchesRisk = riskFilter === "ALL" ? true : d.risk === riskFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.company.toLowerCase().includes(search.toLowerCase()) ||
      d.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const totalPipeline = filteredDeals.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title & Pipeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Enterprise Sales Pipeline
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active stages with deal intelligence, close risk scoring, and prescriptive actions.
          </p>
        </div>

        {/* Total Pipeline Counter */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 text-right">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
              Filtered Pipeline Value
            </span>
            <span className="text-lg font-mono font-black text-cyan-300">
              {formatINR(totalPipeline, true)}
            </span>
          </div>

          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Deal Review</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals by title, company, or sponsor..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        {/* Risk Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          <span className="text-slate-400 text-[11px] px-2">Risk:</span>
          {["ALL", "LOW", "MEDIUM", "HIGH"].map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-colors",
                riskFilter === r
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-start overflow-x-auto pb-4">
        {KANBAN_STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={stage}
              className="glass-panel rounded-2xl p-3 border border-white/5 flex flex-col gap-3 min-w-[270px] bg-[#0c1222]/70"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-wider uppercase">
                    {stage}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {formatINR(stageValue, true)}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deals in Stage */}
              <div className="space-y-3">
                {stageDeals.map((deal) => {
                  const isHighRisk = deal.risk === "HIGH";

                  return (
                    <div
                      key={deal.id}
                      className={cn(
                        "p-3.5 rounded-xl border bg-[#0f172a] hover:border-cyan-500/40 transition-all text-xs space-y-2 group",
                        isHighRisk ? "border-rose-500/30 shadow-md shadow-rose-950/20" : "border-white/10"
                      )}
                    >
                      {/* Deal title & Risk badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                            {deal.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {deal.company}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0",
                            deal.risk === "HIGH"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : deal.risk === "MEDIUM"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          )}
                        >
                          {deal.risk}
                        </span>
                      </div>

                      {/* Amount & Probability */}
                      <div className="flex items-center justify-between font-mono py-1">
                        <span className="font-black text-sm text-cyan-300">
                          {formatINR(deal.amount, true)}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {deal.probability}% Win Prob
                        </span>
                      </div>

                      {/* AI Insight Box (Prompt #16) */}
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] space-y-1">
                        <div className="text-slate-300 font-medium line-clamp-2">
                          {deal.aiInsight}
                        </div>
                        <div className="text-cyan-400 font-semibold line-clamp-1">
                          ↳ {deal.recommendedAction}
                        </div>
                      </div>

                      {/* Bottom Footer: Closing Date & Stage Mover */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          {deal.closeDate}
                        </span>

                        {/* Interactive Move Stage Dropdown */}
                        <select
                          value={deal.stage}
                          onChange={(e) =>
                            handleStageChange(deal.id, e.target.value as DealStage)
                          }
                          className="bg-white/5 text-slate-300 text-[10px] rounded px-1.5 py-0.5 border border-white/10 focus:outline-none focus:border-cyan-500"
                        >
                          {KANBAN_STAGES.map((s) => (
                            <option key={s} value={s} className="bg-slate-900 text-white">
                              Move: {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}

                {stageDeals.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-[11px]">
                    No deals in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
