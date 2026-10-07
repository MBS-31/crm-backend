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

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="flex items-center justify-center h-10 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center h-10 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm3.66 15.4c-1.31.86-2.98.91-4.24.12-.91-.56-1.55-1.56-1.72-2.61-.17-1.04.14-2.13.87-2.92.73-.79 1.77-1.14 2.84-1.04 1.07.11 2.01.69 2.59 1.63.42.68.61 1.49.52 2.29-.1 1.05-.69 1.98-1.57 2.53zM16 11.1c-.81 0-1.54-.36-2.02-.93-.48-.57-.71-1.32-.61-2.08.09-.76.53-1.46 1.18-1.92.65-.46 1.47-.64 2.24-.51.77.13 1.45.58 1.88 1.25.43.67.6 1.48.47 2.25-.13.77-.6 1.45-1.28 1.87-.55.33-1.19.51-1.86.51z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center h-10 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-100" />
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
