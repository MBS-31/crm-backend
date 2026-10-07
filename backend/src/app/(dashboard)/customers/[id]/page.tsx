"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import RelationshipGraph from "@/components/customer/RelationshipGraph";
import { mockCustomers, mockDeals, mockCallRecording, mockConversations } from "@/data/mockData";
import { useUIStore, useCopilotStore } from "@/stores";
import { formatINR } from "@/lib/utils";
import {
  Users,
  Building2,
  HeartPulse,
  TrendingUp,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  CheckSquare,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Play,
  Download,
  Share2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "cust_rahul";
  const router = useRouter();
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];

  const [activeTab, setActiveTab] = useState<
    | "Overview"
    | "Timeline"
    | "Deals"
    | "Conversations"
    | "Calls"
    | "Emails"
    | "WhatsApp"
    | "Documents"
    | "Tasks"
    | "AI Insights"
  >("Overview");

  const tabs: (typeof activeTab)[] = [
    "Overview",
    "Timeline",
    "Deals",
    "Conversations",
    "Calls",
    "Emails",
    "WhatsApp",
    "Documents",
    "Tasks",
    "AI Insights",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/customers"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-white tracking-tight">
                {customer.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                Customer 360°
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {customer.company} · {customer.email} · {customer.phone}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              openSoftphoneWith({
                name: customer.name,
                company: customer.company,
                phone: customer.phone,
              })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Customer</span>
          </button>
          <button
            onClick={() => router.push("/inbox?channel=whatsapp")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Copilot</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip (Prompt #12: ARR, Health Score, Sentiment, Churn Risk, Next Best Action) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Annual Run-Rate
          </span>
          <div className="text-xl font-mono font-black text-white mt-1">
            {formatINR(customer.arr, true)}
          </div>
          <span className="text-[10px] text-emerald-400">Expansion stage</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Health Score
          </span>
          <div className="text-xl font-mono font-black text-cyan-300 mt-1">
            {customer.healthScore} / 100
          </div>
          <span className="text-[10px] text-emerald-400">Healthy category</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Sentiment
          </span>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {customer.sentiment}
          </div>
          <span className="text-[10px] text-slate-400">Telemetry: +14% QoQ</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Churn Risk
          </span>
          <div className="text-xl font-bold text-emerald-300 mt-1">
            {customer.churnRisk}
          </div>
          <span className="text-[10px] text-slate-400">Renewal: Jan 2027</span>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Next Best Action
          </span>
          <p className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
            {customer.nextBestAction}
          </p>
        </div>
      </div>

      {/* Interactive 10 Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-white/10 scrollbar-none">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3.5 py-2 text-xs font-semibold whitespace-nowrap rounded-t-lg transition-all",
                isSelected
                  ? "bg-white/[0.08] text-cyan-300 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview (Includes Relationship Graph!) */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          {/* Customer Relationship Graph (Prompt #13) */}
          <RelationshipGraph customerName={customer.name} companyName={customer.company} />

          {/* Quick dossier grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" /> Account Intelligence
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Assigned Sales Executive</span>
                  <span className="text-slate-200 font-medium">{customer.assignedRep}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Customer Since</span>
                  <span className="text-slate-200 font-medium">{customer.joinedDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Last Touchpoint</span>
                  <span className="text-emerald-400 font-medium">{customer.lastContact}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Tags</span>
                  <div className="flex gap-1">
                    {customer.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.2 rounded bg-white/5 text-slate-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-400" /> AI Strategic Dossier
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rahul Sharma is the key decision maker for IT infrastructure and software platforms. His team evaluated data residency compliance for PostgreSQL and MinIO on Mumbai AWS region. The commercial team raised per-seat pricing queries for 250 enterprise seats.
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
                <span>Recommendation: 2-Year Lock-in with 12% discount</span>
                <button
                  onClick={() => router.push("/deals")}
                  className="font-bold underline"
                >
                  Apply in Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Timeline */}
      {activeTab === "Timeline" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chronological Customer Journey</h4>
          <div className="relative pl-6 border-l border-white/10 space-y-6 text-xs">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-950" />
              <div className="font-semibold text-white">Call Recording Completed (04:32)</div>
              <p className="text-slate-400 mt-0.5">Rahul discussed 250 seat expansion and multi-year pricing terms.</p>
              <span className="text-[10px] text-slate-400 font-mono">Today, 11:15 AM</span>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-950" />
              <div className="font-semibold text-white">WhatsApp Interaction (4 Messages)</div>
              <p className="text-slate-400 mt-0.5">Rahul confirmed compliance sign-off on PostgreSQL encryption.</p>
              <span className="text-[10px] text-slate-400 font-mono">Yesterday, 4:20 PM</span>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-950" />
              <div className="font-semibold text-white">SOC-2 Security Pack Downloaded</div>
              <p className="text-slate-400 mt-0.5">Downloaded compliance artifact from customer self-serve portal.</p>
              <span className="text-[10px] text-slate-400 font-mono">01 Oct 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Deals */}
      {activeTab === "Deals" && (
        <div className="space-y-3">
          {mockDeals.filter((d) => d.customerId === customer.id).map((deal) => (
            <div key={deal.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white text-sm">{deal.title}</div>
                <span className="text-slate-400">Stage: {deal.stage} · Close Date: {deal.closeDate}</span>
                <p className="text-cyan-400 text-[11px] mt-1">{deal.aiInsight}</p>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-lg text-emerald-400">{formatINR(deal.amount, true)}</div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">{deal.risk} RISK</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Conversations / Tab 7: WhatsApp */}
      {(activeTab === "Conversations" || activeTab === "WhatsApp") && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Live History
            </h4>
            <Link href="/inbox?channel=whatsapp" className="text-xs text-cyan-400 underline">
              Open in Omnichannel Inbox →
            </Link>
          </div>
          <div className="space-y-2 text-xs">
            {mockConversations[0].messages.map((m) => (
              <div key={m.id} className={cn("p-2.5 rounded-xl max-w-md", m.sender === "rep" ? "ml-auto bg-blue-600/30 border border-blue-500/30" : "bg-white/[0.04] border border-white/5")}>
                <div className="font-semibold text-slate-200 text-[11px]">{m.senderName}</div>
                <p className="text-slate-300 mt-0.5">{m.content}</p>
                <span className="text-[9px] text-slate-400 block text-right mt-1">{m.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Calls */}
      {activeTab === "Calls" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" /> Recorded Voice Telephony
            </h4>
            <Link href="/calls" className="text-xs text-cyan-400 underline">
              Full Call Intelligence →
            </Link>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Rahul Sharma — Discovery Call</div>
              <p className="text-slate-400">Duration: 04:32 · MinIO: call_rahul_abc_101.wav</p>
              <div className="text-emerald-400 text-[11px] mt-1 font-semibold">Sentiment: Positive (Talk 42% / Listen 58%)</div>
            </div>
            <button
              onClick={() => router.push("/calls")}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold"
            >
              Analyze Call
            </button>
          </div>
        </div>
      )}

      {/* Tab 6: Emails */}
      {activeTab === "Emails" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> Email Threading
            </h4>
            <Link href="/inbox?channel=email" className="text-xs text-cyan-400 underline">
              Open Email Composer →
            </Link>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
            <div className="font-semibold text-white">RE: Updated Enterprise Proposal v2</div>
            <p className="text-slate-400">To: rahul@abctech.in · Sent yesterday</p>
            <p className="text-slate-300 pt-1">
              &quot;Dear Rahul, thank you for reviewing our compliance documentation. Attached is the revised schedule with the 12% discount...&quot;
            </p>
          </div>
        </div>
      )}

      {/* Tab 8: Documents */}
      {activeTab === "Documents" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cloud Storage Artifacts (MinIO)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {["ABC_Tech_Enterprise_MSA_Draft.pdf", "PostgreSQL_Encryption_Audit_Signoff.pdf", "WhatsApp_Cloud_API_Service_Terms.pdf"].map((doc) => (
              <div key={doc} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-medium truncate max-w-xs">{doc}</span>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 9: Tasks */}
      {activeTab === "Tasks" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Assigned Follow-up Tasks</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200">Send revised pricing proposal with 12% discount</span>
              </div>
              <span className="text-amber-400 font-mono text-[11px]">Due Today, 4:00 PM</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200">Schedule CFO alignment sync for Thursday</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Due Tomorrow</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 10: AI Insights */}
      {activeTab === "AI Insights" && (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Prescriptive AI Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <strong className="text-emerald-400 block mb-1">High Upsell Potential</strong>
              <p className="text-slate-300">
                Seat utilization has trended at 94% over the last 60 days. Propensity model indicates 82% likelihood to accept 2-year commit bundling Autonomous Agent add-ons.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <strong className="text-amber-400 block mb-1">Competitor Vulnerability</strong>
              <p className="text-slate-300">
                Customer mentioned alternative pricing from legacy Salesforce vendor. Counter with TCO savings analysis and built-in WhatsApp Cloud API advantages.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
