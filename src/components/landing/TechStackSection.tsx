"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Code2,
  Palette,
  Component,
  Boxes,
  Sparkles,
  Zap,
  Sliders,
  CheckSquare,
  ShieldAlert,
  Database,
  Container,
  HardDrive
} from "lucide-react";

export default function TechStackSection() {
  const stack = [
    { name: "Next.js 15", category: "App Router & SSR", icon: Layers, highlight: "Server Components" },
    { name: "TypeScript", category: "Strict Type Safety", icon: Code2, highlight: "Strict Mode" },
    { name: "Tailwind CSS v4", category: "Utility-First Styling", icon: Palette, highlight: "Modern Tokens" },
    { name: "shadcn/ui", category: "Accessible Primitives", icon: Component, highlight: "Clean DX" },
    { name: "Radix UI", category: "Headless UI Components", icon: Boxes, highlight: "WAI-ARIA Compliant" },
    { name: "Framer Motion", category: "Declarative Animations", icon: Sparkles, highlight: "Spring Physics" },
    { name: "GSAP", category: "High-Performance Parallax", icon: Zap, highlight: "Timeline Choreography" },
    { name: "Zustand", category: "Micro State Management", icon: Sliders, highlight: "Zero Boilerplate" },
    { name: "React Hook Form", category: "Performant Form State", icon: CheckSquare, highlight: "Minimal Re-renders" },
    { name: "Zod", category: "Schema Validation", icon: ShieldAlert, highlight: "Type Inference" },
    { name: "PostgreSQL 16", category: "Primary Data Engine", icon: Database, highlight: "RLS & pgvector" },
    { name: "Docker", category: "Container Virtualization", icon: Container, highlight: "Compose Multi-node" },
    { name: "MinIO", category: "Private Object Storage", icon: HardDrive, highlight: "S3 Compatible" },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-[#060812] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 inline-block mb-3">
            Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Engineered with modern standards.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Battle-tested technologies chosen for performance, type safety, and zero vendor lock-in.
          </p>
        </div>

        {/* Horizontal Tech Ecosystem Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {stack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all text-center group cursor-default flex flex-col items-center justify-between"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-110 transition-transform mb-2">
                <item.icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="font-semibold text-xs text-white group-hover:text-indigo-200 transition-colors">
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate w-full mt-0.5">
                {item.category}
              </div>
              <div className="mt-2 text-[9px] font-mono text-indigo-400/90 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                {item.highlight}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
