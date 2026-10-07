"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Layers, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Menu, 
  X,
  ExternalLink,
  Cpu,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { useLandingStore } from "@/store/useLandingStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileNavOpen, setMobileNavOpen, setDemoModalOpen } = useLandingStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070913]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Open Source Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-200 transition-colors">
                Open<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">CRM</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Open Source
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            <a
              href="#features"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              Features
            </a>
            <a
              href="#omnichannel"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              Omnichannel
            </a>
            <a
              href="#architecture"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              Architecture
            </a>
            <a
              href="#rbac"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              Security / RBAC
            </a>
            <a
              href="#deployment"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              Self-Host
            </a>
            <a
              href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all inline-flex items-center gap-1"
            >
              Docs <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors border border-transparent hover:border-white/[0.08]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>

            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-blue-300 hover:text-blue-200 bg-blue-500/10 hover:bg-blue-500/15 rounded-lg transition-colors border border-blue-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Live Demo
            </Link>

            <a
              href="#deployment"
              className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Deploy Locally
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/demo"
              className="px-2.5 py-1.5 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-lg border border-blue-500/20"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/[0.08] bg-[#070913]/95 backdrop-blur-2xl px-4 py-5"
          >
            <div className="flex flex-col gap-3">
              <a
                href="#features"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                Features
              </a>
              <a
                href="#omnichannel"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                Omnichannel Communications
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                Architecture & Docker
              </a>
              <a
                href="#rbac"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                5-Tier RBAC Security
              </a>
              <a
                href="#deployment"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                Self-Host Guide
              </a>
              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
                <a
                  href="#deployment"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-lg"
                >
                  Deploy Locally
                </a>
                <a
                  href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 text-center text-xs font-medium text-slate-300 bg-white/[0.05] rounded-lg border border-white/[0.08] flex items-center justify-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
