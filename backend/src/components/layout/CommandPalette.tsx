"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores";
import {
  Search,
  Users,
  UserCheck,
  Briefcase,
  PhoneCall,
  MessageSquare,
  X,
  ArrowRight,
} from "lucide-react";
import { mockCustomers, mockLeads, mockDeals, mockCallRecording, mockConversations } from "@/data/mockData";

export default function CommandPalette() {
  const { isSearchOpen, setIsSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCustomers = mockCustomers.filter(
    (c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q)
  );
  const filteredLeads = mockLeads.filter(
    (l) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)
  );
  const filteredDeals = mockDeals.filter(
    (d) => d.title.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)
  );
  const filteredCalls = [mockCallRecording].filter(
    (c) => c.contactName.toLowerCase().includes(q) || c.company.toLowerCase().includes(q)
  );
  const filteredMessages = mockConversations.filter(
    (m) => m.contactName.toLowerCase().includes(q) || m.lastMessage.toLowerCase().includes(q)
  );

  const navigateTo = (path: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0e1628] border border-cyan-500/20 shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#0a0f1d]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers, leads, deals, calls, messages..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* CUSTOMERS Group */}
          {filteredCustomers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Customers
              </div>
              <div className="space-y-1 mt-1">
                {filteredCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigateTo(`/customers/${c.id}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-300">
                        {c.name}
                      </span>
                      <span className="text-slate-400 ml-2">· {c.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-cyan-400">Health: {c.healthScore}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LEADS Group */}
          {filteredLeads.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Leads
              </div>
              <div className="space-y-1 mt-1">
                {filteredLeads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => navigateTo("/leads")}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 group-hover:text-amber-300">
                        {l.name}
                      </span>
                      <span className="text-slate-400 ml-2">· {l.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Score {l.score}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* DEALS Group */}
          {filteredDeals.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                Deals
              </div>
              <div className="space-y-1 mt-1">
                {filteredDeals.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => navigateTo("/deals")}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 group-hover:text-emerald-300">
                        {d.title}
                      </span>
                      <span className="text-slate-400 ml-2">· {d.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400 font-mono">
                        ₹{(d.amount / 100000).toFixed(0)}L
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CALLS Group */}
          {filteredCalls.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-violet-400" />
                Calls
              </div>
              <div className="space-y-1 mt-1">
                {filteredCalls.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigateTo("/calls")}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 group-hover:text-violet-300">
                        {c.contactName} - Sales Call
                      </span>
                      <span className="text-slate-400 ml-2">· 04:32</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">{c.sentiment}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES Group */}
          {filteredMessages.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Messages
              </div>
              <div className="space-y-1 mt-1">
                {filteredMessages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => navigateTo(`/inbox?channel=${m.channel}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left group transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-300">
                        {m.contactName} ({m.channel.toUpperCase()})
                      </span>
                      <p className="text-slate-400 text-[11px] truncate max-w-sm">
                        {m.lastMessage}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredCustomers.length === 0 &&
            filteredLeads.length === 0 &&
            filteredDeals.length === 0 &&
            filteredMessages.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#0a0f1d] flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows or click</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
