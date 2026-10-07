"use client";

import React from "react";
import App from "@/App";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Top Banner Navigation back to Homepage */}
      <div className="sticky top-0 z-50 bg-[#070913] text-white px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to OpenCRM Homepage</span>
          </Link>
          <span className="text-slate-400 hidden sm:inline">
            You are exploring the live enterprise dashboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-emerald-400 text-[11px]">LIVE DEMO ACTIVE</span>
        </div>
      </div>

      <App />
    </div>
  );
}
