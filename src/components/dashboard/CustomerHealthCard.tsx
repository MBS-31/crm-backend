"use client";

import React from "react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { HeartPulse, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

const healthData = [
  { name: "Healthy", value: 72, color: "#10b981", count: 173, arr: 92160000 },
  { name: "Monitor", value: 18, color: "#f59e0b", count: 43, arr: 23040000 },
  { name: "At Risk", value: 7, color: "#f43f5e", count: 17, arr: 8960000 },
  { name: "Critical", value: 3, color: "#e11d48", count: 7, arr: 3840000 },
];

export default function CustomerHealthCard() {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              Customer Health Overview
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                87 Avg Score
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Predictive churn analysis across 240 active enterprises
            </p>
          </div>
        </div>
        <Link
          href="/customers"
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group transition-colors"
        >
          <span>All Customers</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Donut Chart & Legend Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 my-3">
        {/* Donut visualization */}
        <div className="h-44 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={healthData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {healthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl bg-[#0e1628] border border-white/10 p-2.5 text-xs shadow-xl">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          {data.name}: {data.value}%
                        </div>
                        <div className="text-slate-400 mt-1">
                          {data.count} Customers · {formatINR(data.arr, true)} ARR
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Donut Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-white">72%</span>
            <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
              Healthy
            </span>
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="space-y-2 text-xs">
          {healthData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-slate-200">{item.name}</span>
                <span className="text-[10px] text-slate-400">({item.count})</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-300 font-bold">{item.value}%</span>
                <span className="text-[10px] text-slate-400">
                  {formatINR(item.arr, true)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Next Best Action alert footer */}
      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <p className="text-slate-200 text-[11px] truncate">
            <strong className="text-rose-300">Retention Alert:</strong> West Corp & Apex Digital require urgent sponsor alignment.
          </p>
        </div>
        <Link
          href="/customers/cust_karan"
          className="shrink-0 text-[11px] font-semibold text-rose-300 hover:text-white underline underline-offset-2"
        >
          Take Action →
        </Link>
      </div>
    </div>
  );
}
