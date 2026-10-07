import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  ShieldAlert, 
  Zap, 
  ArrowRight,
  Terminal,
  Clock,
  Play
} from 'lucide-react';

export default function AutonomousAiAgentView() {
  const [command, setCommand] = useState('Find all high-value leads that haven\'t been contacted for 3 days and create follow-ups.');
  const [executionResult, setExecutionResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(false);

  const sampleCommands = [
    'Find all high-value leads that haven\'t been contacted for 3 days and create follow-ups.',
    'Scan all deals closing this month and flag competitors mentioned in call transcripts.',
    'Identify accounts with health scores below 50 and draft executive re-engagement emails.',
    'Rebalance lead assignment across Team A and Team B based on current active capacity.',
  ];

  const handleRunCommand = (cmdToRun) => {
    const q = cmdToRun || command;
    if (!q) return;

    setIsProcessing(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      setExecutionResult({
        query: q,
        foundCount: 17,
        actionsExecuted: [
          'Scanned 480 total CRM leads in PostgreSQL database.',
          'Filtered 17 high-value leads (Deal estimate > ₹15L, last contact > 72 hours ago).',
          'Created 17 automated follow-up tasks with priority "HIGH".',
        ],
        assignments: [
          { team: 'Sales Team A (Abhi & Megan)', count: 8, detail: 'Assigned to top enterprise reps' },
          { team: 'Sales Team B (Guy & Kristin)', count: 5, detail: 'Mid-market capacity balance' },
          { team: 'Sales Manager (Margaret)', count: 4, detail: 'High-stake strategic accounts > ₹35L' },
        ],
        followupTrigger: 'Automated WhatsApp Cloud API template notification scheduled for 10:00 AM.',
        requiresApproval: true,
      });
      setNeedsApproval(true);
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Autonomous CRM AI Agent
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                Natural Language Execution Engine
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Execute complex multi-step CRM operations, audit triggers, and assignment redistributions using natural language
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Command Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Quick Natural Language Commands:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleCommands.map((sc, i) => (
            <button
              key={i}
              onClick={() => {
                setCommand(sc);
                handleRunCommand(sc);
              }}
              className="text-xs text-left bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl text-slate-700 transition-colors"
            >
              "{sc}"
            </button>
          ))}
        </div>
      </div>

      {/* Command Input Box */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white space-y-3 shadow-inner">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>AI AGENT WORKSPACE TERMINAL</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type natural-language CRM command..."
            className="flex-1 bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 font-mono"
          />
          <button
            onClick={() => handleRunCommand()}
            disabled={isProcessing}
            className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md flex-shrink-0"
          >
            {isProcessing ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Executing Plan...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Execute Command</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Execution Results View */}
      {executionResult && (
        <div className="p-5 bg-purple-50/40 border border-purple-200/80 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-xs text-slate-900">
                Autonomous Execution Plan Generated
              </h4>
            </div>
            <span className="font-mono text-xs font-bold text-purple-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-full">
              Found: {executionResult.foundCount} Records
            </span>
          </div>

          {/* Action Log */}
          <div className="space-y-1.5 text-xs text-slate-700">
            {executionResult.actionsExecuted.map((act, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{act}</span>
              </div>
            ))}
          </div>

          {/* Team Assignment Breakdown */}
          <div className="pt-2 border-t border-purple-200">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              Smart Task Assignment Distribution:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {executionResult.assignments.map((asg, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-purple-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{asg.team}</span>
                    <span className="text-xs font-bold font-mono text-purple-600 bg-purple-50 px-2 py-0.2 rounded-full">
                      {asg.count}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{asg.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SENSITIVE ACTION APPROVAL STEP (Requirement 15) */}
          {needsApproval && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Approval Required:</strong> Triggering external WhatsApp templates to 17 customer phone numbers requires confirmation.
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setNeedsApproval(false)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs transition-colors"
                >
                  Approve & Dispatch
                </button>
                <button
                  onClick={() => setExecutionResult(null)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
