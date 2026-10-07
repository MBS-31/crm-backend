import React, { useRef } from 'react';
import { 
  Home, 
  Sparkles, 
  Radar, 
  Users, 
  Flame, 
  TrendingUp, 
  CheckSquare, 
  Bot, 
  ShieldAlert, 
  Award, 
  Sliders, 
  Inbox, 
  PhoneCall, 
  Radio, 
  Zap, 
  GitFork, 
  Shield, 
  Server, 
  FileText, 
  ChevronDown 
} from 'lucide-react';
import { LogipLogo } from './Icons';
import { useCrmStore } from '../store/useCrmStore';
import gsap from 'gsap';

export default function Sidebar() {
  const { activeTab, setActiveTab, setCopilotOpen, setBenchmarkOpen } = useCrmStore();
  const sidebarRef = useRef(null);

  const navSections = [
    {
      title: 'COMMAND CENTER',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: Home },
        { id: 'brief', label: 'AI Executive Brief', icon: Sparkles },
        { id: 'radar', label: 'Opportunity Radar', icon: Radar },
      ],
    },
    {
      title: 'CRM CORE',
      items: [
        { id: 'customer360', label: 'Customer 360°', icon: Users },
        { id: 'leads', label: 'Lead Intelligence', icon: Flame },
        { id: 'deals', label: 'Deals & Pipeline', icon: TrendingUp },
      ],
    },
    {
      title: 'AI INTELLIGENCE',
      items: [
        { id: 'sales_coach', label: 'AI Sales Coach', icon: Award },
        { id: 'simulator', label: 'What-If Simulator', icon: Sliders },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { id: 'inbox', label: 'Unified Inbox', icon: Inbox },
        { id: 'calls', label: 'Voice Calls (MinIO)', icon: PhoneCall },
        { id: 'omnichannel', label: 'Omni-Channel Hub', icon: Radio },
      ],
    },
    {
      title: 'AUTOMATION',
      items: [
        { id: 'ai_agent', label: 'Autonomous AI Agent', icon: Zap },
        { id: 'workflows', label: 'Visual Workflow Builder', icon: GitFork },
      ],
    },
    {
      title: 'ADMIN & INFRA',
      items: [
        { id: 'rbac', label: '5-Tier RBAC Security', icon: Shield },
        { id: 'infra', label: 'Docker & MinIO Stack', icon: Server },
      ],
    },
  ];

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 3,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  return (
    <aside 
      ref={sidebarRef}
      className="w-full h-full flex flex-col justify-between select-none overflow-y-auto pr-1"
    >
      <div>
        {/* Brand Logo & Platform Title */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 px-3 py-2 mb-4 cursor-pointer group"
        >
          <div className="text-slate-900 group-hover:rotate-12 transition-transform duration-300">
            <LogipLogo className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] font-extrabold tracking-tight text-slate-900 leading-none">
                logip
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                AI Platform
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Customer Intelligence
            </span>
          </div>
        </div>

        {/* Grouped Sidebar Sections */}
        <div className="space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold text-slate-400 tracking-wider">
                {section.title}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.isAction) setCopilotOpen(true);
                        else setActiveTab(item.id);
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer group ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon 
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                            isActive ? 'text-blue-400 stroke-[2.2]' : 'text-slate-400 stroke-[1.8]'
                          }`} 
                        />
                        <span className="text-xs truncate">{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Benchmark Button */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <button
          onClick={() => setBenchmarkOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-blue-200/80"
        >
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span className="truncate">CRM Benchmark Report</span>
        </button>
      </div>
    </aside>
  );
}
