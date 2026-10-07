"use client";

import React from "react";
import { Cpu } from "lucide-react";

const LINKS = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Leads", href: "#leads" },
  { label: "Contacts", href: "#contacts" },
  { label: "Companies", href: "#companies" },
  { label: "Documents", href: "#documents" },
  { label: "Reports", href: "#reports" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 p-0.5">
            <div className="w-full h-full bg-[#070913] rounded-[7px] flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>
          <span className="font-bold text-white">
            Open<span className="text-blue-400">CRM</span>
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-slate-500">© {new Date().getFullYear()} OpenCRM</p>
      </div>
    </footer>
  );
}
