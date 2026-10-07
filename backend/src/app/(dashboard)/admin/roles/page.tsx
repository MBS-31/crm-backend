"use client";

import React, { useState } from "react";
import { mockRolePermissions } from "@/data/mockData";
import { RolePermissionMatrix, UserRole } from "@/types";
import {
  Shield,
  Check,
  X,
  Save,
  CheckCircle,
  Users,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES: UserRole[] = [
  "SUPER ADMIN",
  "SALES OPS",
  "MANAGER",
  "EXECUTIVE",
  "READONLY",
];

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("SUPER ADMIN");
  const [matrix, setMatrix] = useState<RolePermissionMatrix[]>(mockRolePermissions);
  const [isSaved, setIsSaved] = useState(false);

  const togglePermission = (resource: string, field: "view" | "create" | "edit" | "delete") => {
    setMatrix((prev) =>
      prev.map((row) =>
        row.resource === resource ? { ...row, [field]: !row[field] } : row
      )
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              5-Tier Role-Based Access Control (RBAC)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enterprise granular permission matrix matching backend authentication roles.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          {isSaved ? <CheckCircle className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? "Permissions Saved!" : "Save Permission Matrix"}</span>
        </button>
      </div>

      {/* Role Selector Tabs (Prompt #28) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
              selectedRole === role
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-950/40"
                : "bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
            )}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Permission Matrix Table (Prompt #28) */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h3 className="font-bold text-sm text-white">
              Granular Resource Rights for &ldquo;{selectedRole}&rdquo;
            </h3>
            <p className="text-xs text-slate-400">
              Toggle specific CRUD access flags per subsystem
            </p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono">
            Active Context
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Resource Subsystem</th>
                <th className="py-3 px-4 text-center">VIEW</th>
                <th className="py-3 px-4 text-center">CREATE</th>
                <th className="py-3 px-4 text-center">EDIT</th>
                <th className="py-3 px-4 text-center">DELETE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matrix.map((row) => (
                <tr key={row.resource} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-200">
                    {row.resource}
                  </td>

                  {/* VIEW */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePermission(row.resource, "view")}
                      className={cn(
                        "w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all",
                        row.view
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-600 border border-white/5"
                      )}
                    >
                      {row.view ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* CREATE */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePermission(row.resource, "create")}
                      className={cn(
                        "w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all",
                        row.create
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-600 border border-white/5"
                      )}
                    >
                      {row.create ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* EDIT */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePermission(row.resource, "edit")}
                      className={cn(
                        "w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all",
                        row.edit
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-600 border border-white/5"
                      )}
                    >
                      {row.edit ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                    </button>
                  </td>

                  {/* DELETE */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePermission(row.resource, "delete")}
                      className={cn(
                        "w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all",
                        row.delete
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-600 border border-white/5"
                      )}
                    >
                      {row.delete ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                    </button>
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
