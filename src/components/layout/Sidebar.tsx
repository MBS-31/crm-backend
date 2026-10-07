"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radar,
  Sparkles,
  Users,
  UserCheck,
  Briefcase,
  Calendar,
  CheckSquare,
  Building2,
  TrendingUp,
  BrainCircuit,
  PhoneCall,
  Award,
  BarChart3,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  Radio,
  Bot,
  GitBranch,
  PlayCircle,
  Sliders,
  Shield,
  FileText,
  Server,
  HardDrive,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Command Center",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Opportunity Radar", href: "/radar", icon: Radar, badge: "24", badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { title: "AI Copilot", href: "/copilot", icon: Sparkles, badge: "AI", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    ],
  },
  {
    title: "CRM",
    items: [
      { title: "Customers", href: "/customers", icon: Users },
      { title: "Leads", href: "/leads", icon: UserCheck, badge: "HOT", badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { title: "Deals", href: "/deals", icon: Briefcase },
      { title: "Companies", href: "/customers", icon: Building2 },
      { title: "Tasks", href: "/tasks", icon: CheckSquare },
      { title: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { title: "Lead Intelligence", href: "/leads", icon: BrainCircuit },
      { title: "Customer 360", href: "/customers/cust_rahul", icon: Users },
      { title: "Call Intelligence", href: "/calls", icon: PhoneCall },
      { title: "Sales Coaching", href: "/coaching", icon: Award },
      { title: "Reports & Analytics", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Communications",
    items: [
      { title: "Unified Inbox", href: "/inbox", icon: Inbox, badge: "3", badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
      { title: "Email", href: "/inbox?channel=email", icon: Mail },
      { title: "WhatsApp", href: "/inbox?channel=whatsapp", icon: MessageSquare, badge: "Live", badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
      { title: "Voice Calls", href: "/calls", icon: Phone },
      { title: "SMS", href: "/inbox?channel=sms", icon: Radio },
    ],
  },
  {
    title: "Automation",
    items: [
      { title: "AI Agents", href: "/agents", icon: Bot, badge: "Auto", badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
      { title: "Workflows", href: "/workflows", icon: GitBranch },
      { title: "Automation Runs", href: "/workflows", icon: PlayCircle },
      { title: "What-If Simulator", href: "/simulator", icon: Sliders },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Users & Team", href: "/admin/roles", icon: Users },
      { title: "Roles & RBAC", href: "/admin/roles", icon: Shield },
      { title: "Audit Logs", href: "/admin/audit", icon: FileText },
      { title: "Infrastructure", href: "/admin/infra", icon: Server },
      { title: "Object Storage", href: "/admin/storage", icon: HardDrive },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse, isMobileOpen, setMobileOpen } = useSidebarStore();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#090d16] border-r border-white/5 select-none text-slate-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/5 bg-[#0a0f1d]/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#080d1a] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
                LOGIP
                <span className="text-[10px] font-semibold tracking-normal px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  AI CRM
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                Customer Intelligence
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section) => {
          const isSecCollapsed = !!collapsedSections[section.title];
          return (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-300 transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      isSecCollapsed && "-rotate-90"
                    )}
                  />
                </button>
              )}

              {(!isSecCollapsed || isCollapsed) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href + item.title}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/15 to-blue-600/10 text-cyan-300 border-l-2 border-cyan-400"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive
                              ? "text-cyan-400"
                              : "text-slate-400 group-hover:text-slate-200"
                          )}
                        />
                        {!isCollapsed && (
                          <span className="truncate flex-1 text-xs font-medium">
                            {item.title}
                          </span>
                        )}
                        {!isCollapsed && item.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0",
                              item.badgeColor || "bg-white/10 text-slate-300 border-white/10"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Tagline */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/5 bg-[#070b14]/70 text-[11px] text-slate-400 text-center">
          <p className="font-medium text-slate-300">Understand · Predict · Automate</p>
          <p className="text-[10px] text-slate-400 mt-0.5">One Customer · One Intelligence Layer</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 lg:hidden transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
