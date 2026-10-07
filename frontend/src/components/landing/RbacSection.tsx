"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  UserCog,
  User,
  Users,
  Check,
  X,
  Lock,
  ChevronRight,
  Sliders,
  FileCheck2,
  KeyRound
} from "lucide-react";
import { useLandingStore, RoleType } from "@/store/useLandingStore";

export default function RbacSection() {
  const { activeRbacRole, setActiveRbacRole } = useLandingStore();

  const roles: { id: RoleType; title: string; subtitle: string; icon: any; color: string; desc: string }[] = [
    {
      id: "SUPER_ADMIN",
      title: "Super Admin",
      subtitle: "Full Root & Infrastructure Access",
      icon: ShieldAlert,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      desc: "Complete cluster authority: database backups, MinIO encryption keys, OAuth credentials, and billing.",
    },
    {
      id: "ADMIN",
      title: "Admin",
      subtitle: "Organization & Team Operations",
      icon: ShieldCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      desc: "User invitation, workflow trigger configuration, webhook management, and team allocation.",
    },
    {
      id: "MANAGER",
      title: "Manager",
      subtitle: "Pipeline Oversight & Coaching",
      icon: UserCog,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      desc: "View rep deal queues, reassign accounts, inspect call transcripts, and adjust monthly quotas.",
    },
    {
      id: "SALES_EXECUTIVE",
      title: "Sales Executive",
      subtitle: "Deal Execution & Communication",
      icon: Users,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      desc: "Own assigned leads, place VoIP softphone calls, send WhatsApp messages, and close proposals.",
    },
    {
      id: "SUPPORT_USER",
      title: "Support / Read-Only",
      subtitle: "Restricted View Access",
      icon: User,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      desc: "Lookup contact history, view customer tickets and invoices without pipeline modification rights.",
    },
  ];

  const modules = [
    { name: "Leads", super: "ALL", admin: "ALL", manager: "ALL", exec: "ASSIGNED", support: "VIEW_ONLY" },
    { name: "Contacts", super: "ALL", admin: "ALL", manager: "ALL", exec: "EDIT", support: "VIEW_ONLY" },
    { name: "Companies", super: "ALL", admin: "ALL", manager: "ALL", exec: "EDIT", support: "VIEW_ONLY" },
    { name: "Deals", super: "ALL", admin: "ALL", manager: "ALL", exec: "ASSIGNED", support: "NONE" },
    { name: "Reports", super: "ALL", admin: "ALL", manager: "TEAM", exec: "PERSONAL", support: "NONE" },
    { name: "Documents", super: "ALL", admin: "ALL", manager: "ALL", exec: "CREATE", support: "VIEW_ONLY" },
    { name: "Communications", super: "ALL", admin: "ALL", manager: "ALL", exec: "SEND", support: "VIEW_ONLY" },
    { name: "Settings", super: "ALL", admin: "ALL", manager: "TEAM_ONLY", exec: "NONE", support: "NONE" },
  ];

  const getRoleAccess = (moduleAccess: any) => {
    switch (activeRbacRole) {
      case "SUPER_ADMIN":
        return moduleAccess.super;
      case "ADMIN":
        return moduleAccess.admin;
      case "MANAGER":
        return moduleAccess.manager;
      case "SALES_EXECUTIVE":
        return moduleAccess.exec;
      case "SUPPORT_USER":
        return moduleAccess.support;
      default:
        return moduleAccess.manager;
    }
  };

  return (
    <section id="rbac" className="py-24 md:py-32 relative bg-[#070913] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 inline-block mb-3">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Security starts with granular access control.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Protect sensitive customer contracts and deal numbers. Enforce strict 5-tier role-based access control out of the box.
          </p>
        </div>

        {/* 2-Column Layout: Left Vertical Hierarchy + Right Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Hierarchy Roles List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                5-Tier Hierarchy (Select to inspect)
              </span>
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {roles.map((r, i) => {
              const isActive = activeRbacRole === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setActiveRbacRole(r.id)}
                  onMouseEnter={() => setActiveRbacRole(r.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/[0.05] border-white/30 shadow-xl shadow-indigo-950/40 translate-x-1"
                      : "bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${r.color}`}>
                        <r.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {r.title}
                          {isActive && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Active Filter
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-400">{r.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-indigo-400 translate-x-1" : "text-slate-600"
                      }`}
                    />
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-slate-300 mt-2 pt-2 border-t border-white/[0.06]"
                    >
                      {r.desc}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Permission Matrix */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Permission Matrix</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Role: {roles.find((r) => r.id === activeRbacRole)?.title}
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Real-time permission evaluation across CRM modules
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> FULL
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> PARTIAL
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span> NONE
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="space-y-2">
              {modules.map((m) => {
                const access = getRoleAccess(m);
                const isFull = access === "ALL";
                const isNone = access === "NONE";

                return (
                  <div
                    key={m.name}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {m.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                          isFull
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : isNone
                            ? "bg-slate-800 text-slate-500 border-white/5"
                            : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {access}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Row-Level Tenant Security Enabled
              </span>
              <span className="font-mono text-slate-500">PostgreSQL RLS v16</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
