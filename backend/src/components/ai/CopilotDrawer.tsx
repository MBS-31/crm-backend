"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCopilotStore, useUIStore } from "@/stores";
import { copilotService } from "@/services/copilot";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Phone,
  Mail,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopilotDrawer() {
  const { isOpen, setIsOpen, messages, addMessage, isStreaming, setStreaming } =
    useCopilotStore();
  const { openSoftphoneWith } = useUIStore();
  const [input, setInput] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isStreaming) return;

    // Add user message
    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: "user" as const,
      text: queryText,
      timestamp: "Just now",
    };
    addMessage(userMsg);
    setInput("");
    setStreaming(true);

    try {
      const response = await copilotService.query(queryText);

      // Simulate streaming response
      setTimeout(() => {
        addMessage({
          id: `cop_${Date.now()}`,
          sender: "copilot",
          text: response.answer,
          timestamp: "Just now",
          suggestedActions: response.suggestedActions,
          contextEntity: response.contextEntity,
        });
        setStreaming(false);
      }, 700);
    } catch {
      addMessage({
        id: `cop_err_${Date.now()}`,
        sender: "copilot",
        text: "I encountered a transient error querying the intelligence layer. Please try again.",
        timestamp: "Just now",
      });
      setStreaming(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action.includes("Rahul") || action.includes("Customer 360")) {
      router.push("/customers/cust_rahul");
      setIsOpen(false);
    } else if (action.includes("Email")) {
      router.push("/inbox?channel=email");
      setIsOpen(false);
    } else if (action.includes("Radar")) {
      router.push("/radar");
      setIsOpen(false);
    } else if (action.includes("Call")) {
      openSoftphoneWith({
        name: "Rahul Sharma",
        company: "ABC Technologies",
        phone: "+91 98201 44521",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#0a0f1d] border-l border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-[#080d1a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                  AI Customer Copilot
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Live
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Ask anything about customers, deals & dossiers
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto text-[11px] scrollbar-none">
            {[
              "Tell me about Rahul before I call",
              "Which customers are at-risk?",
              "Best deals to follow up",
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "copilot" && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed",
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-900/30"
                      : "bg-[#11192e] border border-white/10 text-slate-200 shadow-xl"
                  )}
                >
                  <div className="whitespace-pre-line prose prose-invert prose-xs">
                    {msg.text}
                  </div>

                  {/* Context Actions if available */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Suggested Actions
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleActionClick(action)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span>{action}</span>
                            <ArrowRight className="w-3 h-3 ml-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct shortcut if Rahul context */}
                  {msg.text.includes("Rahul Sharma") && (
                    <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() =>
                          openSoftphoneWith({
                            name: "Rahul Sharma",
                            company: "ABC Technologies",
                            phone: "+91 98201 44521",
                          })
                        }
                        className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] hover:bg-emerald-500/30 transition-colors"
                      >
                        <Phone className="w-3 h-3" /> Call Softphone
                      </button>
                      <button
                        onClick={() => {
                          router.push("/inbox?channel=whatsapp");
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] hover:bg-cyan-500/30 transition-colors"
                      >
                        <Mail className="w-3 h-3" /> WhatsApp
                      </button>
                    </div>
                  )}

                  <span className="block text-[9px] text-slate-400 mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-blue-300" />
                  </div>
                )}
              </div>
            ))}

            {isStreaming && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing customer intelligence from CRM vectors...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-white/10 bg-[#080d1a]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about customers, deals, risks, calls..."
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 hover:brightness-110 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
