"use client";

import React, { useState } from "react";
import { Sparkles, Eye, EyeOff, ArrowRight, Shield, Zap, Bot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rahul.sharma@logip.ai");
  const [password, setPassword] = useState("demo1234");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060a12] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-[1.5px] shadow-2xl shadow-cyan-500/30 mb-4">
            <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">LOGIP</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">AI-Native Enterprise CRM</p>
          <p className="text-xs text-slate-500 mt-0.5">One Customer · One Intelligence Layer · One CRM</p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Welcome back</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sign in to your intelligence platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/[0.06] transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/[0.06] transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-cyan-400 w-3.5 h-3.5" />
                Remember this device
              </label>
              <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to LOGIP
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* SSO Divider */}
          <div className="mt-5 pt-5 border-t border-white/8">
            <p className="text-[11px] text-slate-500 text-center mb-3">Or continue with enterprise SSO</p>
            <div className="grid grid-cols-2 gap-2">
              {["Google Workspace", "Microsoft Entra"].map((sso) => (
                <button
                  key={sso}
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                >
                  {sso}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-cyan-500" />
            SOC-2 Type II
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-500" />
            99.98% Uptime SLA
          </span>
          <span className="flex items-center gap-1.5">
            <Bot className="w-3 h-3 text-violet-400" />
            AI-Native Platform
          </span>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-center">
          <p className="text-[11px] text-cyan-300 font-medium">
            🎯 Demo credentials pre-filled — just click Sign In
          </p>
        </div>
      </div>
    </div>
  );
}
