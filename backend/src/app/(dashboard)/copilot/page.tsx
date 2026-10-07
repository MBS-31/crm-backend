"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { copilotService, CopilotQueryResponse } from "@/services/copilot";
import { useUIStore } from "@/stores";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Phone,
  Mail,
  Zap,
  Building2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopilotPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    {
      id: string;
      sender: "user" | "copilot";
      text: string;
      timestamp: string;
      suggestedActions?: string[];
    }[]
  >([
    {
      id: "init",
      sender: "copilot",
      text: `### LOGIP Customer Intelligence Copilot
I have analyzed real-time CRM telemetry, WhatsApp logs, MinIO call recordings, and deal probability scores.

**Top Priority Right Now:**
• **Rahul Sharma (ABC Technologies)**: Requested 12% multi-year discount on 250 enterprise seats following a 04:32 discovery call.
• **West Corp India**: At-risk customer (Health Score 42). Uncontacted for 8 days.
• **Pipeline Run-Rate**: Tracking at ₹12.8 Cr ARR (+18.4% YoY).

How can I assist your sales execution today?`,
      timestamp: "Just now",
      suggestedActions: [
        "Tell me about Rahul before I call",
        "Which customers are at-risk?",
        "Best deals to follow up",
      ],
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const router = useRouter();
  const { openSoftphoneWith } = useUIStore();

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || query).trim();
    if (!q || isStreaming) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `usr_${Date.now()}`,
        sender: "user",
        text: q,
        timestamp: "Just now",
      },
    ]);
    setQuery("");
    setIsStreaming(true);

    try {
      const res = await copilotService.query(q);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `cop_${Date.now()}`,
            sender: "copilot",
            text: res.answer,
            timestamp: "Just now",
            suggestedActions: res.suggestedActions,
          },
        ]);
        setIsStreaming(false);
      }, 700);
    } catch {
      setIsStreaming(false);
    }
  };

  const handleAction = (act: string) => {
    if (act.includes("Rahul") || act.includes("Customer 360")) {
      router.push("/customers/cust_rahul");
    } else if (act.includes("Email")) {
      router.push("/inbox?channel=email");
    } else if (act.includes("Radar")) {
      router.push("/radar");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              AI Customer Copilot Command Station
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep synthesis across dossiers, deals, transcripts, and prescriptive next best actions.
          </p>
        </div>
      </div>

      {/* Main Copilot Console */}
      <div className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden flex flex-col h-[650px] bg-[#090d18]">
        {/* Console Header */}
        <div className="p-4 border-b border-white/5 bg-[#0b1020] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="font-bold text-xs text-white">LOGIP Deep Reasoning Engine</span>
              <p className="text-[10px] text-slate-400 font-mono">Model: Enterprise Claude / GPT-4o Hybrid</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Vector Graph Online</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex gap-3", m.sender === "user" ? "justify-end" : "justify-start")}
            >
              {m.sender === "copilot" && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed",
                  m.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-950/40"
                    : "bg-[#11192e] border border-white/10 text-slate-200 shadow-xl"
                )}
              >
                <div className="whitespace-pre-line prose prose-invert prose-xs">
                  {m.text}
                </div>

                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Suggested Actions:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {m.suggestedActions.map((act) => (
                        <button
                          key={act}
                          onClick={() => handleAction(act)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-semibold cursor-pointer transition-colors"
                        >
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span>{act}</span>
                          <ArrowRight className="w-3 h-3 ml-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="block text-[9px] text-slate-400 mt-2 text-right">
                  {m.timestamp}
                </span>
              </div>

              {m.sender === "user" && (
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-blue-300" />
                </div>
              )}
            </div>
          ))}

          {isStreaming && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing CRM vector graph & generating executive response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/5 bg-[#0a0f1d] space-y-2">
          {/* Quick chips */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 scrollbar-none">
            {[
              "Tell me about Rahul before I call",
              "Which customers are at-risk?",
              "Best deals to follow up",
              "Summary of latest call with ABC Tech",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 whitespace-nowrap transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about customers, deals, risks, calls, or execution..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={!query.trim() || isStreaming}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
