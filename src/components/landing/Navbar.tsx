"use client";

import React, { useState, useEffect } from "react";
import Link from "./CustomLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Flame,
  Users,
  Building2,
  FileText,
  BarChart3,
  LogIn,
  Menu,
  X,
  Cpu,
} from "lucide-react";
import { useLandingStore } from "../../store/useLandingStore";
import { useCrmStore } from "../../store/useCrmStore";

// Each nav item opens the live dashboard on the matching workspace tab
const NAV_ITEMS = [
  { label: "Dashboard", tab: "dashboard", icon: LayoutDashboard },
  { label: "Leads", tab: "leads", icon: Flame },
  { label: "Contacts", tab: "customer360", icon: Users },
  { label: "Companies", tab: "deals", icon: Building2 },
  { label: "Documents", tab: "calls", icon: FileText },
  { label: "Reports", tab: "brief", icon: BarChart3 },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileNavOpen, setMobileNavOpen, setCurrentView, setLoginModalOpen } = useLandingStore();
  const setActiveTab = useCrmStore((s: { setActiveTab: (tab: string) => void }) => s.setActiveTab);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWorkspace = (tab: string) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
    setCurrentView("dashboard");
  };

  const openLogin = () => {
    setMobileNavOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-xl shadow-black/5 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Open<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CRM</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/50 border border-slate-200 rounded-full px-2 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map(({ label, tab, icon: Icon }) => (
              <button
                key={label}
                id={`nav-${label.toLowerCase()}`}
                onClick={() => openWorkspace(tab)}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                {label}
              </button>
            ))}
          </nav>

          {/* Right: Login / Sign in */}
          <div className="hidden lg:flex items-center">
            <button
              id="nav-login"
              onClick={openLogin}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all duration-200 shadow-md shadow-indigo-950/50 hover:shadow-indigo-500/25 hover:-translate-y-0.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login / Sign in
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openLogin}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-md"
            >
              Sign in
            </button>
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
              aria-label="Toggle menu"
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
            className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-2xl px-4 py-5"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map(({ label, tab, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => openWorkspace(tab)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 text-left"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-200">
                <button
                  onClick={openLogin}
                  className="w-full py-2.5 inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg shadow-lg"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login / Sign in
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
