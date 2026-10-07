import React from 'react';
import { 
  Search, 
  Shield, 
  HardDrive, 
  PhoneCall, 
  Award, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Bot, 
  Database, 
  Bell 
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import { TIERS } from './RbacManager';
import { DockerIcon, MinioIcon } from './Icons';

export default function TopNavbar() {
  const { 
    currentOrg, 
    setOrg, 
    availableOrgs, 
    currentRole, 
    setRole, 
    demoMode, 
    toggleDemoMode, 
    setCopilotOpen, 
    setSearchOpen, 
    setDialerOpen, 
    setBenchmarkOpen, 
    notificationsCount 
  } = useCrmStore();

  return (
    <header className="border-b border-slate-100 bg-slate-50/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left: Organization Switcher & Docker Stack Telemetry */}
      <div className="flex items-center gap-3">
        {/* Multi-Tenant Organization Switcher */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] text-slate-500 font-medium">Org:</span>
          <select
            value={currentOrg}
            onChange={(e) => setOrg(e.target.value)}
            className="bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer"
          >
            {availableOrgs.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        {/* Local Docker Compose Status */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-[11px] text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <strong className="text-slate-900">Docker:</strong>
          <span>5/5 Healthy (Postgres + MinIO)</span>
        </div>

        {/* Global Search Bar (Ctrl + K) */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 bg-white hover:bg-slate-100/80 border border-slate-200 text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 hidden sm:inline">Search CRM or ask semantic query...</span>
          <span className="font-mono text-[10px] bg-slate-100 border border-slate-200 px-1 rounded text-slate-500">
            Ctrl + K
          </span>
        </button>
      </div>

      {/* Right: 5-Tier RBAC, Demo Mode, Copilot, & Quick Launchers */}
      <div className="flex items-center gap-2">
        {/* Demo Mode Toggle */}
        <button
          onClick={toggleDemoMode}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
            demoMode
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Toggle realistic pre-loaded demo telemetry data"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${demoMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <span>{demoMode ? 'Demo Mode Active' : 'Load Demo Data'}</span>
        </button>

        {/* 5-Tier RBAC Role Selector */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-xl shadow-2xs">
          <Shield className="w-3.5 h-3.5 text-purple-600" />
          <select
            value={currentRole}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent font-bold text-[11px] text-purple-700 focus:outline-none cursor-pointer"
          >
            {TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI Copilot Slide-Over Launcher */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <Bot className="w-3.5 h-3.5 animate-pulse" />
          <span>AI Copilot</span>
        </button>

        {/* Softphone Dialer */}
        <button
          onClick={() => setDialerOpen(true)}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <PhoneCall className="w-3 h-3" />
          <span className="hidden sm:inline">Softphone</span>
        </button>
      </div>
    </header>
  );
}
