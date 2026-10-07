"use client";

import React from "react";
import App from "@/App";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Return to Landing Page Floating Bar */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-2xl hover:bg-slate-800 transition-all border border-slate-700 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to OpenCRM Homepage</span>
        </Link>
      </div>

      <App />
    </div>
  );
}
