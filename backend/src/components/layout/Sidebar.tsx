"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Camera,
  LogOut,
  User,
  ShieldCheck,
  CheckCircle2,
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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isCollapsed, toggleCollapse, isMobileOpen, setMobileOpen } = useSidebarStore();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("crm_user_avatar") || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
      } catch {
        return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
      }
    }
    return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
  });

  const [profile] = useState({
    name: "Rahul Sharma",
    role: "Senior VP of Sales",
    email: "rahul@logip.ai",
    department: "Enterprise Customer Operations",
    empId: "LOGIP-8841",
    status: "Online",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (typeof base64 === "string") {
          setAvatar(base64);
          try {
            localStorage.setItem("crm_user_avatar", base64);
          } catch (err) {
            console.warn(err);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAvatar = () => {
    const defaultAv = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
    setAvatar(defaultAv);
    try {
      localStorage.removeItem("crm_user_avatar");
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of LOGIP CRM?")) {
      router.push("/login");
    }
  };

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
        {/* Profile Option Above Command Center */}
        {!isCollapsed ? (
          <div className="mb-2 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2.5">
              {/* Profile Avatar with PFP Change Feature */}
              <div 
                className="relative group/pfp cursor-pointer shrink-0"
                onClick={() => fileInputRef.current?.click()}
                title="Click to change profile picture"
              >
                <img
                  src={avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30 group-hover/pfp:ring-cyan-400 transition-all shadow-md"
                />
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/pfp:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
              </div>

              {/* Profile Details Header */}
              <div 
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => setIsProfileModalOpen(true)}
                title="View full profile details"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white truncate hover:text-cyan-400 transition-colors">
                    {profile.name}
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Quick Details Bar */}
            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 truncate max-w-[130px] font-mono">{profile.email}</span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                Details →
              </button>
            </div>

            {/* Hidden File Input for PFP upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        ) : (
          <div className="flex justify-center mb-2">
            <div 
              className="relative group/pfp cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Click to change photo"
            >
              <img
                src={avatar}
                alt={profile.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/30"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        )}

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

      {/* Footer Tagline & Log Out */}
      <div className="p-3 border-t border-white/5 bg-[#070b14]/70 space-y-2">
        {!isCollapsed && (
          <div className="text-[11px] text-slate-400 text-center">
            <p className="font-medium text-slate-300">Understand · Predict · Automate</p>
            <p className="text-[10px] text-slate-500 mt-0.5">One Customer · One Intelligence Layer</p>
          </div>
        )}

        {/* Log Out button at the bottom */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer group",
            isCollapsed && "px-0"
          )}
          title="Log Out"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
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

      {/* Profile Details & PFP Management Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-[#0b101d] rounded-3xl border border-white/10 max-w-md w-full shadow-2xl overflow-hidden text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">User Profile Details</h3>
                  <p className="text-[11px] text-slate-400">Account management & security status</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Avatar Photo Section with Change PFP Button */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-blue-950/20 border border-cyan-500/20">
                <div className="relative group/modalPfp cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img
                    src={avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-cyan-500/30 shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/modalPfp:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white">{profile.name}</h4>
                  <p className="text-xs text-slate-400">{profile.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Change PFP</span>
                    </button>
                    <button
                      onClick={resetAvatar}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Work Email
                  </span>
                  <span className="font-semibold text-slate-200 font-mono">{profile.email}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Organization
                  </span>
                  <span className="font-semibold text-slate-200">Acme Enterprise Corp</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    RBAC Role / Tier
                  </span>
                  <span className="font-bold text-cyan-300 uppercase font-mono text-[11px] bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    SUPER_ADMIN
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Department
                  </span>
                  <span className="font-semibold text-slate-200">{profile.department}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium">Employee ID</span>
                  <span className="font-mono text-slate-300 font-semibold">{profile.empId}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400 font-medium">Security Clearance</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SOC-2 Type II · 2FA Active
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Session</span>
              </button>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
