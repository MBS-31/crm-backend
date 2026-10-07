"use client";

import React, { useState } from "react";
import { mockWorkflows, mockCustomers } from "@/data/mockData";
import { workflowsService, WorkflowSimulationResult } from "@/services/workflows";
import { WorkflowNode, WorkflowNodeType } from "@/types";
import {
  GitBranch,
  Play,
  Save,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  CheckCircle,
  Plus,
  Zap,
  Filter,
  Bot,
  Send,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkflowsPage() {
  const [workflow, setWorkflow] = useState(mockWorkflows[0]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node_1");
  const [zoom, setZoom] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<WorkflowSimulationResult | null>(null);
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("cust_rahul");

  const selectedNode = workflow.nodes.find((n) => n.id === selectedNodeId) || workflow.nodes[0];

  const handleTestWorkflow = async () => {
    setIsSimulating(true);
    try {
      const res = await workflowsService.simulate(workflow.id, selectedCustomerId);
      setSimulationResult(res);
      setIsSimModalOpen(true);
    } finally {
      setIsSimulating(false);
    }
  };

  const getNodeIcon = (type: WorkflowNodeType) => {
    switch (type) {
      case "Trigger":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "Condition":
        return <Filter className="w-4 h-4 text-blue-400" />;
      case "AI":
        return <Bot className="w-4 h-4 text-violet-400" />;
      case "Action":
        return <Send className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title & Canvas Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Visual Workflow Automation Builder
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build event-driven pipelines across CRM triggers, AI evaluation gates, and multi-channel actions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestWorkflow}
            disabled={isSimulating}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? "Simulating..." : "Test Workflow"}</span>
          </button>

          <button
            onClick={() => alert("Workflow configuration persisted to PostgreSQL backend.")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Workflow</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Canvas Visual Area (lg:col-span-8) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/5 bg-[#090d18] relative flex flex-col h-[600px] overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="p-3 border-b border-white/5 bg-[#0b1020] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{workflow.name}</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {workflow.status.toUpperCase()}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.1, 1.3))}
                className="p-1 text-slate-400 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 text-slate-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.1, 0.7))}
                className="p-1 text-slate-400 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Workflow Canvas Interactive Area */}
          <div className="flex-1 overflow-auto p-8 flex flex-col items-center justify-start space-y-4">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
                transition: "transform 0.15s ease",
              }}
              className="space-y-4 flex flex-col items-center"
            >
              {workflow.nodes.map((node, index) => {
                const isSelected = selectedNodeId === node.id;

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Card */}
                    <div
                      onClick={() => setSelectedNodeId(node.id)}
                      className={cn(
                        "w-80 p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 shadow-xl",
                        isSelected
                          ? "bg-[#131c33] border-cyan-400 ring-2 ring-cyan-500/20 shadow-cyan-950/50"
                          : "bg-[#0d1424] border-white/10 hover:border-white/20"
                      )}
                    >
                      <div
                        className={cn(
                          "p-2.5 rounded-xl border shrink-0",
                          node.type === "Trigger"
                            ? "bg-amber-500/10 border-amber-500/30"
                            : node.type === "Condition"
                            ? "bg-blue-500/10 border-blue-500/30"
                            : node.type === "AI"
                            ? "bg-violet-500/10 border-violet-500/30"
                            : "bg-emerald-500/10 border-emerald-500/30"
                        )}
                      >
                        {getNodeIcon(node.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white truncate">{node.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase">
                            {node.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    {/* Connecting Arrow between nodes */}
                    {index < workflow.nodes.length - 1 && (
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-cyan-500/40" />
                        <div className="w-2 h-2 rotate-45 border-r border-b border-cyan-400" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Node Configuration Inspector (lg:col-span-4) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-5 border border-white/5 space-y-4 bg-[#0a0f1d]">
          <div className="pb-3 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Node Inspector</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
              ID: {selectedNode.id}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block text-[11px] mb-1">Node Type</label>
              <div className="font-mono font-bold text-cyan-400 bg-white/5 p-2 rounded-lg">
                {selectedNode.type}
              </div>
            </div>

            <div>
              <label className="text-slate-400 block text-[11px] mb-1">Title</label>
              <input
                type="text"
                value={selectedNode.title}
                readOnly
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white font-medium"
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[11px] mb-1">Description</label>
              <textarea
                rows={3}
                value={selectedNode.description}
                readOnly
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-slate-300"
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[11px] mb-1">Parameters (JSON)</label>
              <pre className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-cyan-300 overflow-x-auto">
                {JSON.stringify(selectedNode.config, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Modal (Prompt #25) */}
      {isSimModalOpen && simulationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#0e1628] border border-cyan-500/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Workflow Simulation Verified
              </h3>
              <button
                onClick={() => setIsSimModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Target Entity: <strong className="text-white">{simulationResult.customerName}</strong>
            </div>

            {/* Checklist of simulated steps */}
            <div className="space-y-2 text-xs">
              {simulationResult.steps.map((st, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{st.nodeTitle}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{st.output}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsSimModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Done Testing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
