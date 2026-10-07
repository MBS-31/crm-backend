"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogIn, ArrowRight } from "lucide-react";
import { useLandingStore } from "../../store/useLandingStore";
import { useCrmStore } from "../../store/useCrmStore";

export default function FinalCtaSection() {
  const { setLoginModalOpen, setCurrentView } = useLandingStore();
  const setActiveTab = useCrmStore((s: { setActiveTab: (tab: string) => void }) => s.setActiveTab);

  return (
    <section id="login" className="relative py-20 sm:py-24 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-violet-600/20 p-10 sm:p-14 text-center"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-indigo-500/20 blur-3xl" />
          <h2 className="relative text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="relative text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Sign in to manage your leads, contacts, companies, documents and reports.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="cta-login"
              onClick={() => setLoginModalOpen(true)}
              className="px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl shadow-xl hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-blue-200" />
              Login / Sign in
            </button>
            <button
              id="cta-dashboard"
              onClick={() => {
                setActiveTab("dashboard");
                setCurrentView("dashboard");
              }}
              className="group px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white shadow-sm hover:bg-slate-50 border border-white/[0.12] rounded-xl transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
