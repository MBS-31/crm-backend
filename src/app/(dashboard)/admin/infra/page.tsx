"use client";

import React, { useState } from "react";
import { mockInfraServices } from "@/data/mockData";
import {
  Server,
  Database,
  Layers,
  HardDrive,
  Cpu,
  RefreshCw,
  CheckCircle,
  Activity,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InfraPage() {
  const [services] = useState(mockInfraServices);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "PostgreSQL":
        return <Database className="w-5 h-5 text-cyan-400" />;
      case "Redis":
        return <Zap className="w-5 h-5 text-rose-400" />;
      case "MinIO":
        return <HardDrive className="w-5 h-5 text-emerald-400" />;
      case "Worker Queue":
        return <Layers className="w-5 h-5 text-amber-400" />;
      default:
        return <Server className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Server className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Docker Infrastructure Health & Subsystems
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry targeting the Docker container architecture specified in /infra/health.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={cn("w-3.5 h-3.5 text-cyan-400", isRefreshing && "animate-spin")} />
          <span>Ping Containers</span>
        </button>
      </div>

      {/* Global Health Ribbon */}
      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-white">All 6 Core Services Operational</div>
            <p className="text-xs text-slate-400">Zero packet drops · Average cluster latency: 12.4ms</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400">99.98% 30-Day SLA</span>
      </div>

      {/* Infrastructure Services Grid (Prompt #31) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => (
          <div
            key={svc.name}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  {getServiceIcon(svc.name)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{svc.name}</h3>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>● {svc.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-center font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Latency</span>
                <span className="font-bold text-cyan-300">{svc.latency}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Uptime</span>
                <span className="font-bold text-emerald-400">{svc.uptime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">RAM</span>
                <span className="font-bold text-slate-200">{svc.memoryUsage.split("/")[0]}</span>
              </div>
            </div>

            {/* Details */}
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {svc.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
