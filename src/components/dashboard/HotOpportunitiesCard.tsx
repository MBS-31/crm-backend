"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { mockDeals } from "@/data/mockData";
import { useUIStore, useCopilotStore } from "@/stores";
import { formatINR } from "@/lib/utils";

export default function HotOpportunitiesCard() {
  const router = useRouter();
  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const hotDeals = mockDeals.slice(0, 3);

  const aiActions = [
    {
      id: "act_1",
      title: "Follow up with ABC Ltd today",
      reason: "Deal probability increased 18% following WhatsApp compliance confirmation.",
      type: "opportunity",
      targetUrl: "/deals",
      actionText: "Open Deal",
    },
    {
      id: "act_2",
      title: "Send revised proposal to Rahul Sharma",
      reason: "Customer requested 12% 2-year discount terms on 250 enterprise seats.",
      type: "urgent",
      targetUrl: "/inbox?channel=email",
      actionText: "Draft AI Email",
    },
    {
      id: "act_3",
      title: "Executive alignment for West Corp",
      reason: "Health score dropped to 42. Uncontacted for 8 days. Competitor discount offered.",
      type: "risk",
      targetUrl: "/customers/cust_rohit",
      actionText: "Customer 360",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Column 1: Hot Opportunities */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hot Opportunities</h4>
              <p className="text-[11px] text-slate-400">High velocity enterprise contracts</p>
            </div>
          </div>
          <Link
            href="/deals"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Pipeline <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2.5 my-3">
          {hotDeals.map((deal) => (
            <div
              key={deal.id}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <div className="font-semibold text-slate-100 truncate flex items-center gap-2">
                  <span>{deal.title}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      deal.risk === "HIGH"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {deal.risk} RISK
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {deal.company} · {deal.customerName}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-cyan-300 text-sm">
                  {formatINR(deal.amount, true)}
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <button
                    onClick={() =>
                      openSoftphoneWith({
                        name: deal.customerName,
                        company: deal.company,
                        phone: "+91 98201 44521",
                      })
                    }
                    className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => router.push("/inbox?channel=whatsapp")}
                    className="p-1 rounded bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: AI Recommended Actions */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI Recommended Actions</h4>
              <p className="text-[11px] text-slate-400">Prescriptive sales intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setCopilotOpen(true)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Ask Copilot <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5 my-3">
          {aiActions.map((action) => (
            <div
              key={action.id}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  <span className="text-cyan-400">✨</span>
                  <span className="truncate">{action.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {action.reason}
                </p>
              </div>

              <Link
                href={action.targetUrl}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors"
              >
                {action.actionText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
