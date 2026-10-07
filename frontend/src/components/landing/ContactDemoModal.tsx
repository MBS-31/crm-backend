"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Building,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Server,
  ArrowRight
} from "lucide-react";
import { useLandingStore } from "@/store/useLandingStore";

const demoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid corporate email"),
  company: z.string().min(2, "Company name is required"),
  teamSize: z.string().min(1, "Please select team size"),
  hostingPreference: z.enum(["LOCAL_DOCKER", "KUBERNETES", "MANAGED_CLOUD"]),
  notes: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoSchema>;

export default function ContactDemoModal() {
  const { demoModalOpen, setDemoModalOpen } = useLandingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      hostingPreference: "LOCAL_DOCKER",
      teamSize: "10-50",
    },
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    // Simulate API request to backend
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setDemoModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 300);
  };

  if (!demoModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#0A0D1A] border border-white/[0.12] p-6 sm:p-8 shadow-2xl shadow-indigo-950/80 text-white overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 inline-block mb-2">
                  Enterprise Onboarding
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Get Tailored Self-Hosting Guide
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect with our core maintainers for custom deployment blueprints and RBAC configuration.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="rahul@acme.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Company & Team Size Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        {...register("company")}
                        type="text"
                        placeholder="Acme Corp"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>
                    {errors.company && (
                      <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.company.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Sales Team Size
                    </label>
                    <select
                      {...register("teamSize")}
                      className="w-full px-3 py-2 rounded-xl bg-[#070913] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                    >
                      <option value="1-10">1 - 10 reps</option>
                      <option value="10-50">10 - 50 reps</option>
                      <option value="50-250">50 - 250 reps</option>
                      <option value="250+">250+ Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Hosting Preference */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deployment Target
                  </label>
                  <select
                    {...register("hostingPreference")}
                    className="w-full px-3 py-2 rounded-xl bg-[#070913] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                  >
                    <option value="LOCAL_DOCKER">Docker Compose (On-Premises / VM)</option>
                    <option value="KUBERNETES">Kubernetes (EKS / GKE / Self-Managed)</option>
                    <option value="MANAGED_CLOUD">Dedicated Managed Private Cloud</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-xs hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Architecture Blueprint...
                    </>
                  ) : (
                    <>
                      Request Architecture Blueprint
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Blueprint Sent Successfully!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
                We've queued your custom Docker Compose configuration and architecture checklist. You will receive an email shortly.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
