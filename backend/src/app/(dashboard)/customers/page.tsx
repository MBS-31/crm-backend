"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockCustomers } from "@/data/mockData";
import { formatINR } from "@/lib/utils";
import { useUIStore, useCopilotStore } from "@/stores";
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const filtered = mockCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : c.healthCategory.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Customer 360° Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enterprise accounts with health scores, telemetry & predictive churn risk.
          </p>
        </div>

        <button
          onClick={() => router.push("/customers/cust_rahul")}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>View Flagship Customer 360</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or enterprise..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        {/* Health status filter pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          {["all", "Healthy", "Monitor", "At Risk", "Critical"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-3 py-1 rounded-lg font-medium transition-colors capitalize",
                filter.toLowerCase() === cat.toLowerCase()
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/5 flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-400">{c.company}</p>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    c.healthCategory === "Healthy"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : c.healthCategory === "Monitor"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  )}
                >
                  {c.healthCategory}
                </span>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual ARR</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {formatINR(c.arr, true)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Health Score</span>
                  <span className="font-mono font-bold text-white">
                    {c.healthScore} / 100
                  </span>
                </div>
              </div>

              {/* Next Best Action */}
              <div className="text-[11px] text-slate-300 bg-cyan-950/20 p-2 rounded-lg border border-cyan-500/20">
                <span className="text-cyan-400 font-semibold block mb-0.5">
                  ✨ Next Best Action:
                </span>
                {c.nextBestAction}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    openSoftphoneWith({
                      name: c.name,
                      company: c.company,
                      phone: c.phone,
                    })
                  }
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors"
                  title="Call via Softphone"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => router.push("/inbox?channel=whatsapp")}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                href={`/customers/${c.id}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
              >
                <span>Open 360°</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
