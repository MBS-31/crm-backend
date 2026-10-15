import React, { useRef, useState } from 'react';
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
  ChevronDown,
  Camera,
  LogOut,
  User,
  Mail,
  Building2,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LogipLogo } from './Icons';
import { useCrmStore } from '../store/useCrmStore';
import { useLandingStore } from '../store/useLandingStore';
import gsap from 'gsap';

export default function Sidebar() {
  const { activeTab, setActiveTab, setCopilotOpen, setBenchmarkOpen, currentOrg, currentRole } = useCrmStore();
  const { setCurrentView } = useLandingStore();
  const sidebarRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    try {
      return localStorage.getItem('crm_user_avatar') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
    } catch {
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
    }
  });

  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    role: 'Senior VP of Sales',
    email: 'rahul.sharma@logip.ai',
    department: 'Enterprise Customer Operations',
    empId: 'LOGIP-8841',
    status: 'Online',
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (typeof base64 === 'string') {
          setAvatar(base64);
          try {
            localStorage.setItem('crm_user_avatar', base64);
          } catch (err) {
            console.warn('Could not save avatar to localStorage', err);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAvatar = () => {
    const defaultAv = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
    setAvatar(defaultAv);
    try {
      localStorage.removeItem('crm_user_avatar');
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of OpenCRM?')) {
      setCurrentView('landing');
    }
  };

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
    <>
      <aside 
        ref={sidebarRef}
        className="w-full h-full flex flex-col justify-between select-none overflow-y-auto pr-1"
      >
        <div>
          {/* Brand Logo & Platform Title */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 px-3 py-2 mb-3 cursor-pointer group"
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

          {/* Profile Option Above Command Centre */}
          <div className="mb-4 mx-1 p-2.5 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-2.5">
              {/* Profile Avatar with PFP Change Feature */}
              <div 
                className="relative group/pfp cursor-pointer flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
                title="Click to change profile picture"
              >
                <img
                  src={avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30 group-hover/pfp:ring-blue-600 transition-all shadow-xs"
                />
                <div className="absolute inset-0 rounded-full bg-slate-900/60 opacity-0 group-hover/pfp:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
                <span 
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" 
                  title="Status: Online"
                />
              </div>

              {/* Profile Details Header */}
              <div 
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => setIsProfileModalOpen(true)}
                title="View profile details"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">
                    {profile.name}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tracking-tight shrink-0">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate font-medium mt-0.5">
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Quick Details Bar */}
            <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 truncate max-w-[130px] font-mono">{profile.email}</span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer ml-1"
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

          {/* Grouped Sidebar Sections (Command Center, CRM Core, etc.) */}
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

        {/* Footer Area with Benchmark & Log Out Button */}
        <div className="pt-3 mt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setBenchmarkOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-blue-200/80"
          >
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span className="truncate">CRM Benchmark Report</span>
          </button>

          {/* Log Out Button at the bottom */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100/90 rounded-xl text-xs font-bold transition-all border border-rose-200/80 cursor-pointer group shadow-2xs"
            title="Log out of OpenCRM"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Profile Details & PFP Management Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-3xl border border-slate-200 max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">User Profile Details</h3>
                  <p className="text-[11px] text-slate-500">Account management & security status</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Avatar Photo Section with Change PFP Button */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border border-blue-100/70">
                <div className="relative group/modalPfp cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img
                    src={avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-slate-900/60 opacity-0 group-hover/modalPfp:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900">{profile.name}</h4>
                  <p className="text-xs text-slate-500">{profile.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Change PFP</span>
                    </button>
                    <button
                      onClick={resetAvatar}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Work Email
                  </span>
                  <span className="font-semibold text-slate-900 font-mono">{profile.email}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Organization
                  </span>
                  <span className="font-semibold text-slate-900">{currentOrg || 'Acme Enterprise Corp'}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                    RBAC Role / Tier
                  </span>
                  <span className="font-bold text-purple-700 uppercase font-mono text-[11px] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {currentRole || 'super_admin'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Department
                  </span>
                  <span className="font-semibold text-slate-900">{profile.department}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Employee ID</span>
                  <span className="font-mono text-slate-700 font-semibold">{profile.empId}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Security Clearance</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SOC-2 Type II · 2FA Active
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Session</span>
              </button>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
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

