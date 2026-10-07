import React, { useState } from 'react';
import { 
  GitFork, 
  Play, 
  Plus, 
  CheckCircle2, 
  ArrowDown, 
  Zap, 
  Sparkles, 
  Mail, 
  PhoneCall, 
  MessageSquare, 
  Users, 
  Sliders 
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';

export default function VisualWorkflowBuilder() {
  const [activeWorkflow, setActiveWorkflow] = useState('wf-1');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const workflowNodes = [
    {
      id: 'node-1',
      type: 'TRIGGER',
      title: '1. Trigger: New Lead Created',
      desc: 'Webhook event fired from Web Form / API endpoint',
      badge: 'Event Trigger',
      color: 'border-blue-400 bg-blue-50/40 text-blue-900',
    },
    {
      id: 'node-2',
      type: 'CONDITION',
      title: '2. Condition: Lead Score Assessment',
      desc: 'Check if Lead Score >= 90 AND Budget >= ₹20,00,000',
      badge: 'Rule Filter',
      color: 'border-amber-400 bg-amber-50/40 text-amber-900',
    },
    {
      id: 'node-3',
      type: 'AI DECISION',
      title: '3. AI Decision: Rep Matching & Intent Prediction',
      desc: 'Evaluate rep capacity, historical win rate, and customer industry affinity',
      badge: 'ML Decision Engine',
      color: 'border-purple-400 bg-purple-50/40 text-purple-900',
    },
    {
      id: 'node-4',
      type: 'ACTION',
      title: '4. Action: Automated Multi-Channel Dispatch',
      desc: 'Dispatch WhatsApp Welcome Template & Create Follow-up Task for Abhi within 4h',
      badge: 'Execution Node',
      color: 'border-emerald-400 bg-emerald-50/40 text-emerald-900',
    },
    {
      id: 'node-5',
      type: 'NOTIFICATION',
      title: '5. Notification: Manager Alert & Audit Log',
      desc: 'Send Slack/In-App alert to Sales Manager and record to PostgreSQL audit trail',
      badge: 'Notify Node',
      color: 'border-slate-400 bg-slate-50/40 text-slate-900',
    },
  ];

  const handleTestWorkflow = () => {
    setIsRunningTest(true);
    setTestResult(null);

    setTimeout(() => {
      setIsRunningTest(false);
      setTestResult({
        status: 'Success (200 OK)',
        executionTime: '342 ms',
        leadEvaluated: 'Vikramaditya Roy (Indus Retail Cloud)',
        scoreCalculated: 94,
        assignedTo: 'Abhi Sharma (Enterprise Rep)',
        whatsappStatus: 'Template "welcome_kyc_v1" dispatched via Meta Cloud API',
        auditRecord: 'Audit Log #WF-8012 saved',
      });
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Visual Workflow Automation Builder
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Live Engine Active
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Node-based trigger-to-action automation with embedded AI decisioning and multi-channel dispatch
          </p>
        </div>

        <button
          onClick={handleTestWorkflow}
          disabled={isRunningTest}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isRunningTest ? 'Simulating Run...' : 'Test Workflow'}</span>
        </button>
      </div>

      {/* Visual Canvas: Trigger → Condition → AI Decision → Action → Notification */}
      <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
        <div className="max-w-xl mx-auto space-y-3">
          {workflowNodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Workflow Node Card */}
              <div className={`p-4 rounded-2xl border bg-white shadow-2xs hover:shadow-xs transition-shadow ${node.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono opacity-80">
                    {node.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{node.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{node.desc}</p>
              </div>

              {/* Connecting Down Arrow */}
              {idx < workflowNodes.length - 1 && (
                <div className="flex justify-center my-1">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center shadow-2xs">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Live Test Run Execution Log */}
      {testResult && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200 font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Workflow Execution Test Passed ({testResult.executionTime})
            </span>
            <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              {testResult.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-800 font-mono">
            <div>Lead: <strong>{testResult.leadEvaluated}</strong></div>
            <div>Calculated Score: <strong>{testResult.scoreCalculated}/100</strong></div>
            <div>Assigned Rep: <strong>{testResult.assignedTo}</strong></div>
            <div>Channel: <strong>{testResult.whatsappStatus}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
