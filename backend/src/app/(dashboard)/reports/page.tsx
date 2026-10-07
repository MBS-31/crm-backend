"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  MessageSquare,
  PhoneCall,
  Mail,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatINR } from "@/lib/utils";

const monthlyConversionData = [
  { month: "May", leads: 420, qualified: 180, won: 52 },
  { month: "Jun", leads: 510, qualified: 210, won: 68 },
  { month: "Jul", leads: 640, qualified: 280, won: 85 },
  { month: "Aug", leads: 720, qualified: 330, won: 98 },
  { month: "Sep", leads: 850, qualified: 390, won: 114 },
  { month: "Oct", leads: 1000, qualified: 460, won: 128 },
];

const channelTrafficData = [
  { channel: "WhatsApp", count: 1840, responseTime: "4 mins", satisfaction: "96%" },
  { channel: "Email", count: 960, responseTime: "42 mins", satisfaction: "89%" },
  { channel: "Voice Calls", count: 540, responseTime: "Instant", satisfaction: "94%" },
  { channel: "SMS", count: 320, responseTime: "12 mins", satisfaction: "82%" },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("Last 6 Months");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Enterprise Reports & Executive Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Conversion funnels, channel throughput, ARR run-rates, and rep quota fulfillment.
          </p>
        </div>

        <button
          onClick={() => alert("Exporting executive PDF analytics report...")}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* Conversion Funnel Chart */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Lead-to-Win Conversion Funnel Trajectory
          </h3>
          <span className="text-xs font-mono text-cyan-400">Total Wins: 128 Deals</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyConversionData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl bg-[#0e1628] border border-white/10 p-3 text-xs shadow-2xl space-y-1">
                        <div className="font-bold text-white mb-1">{label} Funnel</div>
                        <div className="text-slate-300">Inbound Leads: {payload[0]?.value}</div>
                        <div className="text-cyan-400">Qualified: {payload[1]?.value}</div>
                        <div className="text-emerald-400 font-bold">Closed Won: {payload[2]?.value}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inbound Leads" />
              <Bar dataKey="qualified" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Qualified" />
              <Bar dataKey="won" fill="#10b981" radius={[4, 4, 0, 0]} name="Closed Won" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Omnichannel Communication Performance Table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          Omnichannel Communication Analytics
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Total Interactions</th>
                <th className="py-2.5 px-3">Avg Response Time</th>
                <th className="py-2.5 px-3">CSAT Rating</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {channelTrafficData.map((row) => (
                <tr key={row.channel} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    {row.channel === "WhatsApp" ? (
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    ) : row.channel === "Email" ? (
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                    ) : row.channel === "Voice Calls" ? (
                      <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 text-violet-400" />
                    )}
                    {row.channel}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-200">{row.count.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono text-cyan-300">{row.responseTime}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">{row.satisfaction}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      Optimal
                    </span>
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
