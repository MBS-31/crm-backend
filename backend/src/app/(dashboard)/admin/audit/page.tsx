"use client";

import React, { useState } from "react";
import { mockAuditLogs } from "@/data/mockData";
import {
  FileText,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Download,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuditLogsPage() {
  const [logs] = useState(mockAuditLogs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.entity.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Enterprise Audit Logs & Traceability
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immutable log of user actions, permission changes, AI executions, and system events.
          </p>
        </div>

        <button
          onClick={() => alert("Audit trail exported for SOC-2 compliance.")}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit events by user, action, or entity..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          {["all", "success", "warning", "error"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-3 py-1 rounded-lg font-medium transition-colors capitalize",
                statusFilter === st
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table (Prompt #30) */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Target Entity</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{log.user}</div>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-200">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                    {log.entity}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[10px] whitespace-nowrap">
                    {log.ip}
                  </td>
                  <td className="py-3 px-3 text-slate-300 text-[11px] max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
