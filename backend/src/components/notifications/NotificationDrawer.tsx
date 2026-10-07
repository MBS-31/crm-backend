"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores";
import {
  Bell,
  X,
  CheckCheck,
  Flame,
  AlertTriangle,
  HeartPulse,
  MessageSquare,
  PhoneCall,
  Bot,
  GitBranch,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationDrawer() {
  const { notifications, isOpen, setIsOpen, markAsRead, markAllAsRead } =
    useNotificationStore();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const router = useRouter();

  if (!isOpen) return null;

  const filtered = notifications.filter((n) =>
    filter === "unread" ? !n.read : true
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "new_lead":
        return <Flame className="w-4 h-4 text-amber-400" />;
      case "deal_risk":
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case "churn_alert":
        return <HeartPulse className="w-4 h-4 text-rose-500" />;
      case "whatsapp_message":
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case "call_completed":
        return <PhoneCall className="w-4 h-4 text-blue-400" />;
      case "agent_completed":
        return <Bot className="w-4 h-4 text-violet-400" />;
      case "workflow_failed":
        return <GitBranch className="w-4 h-4 text-rose-400" />;
      default:
        return <Clock className="w-4 h-4 text-cyan-400" />;
    }
  };

  const handleNotificationClick = (item: (typeof notifications)[0]) => {
    markAsRead(item.id);
    if (item.actionUrl) {
      router.push(item.actionUrl);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-[#0a0f1d] border-l border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-[#080d1a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <p className="text-[11px] text-slate-400">
                  {notifications.filter((n) => !n.read).length} unread alerts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 p-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex gap-2 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-2.5 py-1 rounded-md font-medium transition-colors",
                filter === "all"
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              )}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "px-2.5 py-1 rounded-md font-medium transition-colors",
                filter === "unread"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={cn(
                  "p-3 rounded-xl border text-xs cursor-pointer transition-all hover:border-cyan-500/30 group",
                  item.read
                    ? "bg-[#0c1222]/50 border-white/5 text-slate-400"
                    : "bg-[#11192e] border-white/10 text-slate-200 shadow-md"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-1 leading-snug">
                      {item.description}
                    </p>
                    {item.actionUrl && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-medium mt-2">
                        View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                No notifications to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
