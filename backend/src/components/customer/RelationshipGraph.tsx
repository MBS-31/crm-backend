"use client";

import React, { useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  Mail,
  MessageSquare,
  PhoneCall,
  CheckSquare,
  FileText,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  type: "center" | "company" | "deal" | "email" | "whatsapp" | "call" | "task" | "doc";
  icon: React.ElementType;
  x: number;
  y: number;
  color: string;
  badge?: string;
}

export default function RelationshipGraph({ customerName = "Rahul Sharma", companyName = "ABC Technologies" }: { customerName?: string; companyName?: string }) {
  const [selectedNode, setSelectedNode] = useState<string>("center");
  const [zoom, setZoom] = useState<number>(1);

  const nodes: GraphNode[] = [
    {
      id: "center",
      label: customerName,
      sublabel: "Primary Stakeholder (CIO)",
      type: "center",
      icon: Users,
      x: 350,
      y: 200,
      color: "from-cyan-500 to-blue-600",
      badge: "Health: 91",
    },
    {
      id: "company",
      label: companyName,
      sublabel: "Enterprise Parent Account",
      type: "company",
      icon: Building2,
      x: 150,
      y: 90,
      color: "from-blue-600 to-indigo-600",
      badge: "₹48L ARR",
    },
    {
      id: "deal",
      label: "Global Tech Expansion",
      sublabel: "Negotiation (₹85L)",
      type: "deal",
      icon: Briefcase,
      x: 550,
      y: 90,
      color: "from-emerald-500 to-teal-600",
      badge: "65% Prob",
    },
    {
      id: "whatsapp",
      label: "WhatsApp Cloud Stream",
      sublabel: "88 Live Messages",
      type: "whatsapp",
      icon: MessageSquare,
      x: 140,
      y: 290,
      color: "from-emerald-600 to-green-500",
      badge: "Active",
    },
    {
      id: "calls",
      label: "Sales Call Recording",
      sublabel: "04:32 MinIO Key Sync",
      type: "call",
      icon: PhoneCall,
      x: 560,
      y: 290,
      color: "from-violet-500 to-purple-600",
      badge: "42% Talk",
    },
    {
      id: "tasks",
      label: "Pending Follow-up Task",
      sublabel: "Due in 24h: Pricing SLA",
      type: "task",
      icon: CheckSquare,
      x: 350,
      y: 350,
      color: "from-amber-500 to-orange-600",
      badge: "High Pri",
    },
    {
      id: "docs",
      label: "SOC-2 & Master SLA",
      sublabel: "12 Cloud Artifacts",
      type: "doc",
      icon: FileText,
      x: 350,
      y: 50,
      color: "from-slate-600 to-slate-500",
      badge: "Verified",
    },
  ];

  const centerNode = nodes.find((n) => n.id === "center")!;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Customer Relationship Graph</h4>
            <p className="text-[11px] text-slate-400">Live multi-channel telemetry & contextual node links</p>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 1.4))}
            className="p-1 hover:text-white text-slate-400"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1 text-slate-300">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.7))}
            className="p-1 hover:text-white text-slate-400"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1 hover:text-white text-slate-400"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[420px] bg-[#070b14]/70 rounded-xl my-3 overflow-hidden border border-white/5 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox="0 0 700 400"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.2s ease" }}
        >
          {/* Animated Connecting Lines */}
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {nodes
            .filter((n) => n.id !== "center")
            .map((target) => (
              <g key={`edge-${target.id}`}>
                {/* Background pulse line */}
                <line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Active connecting line */}
                <line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="url(#lineGrad)"
                  strokeWidth={selectedNode === target.id ? "3" : "1.5"}
                  strokeOpacity={selectedNode === target.id ? "1" : "0.5"}
                />
              </g>
            ))}

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            const isCenter = node.type === "center";

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node.id)}
                className="cursor-pointer"
              >
                {/* Node ambient halo */}
                <circle
                  r={isCenter ? 36 : 26}
                  className={cn(
                    "transition-all duration-300",
                    isSelected ? "fill-cyan-500/20 stroke-cyan-400 stroke-2" : "fill-slate-900/90 stroke-white/20 stroke-1 hover:stroke-cyan-400"
                  )}
                />

                {/* Node center circle with gradient */}
                <circle
                  r={isCenter ? 26 : 20}
                  className={cn(
                    "fill-slate-950 transition-transform",
                    isSelected && "scale-105"
                  )}
                />

                {/* Center Icon */}
                <foreignObject
                  x={isCenter ? -14 : -10}
                  y={isCenter ? -14 : -10}
                  width={isCenter ? 28 : 20}
                  height={isCenter ? 28 : 20}
                >
                  <div className="w-full h-full flex items-center justify-center text-cyan-300">
                    <Icon className={isCenter ? "w-6 h-6" : "w-4 h-4"} />
                  </div>
                </foreignObject>

                {/* Node labels */}
                <text
                  y={isCenter ? 48 : 38}
                  textAnchor="middle"
                  className={cn(
                    "text-[11px] font-bold fill-white select-none pointer-events-none",
                    isSelected && "fill-cyan-300"
                  )}
                >
                  {node.label}
                </text>
                <text
                  y={isCenter ? 62 : 50}
                  textAnchor="middle"
                  className="text-[9px] fill-slate-400 select-none pointer-events-none"
                >
                  {node.sublabel}
                </text>

                {/* Badge if available */}
                {node.badge && (
                  <text
                    y={isCenter ? -42 : -32}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-cyan-400 select-none pointer-events-none"
                  >
                    [{node.badge}]
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Summary Bar */}
      {selectedNode && (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Inspecting Node: </span>
            <strong className="text-white">
              {nodes.find((n) => n.id === selectedNode)?.label}
            </strong>
            <span className="text-slate-400 ml-2">
              — {nodes.find((n) => n.id === selectedNode)?.sublabel}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">
            Status: Fully Synced
          </span>
        </div>
      )}
    </div>
  );
}
