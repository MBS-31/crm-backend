"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu, AlertCircle, Loader2 } from "lucide-react";
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
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors bg-white";

  return (
    <AnimatePresence>
      {loginModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden"
        >
          {/* Background Illustration */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-bottom opacity-90" 
            style={{ backgroundImage: "url('/golf-course.jpg')" }} 
          />

          {/* Top Bar */}
          <div className="relative z-10 w-full px-6 py-6 flex items-center justify-between">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">
                OpenCRM
              </span>
            </div>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Contact support
            </button>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-[400px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-3xl p-8 shadow-2xl shadow-slate-200/50"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif text-slate-900 mb-1.5">
                  {mode === "login" ? "Log in to OpenCRM" : "Sign up for OpenCRM"}
                </h2>
                <p className="text-sm text-slate-500">
                  {mode === "login" ? "Your enterprise dashboard starts here" : "Start managing your business today"}
                </p>
              </div>

              {/* Notice Message */}
              <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Social login is currently disabled. Please sign in with your work email.</span>
              </div>


              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input {...register("fullName")} placeholder="Rahul Sharma" className={inputCls} />
                    {errors.fullName && (
                      <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email address</label>
                  <input {...register("email")} type="email" placeholder="you@company.com" className={inputCls} />
                  {errors.email && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                  <input {...register("password")} type="password" placeholder="••••••••" className={inputCls} />
                  {errors.password && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {mode === "login" ? "Continue with Email" : "Create Account"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    {mode === "login" ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
