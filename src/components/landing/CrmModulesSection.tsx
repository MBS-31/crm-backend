"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Users,
  Building2,
  FileText,
  BarChart3,
  ArrowRight,
  Check,
  FileSpreadsheet,
  FileImage,
  FileType2,
} from "lucide-react";
import { useLandingStore } from "../../store/useLandingStore";
import { useCrmStore } from "../../store/useCrmStore";

type Module = {
  id: string;
  tab: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  icon: React.ElementType;
  accent: string; // tailwind gradient
  preview: React.ReactNode;
};

/* ---------- Small visual previews for each module ---------- */

const LeadsPreview = () => (
  <div className="space-y-2.5">
    {[
      { name: "Rahul Sharma", co: "Acme Industries", score: 92, tag: "Hot" },
      { name: "Priya Nair", co: "BlueOrbit Labs", score: 78, tag: "Warm" },
      { name: "Arjun Mehta", co: "Nimbus Retail", score: 54, tag: "New" },
    ].map((l) => (
      <div key={l.name} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-slate-200">
        <div>
          <p className="text-xs font-semibold text-slate-900">{l.name}</p>
          <p className="text-[10px] text-slate-500">{l.co}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500" style={{ width: `${l.score}%` }} />
          </div>
          <span className="text-[10px] font-bold text-orange-300 w-8 text-right">{l.score}</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">{l.tag}</span>
        </div>
      </div>
    ))}
  </div>
);

const ContactsPreview = () => (
  <div className="grid grid-cols-2 gap-2.5">
    {[
      { n: "Neha Kapoor", r: "Procurement Head", c: "from-pink-500 to-rose-500" },
      { n: "Vikram Rao", r: "CTO", c: "from-blue-500 to-cyan-500" },
      { n: "Sara Khan", r: "Ops Manager", c: "from-emerald-500 to-teal-500" },
      { n: "Dev Patel", r: "Founder", c: "from-violet-500 to-indigo-500" },
    ].map((p) => (
      <div key={p.n} className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.c} flex items-center justify-center text-[10px] font-bold text-slate-900`}>
          {p.n.split(" ").map((x) => x[0]).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-900 truncate">{p.n}</p>
          <p className="text-[10px] text-slate-500 truncate">{p.r}</p>
        </div>
      </div>
    ))}
  </div>
);

const CompaniesPreview = () => (
  <div className="space-y-2.5">
    {[
      { n: "Acme Industries", i: "Manufacturing", v: "₹42L", d: 6 },
      { n: "BlueOrbit Labs", i: "SaaS", v: "₹18L", d: 3 },
      { n: "Nimbus Retail", i: "E-commerce", v: "₹27L", d: 4 },
    ].map((c) => (
      <div key={c.n} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">{c.n}</p>
            <p className="text-[10px] text-slate-500">{c.i} · {c.d} open deals</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-300">{c.v}</span>
      </div>
    ))}
  </div>
);

const DocumentsPreview = () => (
  <div className="space-y-2.5">
    {[
      { n: "Acme_Proposal_v3.pdf", s: "2.4 MB", icon: FileType2, c: "text-rose-400" },
      { n: "Q3_Pricing_Sheet.xlsx", s: "860 KB", icon: FileSpreadsheet, c: "text-emerald-400" },
      { n: "Signed_Contract_BlueOrbit.pdf", s: "1.1 MB", icon: FileType2, c: "text-rose-400" },
      { n: "Product_Brochure.png", s: "3.2 MB", icon: FileImage, c: "text-sky-400" },
    ].map((f) => (
      <div key={f.n} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-slate-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <f.icon className={`w-4 h-4 flex-shrink-0 ${f.c}`} />
          <p className="text-xs font-medium text-slate-900 truncate">{f.n}</p>
        </div>
        <span className="text-[10px] text-slate-500 flex-shrink-0">{f.s}</span>
      </div>
    ))}
  </div>
);

const ReportsPreview = () => {
  const bars = [38, 52, 45, 66, 58, 74, 88];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { k: "Revenue", v: "₹1.2Cr" },
          { k: "Win rate", v: "34%" },
          { k: "New leads", v: "248" },
        ].map((m) => (
          <div key={m.k} className="p-3 rounded-xl bg-white shadow-sm border border-slate-200">
            <p className="text-[10px] text-slate-500">{m.k}</p>
            <p className="text-sm font-bold text-slate-900">{m.v}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 h-28 p-3 rounded-xl bg-white shadow-sm border border-slate-200">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600/60 to-fuchsia-400/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
};

const MODULES: Module[] = [
  {
    id: "leads",
    tab: "leads",
    label: "Leads",
    title: "Capture and qualify every lead",
    description: "See all incoming leads with a score, so your team knows exactly who to call first.",
    points: ["Lead scoring", "Status tracking (New / Warm / Hot)", "Assign to sales reps"],
    icon: Flame,
    accent: "from-orange-500 to-rose-500",
    preview: <LeadsPreview />,
  },
  {
    id: "contacts",
    tab: "customer360",
    label: "Contacts",
    title: "All your people, organised",
    description: "Every contact with their role, company, and full interaction history in one profile.",
    points: ["360° contact profile", "Notes & activity timeline", "Quick search"],
    icon: Users,
    accent: "from-sky-500 to-blue-600",
    preview: <ContactsPreview />,
  },
  {
    id: "companies",
    tab: "deals",
    label: "Companies",
    title: "Track accounts and their deals",
    description: "Group contacts by company and see deal value and open opportunities for each account.",
    points: ["Company profiles", "Linked contacts & deals", "Pipeline value per account"],
    icon: Building2,
    accent: "from-emerald-500 to-teal-500",
    preview: <CompaniesPreview />,
  },
  {
    id: "documents",
    tab: "calls",
    label: "Documents",
    title: "Store files where you need them",
    description: "Proposals, contracts and sheets attached to the right lead, contact or company.",
    points: ["Upload PDFs, sheets, images", "Attach to any record", "Secure self-hosted storage"],
    icon: FileText,
    accent: "from-amber-500 to-orange-500",
    preview: <DocumentsPreview />,
  },
  {
    id: "reports",
    tab: "brief",
    label: "Reports",
    title: "Know how your sales are doing",
    description: "Clear charts for revenue, win rate and lead growth — no spreadsheets needed.",
    points: ["Revenue & win-rate reports", "Team performance", "Weekly trends"],
    icon: BarChart3,
    accent: "from-violet-500 to-fuchsia-500",
    preview: <ReportsPreview />,
  },
];

export default function CrmModulesSection() {
  const { setCurrentView } = useLandingStore();
  const setActiveTab = useCrmStore((s: { setActiveTab: (tab: string) => void }) => s.setActiveTab);

  const openModule = (tab: string) => {
    setActiveTab(tab);
    setCurrentView("dashboard");
  };

  return (
    <div className="relative py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {MODULES.map((m, idx) => {
          const Icon = m.icon;
          const reverse = idx % 2 === 1;
          return (
            <motion.section
              key={m.id}
              id={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="scroll-mt-28 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
            >
              {/* Text */}
              <div className={reverse ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.accent} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-slate-900" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{m.label}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">{m.title}</h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">{m.description}</p>
                <ul className="space-y-2.5 mb-7">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  id={`open-${m.id}`}
                  onClick={() => openModule(m.tab)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white shadow-sm hover:bg-slate-50 border border-slate-200 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Open {m.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Preview card */}
              <div className={reverse ? "lg:order-1" : ""}>
                <div className="relative">
                  <div className={`absolute -inset-4 rounded-[32px] bg-gradient-to-br ${m.accent} opacity-[0.12] blur-2xl -z-10`} />
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-semibold text-slate-900">{m.label}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                      </div>
                    </div>
                    {m.preview}
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
