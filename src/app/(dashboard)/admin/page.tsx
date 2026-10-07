"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  FileText,
  Server,
  HardDrive,
  ChevronRight,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const adminModules = [
  {
    title: "Users & Roles (RBAC)",
    description: "Manage team members, assign roles, and configure granular permissions per module and organization tier.",
    href: "/admin/roles",
    icon: Shield,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    stat: "12 Users · 5 Roles",
    badge: "RBAC Active",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    title: "Audit Logs",
    description: "Complete immutable audit trail of all user actions, API calls, data changes, and security events.",
    href: "/admin/audit",
    icon: FileText,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    stat: "2,847 Events Today",
    badge: "Encrypted",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    title: "Infrastructure Monitor",
    description: "Real-time health monitoring for PostgreSQL, Redis, MinIO, Celery workers, and Kafka message queues.",
    href: "/admin/infra",
    icon: Server,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    stat: "All Systems Nominal",
    badge: "Healthy",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    title: "Object Storage (MinIO)",
    description: "Manage call recordings, compliance documents, and customer artifacts in the S3-compatible object store.",
    href: "/admin/storage",
    icon: HardDrive,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    stat: "4.8 TB Used · 24.2 TB Free",
    badge: "Mumbai Region",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
];

const systemAlerts = [
  { icon: CheckCircle, text: "All microservices healthy — uptime 99.98%", color: "text-emerald-400" },
  { icon: AlertTriangle, text: "3 inactive user accounts — review recommended", color: "text-amber-400" },
  { icon: Lock, text: "MFA enforcement enabled for all admin roles", color: "text-cyan-400" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              System Administration
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enterprise-grade multi-tenant administration: RBAC, audit compliance, and infrastructure observability.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            Platform Healthy
          </span>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-2.5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          Live System Status
        </h3>
        {systemAlerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-xs">
              <Icon className={`w-4 h-4 shrink-0 ${alert.color}`} />
              <span className="text-slate-300">{alert.text}</span>
            </div>
          );
        })}
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href}>
              <div className={`glass-panel glass-panel-hover rounded-2xl p-6 border ${mod.borderColor} h-full group cursor-pointer`}>
                <div className="flex items-start justify-between gap-4">
                  <div className={`p-3 rounded-xl ${mod.bgColor} border ${mod.borderColor} shrink-0`}>
                    <Icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className={`font-bold text-white text-sm group-hover:${mod.color} transition-colors`}>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className={`text-xs font-mono font-semibold ${mod.color}`}>
                    {mod.stat}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Admin Activity */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          Recent Administrative Actions
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { action: "User priya@logip.ai promoted to MANAGER role", time: "2 hours ago", icon: Users, color: "text-cyan-400" },
            { action: "RBAC policy updated: Restricted DELETE access for EXECUTIVE role", time: "Yesterday, 3:44 PM", icon: Shield, color: "text-violet-400" },
            { action: "MinIO bucket policy refreshed — compliance audit passed", time: "01 Oct 2026", icon: HardDrive, color: "text-amber-400" },
            { action: "Infrastructure health check completed — all services nominal", time: "01 Oct 2026", icon: Server, color: "text-emerald-400" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${item.color}`} />
                <span className="text-slate-300 flex-1">{item.action}</span>
                <span className="text-slate-500 font-mono text-[10px] shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
