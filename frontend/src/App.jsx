import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { useCrmStore } from './store/useCrmStore';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import StatsRow from './components/StatsRow';
import PerformanceChart from './components/PerformanceChart';
import CurrentTasks from './components/CurrentTasks';
import ProfileCard from './components/ProfileCard';
import ActivityFeed from './components/ActivityFeed';
import AiExecutiveBrief from './components/AiExecutiveBrief';
import OpportunityRadar from './components/OpportunityRadar';
import Customer360View from './components/Customer360View';
import LeadIntelligenceView from './components/LeadIntelligenceView';
import DealsPipelineView from './components/DealsPipelineView';
import SalesCoachView from './components/SalesCoachView';
import WhatIfSimulatorView from './components/WhatIfSimulatorView';
import UnifiedInboxView from './components/UnifiedInboxView';
import CallIntelligenceView from './components/CallIntelligenceView';
import OmniChannelHub from './components/OmniChannelHub';
import AutonomousAiAgentView from './components/AutonomousAiAgentView';
import VisualWorkflowBuilder from './components/VisualWorkflowBuilder';
import RbacManager from './components/RbacManager';
import DockerInfraStatus from './components/DockerInfraStatus';
import AiCopilotPanel from './components/AiCopilotPanel';
import GlobalSearchModal from './components/GlobalSearchModal';
import WebRtcDialerModal from './components/WebRtcDialerModal';
import CrmBenchmarkModal from './components/CrmBenchmarkModal';
import gsap from 'gsap';

export default function App() {
  const { 
    activeTab, 
    currentRole, 
    setRole, 
    isDialerOpen, 
    setDialerOpen, 
    isBenchmarkOpen, 
    setBenchmarkOpen 
  } = useCrmStore();

  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4 }
      )
        .fromTo(
          centerColRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, x: 15 },
          { opacity: 1, x: 0, duration: 0.4 },
          '-=0.2'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top Navigation Bar */}
      <TopNavbar />

      {/* Main Three-Column Workspace Layout */}
      <div className="w-full flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-45px)]">
        {/* Left Column: Grouped Sidebar */}
        <div 
          ref={leftColRef} 
          className="w-full lg:w-[230px] xl:w-[250px] flex-shrink-0 flex flex-col justify-between p-3.5 sm:p-4 border-b lg:border-b-0 lg:border-r border-slate-100"
        >
          <Sidebar />
        </div>

        {/* Center Column: Dynamic Workspaces */}
        <div 
          ref={centerColRef} 
          className="flex-1 flex flex-col justify-between min-w-0 p-4 sm:p-6 lg:p-7 space-y-6 overflow-y-auto"
        >
          {/* Main Dashboard / Command Center */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <AiExecutiveBrief />
              <StatsRow />
              <PerformanceChart />
              <CurrentTasks />
            </div>
          )}

          {/* AI Executive Brief */}
          {activeTab === 'brief' && <AiExecutiveBrief />}

          {/* Opportunity Radar */}
          {activeTab === 'radar' && <OpportunityRadar />}

          {/* Customer 360 Workspace */}
          {activeTab === 'customer360' && <Customer360View />}

          {/* Lead Intelligence */}
          {activeTab === 'leads' && <LeadIntelligenceView />}

          {/* Deals & Pipeline */}
          {activeTab === 'deals' && (
            <DealsPipelineView onOpenDialer={() => setDialerOpen(true)} />
          )}

          {/* AI Sales Coach */}
          {activeTab === 'sales_coach' && <SalesCoachView />}

          {/* What-If Sales Simulator */}
          {activeTab === 'simulator' && <WhatIfSimulatorView />}

          {/* Unified Inbox */}
          {activeTab === 'inbox' && <UnifiedInboxView />}

          {/* Voice Calls (MinIO Intelligence) */}
          {activeTab === 'calls' && <CallIntelligenceView />}

          {/* Omni-Channel Hub */}
          {activeTab === 'omnichannel' && (
            <OmniChannelHub 
              currentRole={currentRole} 
              onOpenDialer={() => setDialerOpen(true)} 
            />
          )}

          {/* Autonomous AI Agent */}
          {activeTab === 'ai_agent' && <AutonomousAiAgentView />}

          {/* Visual Workflow Builder */}
          {activeTab === 'workflows' && <VisualWorkflowBuilder />}

          {/* 5-Tier RBAC */}
          {activeTab === 'rbac' && (
            <RbacManager 
              currentRole={currentRole} 
              onRoleChange={setRole} 
            />
          )}

          {/* Docker & MinIO Infrastructure */}
          {activeTab === 'infra' && <DockerInfraStatus />}
        </div>

        {/* Right Column: Profile & Live Customer Timeline */}
        <div
          ref={rightColRef}
          className="w-full lg:w-[310px] xl:w-[335px] flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 p-4 sm:p-5 lg:p-6 justify-between"
        >
          {/* Megan Norton Profile Card */}
          <ProfileCard />

          {/* Activity Feed & Live Customer Stream */}
          <ActivityFeed />
        </div>
      </div>

      {/* Global AI Copilot Slide-Over */}
      <AiCopilotPanel />

      {/* Global Semantic Search (Ctrl + K) */}
      <GlobalSearchModal />

      {/* WebRTC Softphone Dialer Modal */}
      <WebRtcDialerModal 
        isOpen={isDialerOpen} 
        onClose={() => setDialerOpen(false)} 
      />

      {/* Open-Source CRM Benchmark Report Modal */}
      <CrmBenchmarkModal 
        isOpen={isBenchmarkOpen} 
        onClose={() => setBenchmarkOpen(false)} 
      />
    </div>
  );
}
