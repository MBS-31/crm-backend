"use client";

import React, { useState } from "react";
import {
  useAuthStore,
  useOrganizationStore,
  useUIStore,
  useSidebarStore,
  useCopilotStore,
  useNotificationStore,
} from "@/stores";
import {
  Search,
  Sparkles,
  Bell,
  Phone,
  Building2,
  ChevronDown,
  Menu,
  Check,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user } = useAuthStore();
  const { currentOrg, organizations, setOrganization } = useOrganizationStore();
  const { setIsSearchOpen, setIsSoftphoneOpen, isSoftphoneOpen } = useUIStore();
  const { setMobileOpen } = useSidebarStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();
  const { notifications, setIsOpen: setNotifOpen } = useNotificationStore();

  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#090d16]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle + Org switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Multi-tenant Organization Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all text-left"
          >
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-slate-200 leading-tight">
                {currentOrg.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-medium">
                {currentOrg.plan}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {isOrgDropdownOpen && (
            <div
              className="absolute left-0 mt-2 w-64 rounded-xl bg-[#0f172a] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setIsOrgDropdownOpen(false)}
            >
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Workspace
              </div>
              <div className="space-y-1">
                {organizations.map((org) => {
                  const isSelected = org.id === currentOrg.id;
                  return (
                    <button
                      key={org.id}
                      onClick={() => {
                        setOrganization(org);
                        setIsOrgDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-colors text-left",
                        isSelected
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-white/5"
                      )}
                    >
                      <div>
                        <div className="font-semibold text-slate-100">{org.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {org.plan} · {org.activeUsers} users
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar (Ctrl+K) */}
      <div className="flex-1 max-w-xl mx-2 hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] text-slate-400 text-xs transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="truncate">Search customers, leads, deals, calls, messages...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ⌘K / Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right side: AI Copilot Button, Softphone, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* ✨ Ask AI Button */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
          <span className="hidden sm:inline">✨ Ask AI</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Softphone Quick Launcher */}
        <button
          onClick={() => setIsSoftphoneOpen(!isSoftphoneOpen)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all",
            isSoftphoneOpen
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/20"
              : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]"
          )}
          title="Open Softphone / WebRTC Call Console"
        >
          <Phone className={cn("w-3.5 h-3.5", isSoftphoneOpen && "animate-pulse text-emerald-400")} />
          <span className="hidden md:inline">Softphone</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setNotifOpen(true)}
          className="relative p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                RS
              </div>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
                {user.role}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </button>

          {isUserMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0f172a] border border-white/10 shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="p-2 border-b border-white/5 mb-1">
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                <div className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {user.role}
                </div>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-2 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Profile & Preferences
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-2 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Security & API Keys
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full text-left px-2 py-1.5 rounded-md text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
