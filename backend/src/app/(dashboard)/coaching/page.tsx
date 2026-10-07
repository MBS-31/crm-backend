"use client";

import React, { useState } from "react";
import { mockSalesCoaching } from "@/data/mockData";
import {
  Award,
  Star,
  TrendingUp,
  PhoneCall,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoachingPage() {
  const [reps] = useState(mockSalesCoaching);
  const [selectedRepId, setSelectedRepId] = useState(reps[0].id);

  const selectedRep = reps.find((r) => r.id === selectedRepId) || reps[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              AI Sales Coaching & Enablement
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Speech pattern analysis, talk-listen ratios, objection resolution metrics, and personalized coaching tracks.
          </p>
        </div>
      </div>

      {/* Sales Rep Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reps.map((rep) => {
          const isSelected = rep.id === selectedRep.id;

          return (
            <div
              key={rep.id}
              onClick={() => setSelectedRepId(rep.id)}
              className={cn(
                "glass-panel rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between",
                isSelected
                  ? "bg-cyan-500/15 border-cyan-500/40 shadow-xl shadow-cyan-950/30"
                  : "bg-[#0b1020]/70 border-white/5 hover:border-white/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                  <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center font-bold text-white text-sm">
                    {rep.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{rep.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < Math.floor(rep.rating) ? "fill-amber-400" : "text-slate-600"
                        )}
                      />
                    ))}
                    <span className="text-[11px] font-mono font-bold text-slate-300 ml-1">
                      {rep.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Quota Pacing</span>
                <span className="font-mono font-bold text-sm text-cyan-300">
                  {rep.quotaPacing}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Rep Detailed Scorecard (Prompt #22) */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white">{selectedRep.name}</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
              Account Executive
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">
              Win Rate: <strong className="text-emerald-400 font-mono">{selectedRep.winRate}%</strong>
            </span>
            <span className="text-slate-400">
              Analyzed Calls: <strong className="text-white font-mono">{selectedRep.recentCallsCount}</strong>
            </span>
          </div>
        </div>

        {/* 4 Core Pillars: Quota Pacing, Talk Ratio, Listen Ratio, Objection Handling */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Quota Pacing
            </span>
            <div className="text-2xl font-mono font-black text-cyan-300 mt-1">
              {selectedRep.quotaPacing}%
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${selectedRep.quotaPacing}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Talk Ratio
            </span>
            <div className="text-2xl font-mono font-black text-white mt-1">
              {selectedRep.talkRatio}%
            </div>
            <span className="text-[10px] text-slate-400">Target: 40-46%</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Listen Ratio
            </span>
            <div className="text-2xl font-mono font-black text-emerald-400 mt-1">
              {selectedRep.listenRatio}%
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Active Listening</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Objection Handling
            </span>
            <div className="text-2xl font-mono font-black text-amber-300 mt-1">
              {selectedRep.objectionHandling}%
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${selectedRep.objectionHandling}%` }}
              />
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Core Strengths
            </h4>
            <div className="space-y-1.5 text-xs text-slate-200">
              {selectedRep.strengths.map((str, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Areas for Growth
            </h4>
            <div className="space-y-1.5 text-xs text-slate-200">
              {selectedRep.weaknesses.map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Coaching Recommendations */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Prescriptive AI Coaching Plan
          </h4>
          <div className="space-y-2 text-xs text-slate-200">
            {selectedRep.coachingRecommendations.map((rec, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-start gap-2"
              >
                <span className="text-cyan-400 font-bold">#{i + 1}</span>
                <p className="text-slate-300 leading-snug">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
