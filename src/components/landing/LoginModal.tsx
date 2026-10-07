"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, AlertCircle, LogIn, UserPlus, Loader2, Cpu } from "lucide-react";
import { useLandingStore } from "../../store/useLandingStore";
import { useCrmStore } from "../../store/useCrmStore";

const authSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, setCurrentView } = useLandingStore();
  const setActiveTab = useCrmStore((s: { setActiveTab: (tab: string) => void }) => s.setActiveTab);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });

  const handleClose = () => {
    setLoginModalOpen(false);
    setTimeout(() => {
      reset();
      setMode("login");
    }, 200);
  };

  const onSubmit = async (data: AuthFormData) => {
    if (mode === "signup" && (!data.fullName || data.fullName.trim().length < 2)) {
      setError("fullName", { message: "Name must be at least 2 characters" });
      return;
    }
    setIsSubmitting(true);
    // Demo auth — replace with backend /api/auth call when available
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    handleClose();
    setActiveTab("dashboard");
    setCurrentView("dashboard");
  };

  const inputCls =
    "w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50";

  return (
    <AnimatePresence>
      {loginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-[#0A0D1A] border border-white/[0.12] p-6 sm:p-8 shadow-2xl shadow-indigo-950/80 text-white overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl" />

            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 p-0.5 mb-4">
                <div className="w-full h-full bg-[#0A0D1A] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {mode === "login"
                  ? "Sign in to your self-hosted OpenCRM workspace."
                  : "Start managing leads, contacts and companies in minutes."}
              </p>
            </div>

            {/* Mode switch */}
            <div className="grid grid-cols-2 gap-1 p-1 mb-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === m ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m === "login" ? "Login" : "Sign up"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input {...register("fullName")} id="auth-name" placeholder="Rahul Sharma" className={inputCls} />
                  </div>
                  {errors.fullName && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </span>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input {...register("email")} id="auth-email" type="email" placeholder="you@company.com" className={inputCls} />
                </div>
                {errors.email && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input {...register("password")} id="auth-password" type="password" placeholder="••••••••" className={inputCls} />
                </div>
                {errors.password && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                id="auth-submit"
                disabled={isSubmitting}
                className="w-full py-2.5 inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl transition-all shadow-lg shadow-indigo-950/50 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : mode === "login" ? (
                  <LogIn className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {mode === "login" ? "Sign in" : "Create account"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
