'use client';

import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl shadow-cyan-500/10 text-cyan-400 mb-2">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-mono">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-200">
            Sector Not Found in Intelligence Grid
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The coordinates or resource you are attempting to query do not exist in the active neural topology.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Command Center
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Sector
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <p className="text-xs text-slate-600 font-mono">
            LOGIP Intelligence System • Error Ref: 0x404_NULL_POINTER
          </p>
        </div>
      </div>
    </div>
  );
}
