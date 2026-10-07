"use client";

import React, { useState } from "react";
import { mockCallRecording } from "@/data/mockData";
import { useUIStore } from "@/stores";
import {
  PhoneCall,
  Play,
  Pause,
  Volume2,
  CheckSquare,
  Square,
  Sparkles,
  Activity,
  HardDrive,
  Clock,
  User,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CallsPage() {
  const [call, setCall] = useState(mockCallRecording);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState("01:14");
  const { openSoftphoneWith } = useUIStore();

  const toggleActionItem = (actId: string) => {
    setCall((prev) => ({
      ...prev,
      actionItems: prev.actionItems.map((item) =>
        item.id === actId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Call Intelligence & Speech Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated sentiment detection, speech ratios, MinIO object storage, and actionable task extraction.
          </p>
        </div>

        <button
          onClick={() =>
            openSoftphoneWith({
              name: call.contactName,
              company: call.company,
              phone: "+91 98201 44521",
            })
          }
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Launch WebRTC Softphone</span>
        </button>
      </div>

      {/* Top Call Telemetry Cards (Prompt #20 & #21) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Duration
          </span>
          <div className="text-xl font-mono font-black text-white mt-1">04:32</div>
          <span className="text-[10px] text-slate-400">272 Seconds</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Sentiment
          </span>
          <div className="text-xl font-black text-emerald-400 mt-1">Positive</div>
          <span className="text-[10px] text-emerald-300">88% Confidence</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Talk / Listen Ratio
          </span>
          <div className="text-xl font-mono font-black text-cyan-300 mt-1">
            42% / 58%
          </div>
          <span className="text-[10px] text-emerald-400">Within Optimal Zone</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Silence Moments
          </span>
          <div className="text-xl font-mono font-black text-white mt-1">
            {call.silenceCount}
          </div>
          <span className="text-[10px] text-slate-400">Average pause: 1.8s</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-cyan-400" /> MinIO Object Key
          </span>
          <div className="text-xs font-mono text-cyan-300 mt-1 truncate">
            call_rahul_abc_101.wav
          </div>
          <span className="text-[10px] text-slate-400">Encrypted in Mumbai S3</span>
        </div>
      </div>

      {/* Audio Player Strip */}
      <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-[#0b1020] flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div className="flex-1 w-full space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-bold">{currentPlayTime}</span>
            <span className="text-slate-400">04:32</span>
          </div>

          {/* Waveform Visualization Bars */}
          <div className="flex items-center gap-1 h-8 px-1">
            {[
              24, 40, 60, 30, 45, 80, 95, 65, 40, 20, 50, 75, 90, 85, 40, 25, 60, 70, 80, 50, 30, 65,
              85, 90, 45, 30, 55, 75, 60, 40, 30, 50, 70, 85, 90, 60, 40, 20, 35, 60, 80, 70, 50, 30,
            ].map((height, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-full transition-colors",
                  i < 14 ? "bg-cyan-400" : "bg-white/10"
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Analysis Grid: Transcript vs AI Summary & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Synchronized Call Transcript (lg:col-span-7) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              Synchronized Call Transcript
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Diarized
              </span>
            </h3>
            <span className="text-xs text-slate-400">Speaker Segmentation Complete</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
            {call.transcript.map((item, idx) => {
              const isRep = item.speaker === "Sales Rep";
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-xl border text-xs leading-relaxed space-y-1",
                    isRep
                      ? "bg-blue-950/20 border-blue-500/20 ml-4"
                      : "bg-[#11192e] border-white/5 mr-4"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-bold text-[11px]",
                        isRep ? "text-cyan-400" : "text-emerald-400"
                      )}
                    >
                      {item.speaker}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-slate-200">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Executive Summary & Action Items (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Call Summary (Prompt #21) */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Call Synthesis
            </h3>
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-200 leading-relaxed">
              {call.aiSummary}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
              <span className="font-bold text-emerald-400 block mb-0.5">
                Recommended Next Step:
              </span>
              <p className="text-slate-300">{call.recommendedNextStep}</p>
            </div>
          </div>

          {/* Action Items Checklist (Prompt #21) */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Action Items Extracted
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {call.actionItems.filter((a) => a.completed).length} / {call.actionItems.length} Done
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {call.actionItems.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleActionItem(act.id)}
                  className={cn(
                    "p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all",
                    act.completed
                      ? "bg-white/[0.02] border-white/5 text-slate-400 line-through"
                      : "bg-[#11192e] border-white/10 text-slate-100 hover:border-cyan-500/30"
                  )}
                >
                  {act.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{act.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
