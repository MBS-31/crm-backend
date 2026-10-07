"use client";

import React, { useState } from "react";
import { agentsService } from "@/services/agents";
import { AIAgentExecution } from "@/types";
import {
  Bot,
  Sparkles,
  Play,
  CheckCircle,
  Clock,
  ShieldCheck,
  FileText,
  RotateCcw,
  Send,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  const [prompt, setPrompt] = useState(
    "Find all high-value leads that haven't been contacted for 3 days and create follow-up tasks."
  );
  const [execution, setExecution] = useState<AIAgentExecution | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleGeneratePlan = async () => {
    if (!prompt.trim()) return;
    setIsPlanning(true);
    try {
      const plan = await agentsService.generatePlan(prompt);
      setExecution(plan);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleExecute = async () => {
    if (!execution) return;
    setIsExecuting(true);
    try {
      const result = await agentsService.executePlan(execution.id);
      setExecution(result);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    setExecution(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Autonomous AI Agent Execution Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Goal-oriented autonomous agents with strict Human-in-the-Loop approval and immutable audit logs.
          </p>
        </div>
      </div>

      {/* Hero Task Dispatcher Box (Prompt #23: What should I do for you?) */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-r from-[#0d162d] to-[#0b1020] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            What should I do for you?
          </label>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
            Agent Mode: Supervised
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Instruct the AI agent (e.g., 'Find all at-risk accounts, verify SLA health, and prepare outreach')..."
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={handleGeneratePlan}
            disabled={isPlanning || !prompt.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPlanning ? "Synthesizing Plan..." : "Synthesize Plan"}</span>
          </button>
        </div>

        {/* Quick Example Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
          <span className="shrink-0">Suggestions:</span>
          {[
            "Find all high-value leads uncontacted for 3 days and create tasks",
            "Audit all deals closing this month with High Risk flags",
            "Identify healthy customers with >90% seat utilization for upsell",
          ].map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 truncate max-w-xs transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Execution Lifecycle: Plan → Approval → Execution → Audit Report */}
      {execution && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Action Step Bar with Controls */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Workflow Status
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={cn(
                    "text-sm font-black uppercase tracking-wider",
                    execution.status === "completed"
                      ? "text-emerald-400"
                      : execution.status === "executing"
                      ? "text-cyan-400 animate-pulse"
                      : "text-amber-400"
                  )}
                >
                  {execution.status === "completed"
                    ? "✓ Execution Succeeded"
                    : execution.status === "executing"
                    ? "Executing Steps..."
                    : "Plan Generated — Awaiting Approval"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {execution.status === "ready_to_approve" && (
                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isExecuting ? "Executing..." : "Approve & Execute Plan"}</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Plan Step-by-Step Breakdown */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Agent Plan & Action Step Manifest
            </h3>

            <div className="space-y-3">
              {execution.planSteps.map((step) => {
                const isDone = step.status === "completed";
                const isRunning = step.status === "running";

                return (
                  <div
                    key={step.stepNumber}
                    className={cn(
                      "p-3.5 rounded-xl border text-xs flex items-start gap-3 transition-all",
                      isDone
                        ? "bg-emerald-950/20 border-emerald-500/30 text-slate-200"
                        : isRunning
                        ? "bg-cyan-950/20 border-cyan-500/40 text-white animate-pulse"
                        : "bg-[#11192e] border-white/5 text-slate-400"
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5",
                        isDone
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-white/10 text-white"
                      )}
                    >
                      {isDone ? "✓" : step.stepNumber}
                    </div>

                    <div className="flex-1">
                      <div className="font-bold text-slate-100 flex items-center justify-between">
                        <span>{step.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">
                          {step.status}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        {step.description}
                      </p>
                      {step.auditDetail && (
                        <div className="mt-1 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Audit Verified: {step.auditDetail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit Trail & Compliance Log (Prompt #23) */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Immutable Agent Execution Audit Trail
            </h3>

            <div className="space-y-1.5 font-mono text-[11px] bg-black/40 p-3 rounded-xl border border-white/5 max-h-48 overflow-y-auto">
              {execution.auditLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-3 py-0.5 text-slate-300">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "action"
                        ? "text-cyan-300"
                        : "text-slate-400"
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
