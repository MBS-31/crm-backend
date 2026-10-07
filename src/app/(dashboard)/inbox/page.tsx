"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCommunicationStore, useUIStore, useCopilotStore } from "@/stores";
import { inboxService } from "@/services/inbox";
import { mockCustomers, mockDeals } from "@/data/mockData";
import { formatINR } from "@/lib/utils";
import {
  Inbox,
  MessageSquare,
  Mail,
  Radio,
  Phone,
  Send,
  Sparkles,
  Paperclip,
  CheckCheck,
  Check,
  User,
  Building2,
  Clock,
  HeartPulse,
  Briefcase,
  Search,
  Bot,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

function InboxContent() {
  const searchParams = useSearchParams();
  const channelParam = (searchParams.get("channel") as any) || "all";

  const {
    conversations,
    selectedConversationId,
    setSelectedConversationId,
    selectedChannel,
    setSelectedChannel,
    addMessageToSelected,
  } = useCommunicationStore();

  const { openSoftphoneWith } = useUIStore();
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const [messageInput, setMessageInput] = useState("");
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "email_composer">("chat");

  // Email form states
  const [emailTo, setEmailTo] = useState("rahul@abctech.in");
  const [emailSubject, setEmailSubject] = useState("RE: LOGIP Enterprise Proposal & WhatsApp API Tier");
  const [emailBody, setEmailBody] = useState("");

  const activeConv =
    conversations.find((c) => c.id === selectedConversationId) || conversations[0];
  const activeCustomer =
    mockCustomers.find((c) => c.id === activeConv?.contactId) || mockCustomers[0];
  const activeDeal = mockDeals.find((d) => d.customerId === activeCustomer?.id);

  const channels: ("all" | "whatsapp" | "email" | "sms" | "calls")[] = [
    "all",
    "whatsapp",
    "email",
    "sms",
    "calls",
  ];

  const filteredConversations = conversations.filter((c) => {
    if (selectedChannel === "all") return true;
    return c.channel === selectedChannel;
  });

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      channel: activeConv.channel,
      sender: "rep" as const,
      senderName: "Rahul Sharma",
      content: messageInput.trim(),
      timestamp: "Just now",
      status: "delivered" as const,
    };

    addMessageToSelected(newMsg);
    setMessageInput("");
  };

  const handleAIDraft = async () => {
    setIsGeneratingDraft(true);
    try {
      const draft = await inboxService.generateAIDraft(
        `Customer ${activeCustomer.name} at ${activeCustomer.company}`
      );
      if (activeSubTab === "email_composer") {
        setEmailBody(draft);
      } else {
        setMessageInput(draft);
      }
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case "whatsapp":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case "email":
        return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case "sms":
        return <Radio className="w-3.5 h-3.5 text-violet-400" />;
      default:
        return <Phone className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 pb-12">
      {/* Page Title & Channel Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Inbox className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Unified Omnichannel Communication Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seamless WhatsApp Cloud API, Email, Voice Telephony, and SMS in a unified workspace.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs overflow-x-auto">
          {channels.map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-bold transition-all capitalize flex items-center gap-1.5 whitespace-nowrap",
                selectedChannel === ch
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {getChannelIcon(ch)}
              <span>{ch}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3-Pane Layout (Prompt #17) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] rounded-2xl overflow-hidden">
        {/* Pane 1: Conversations List (lg:col-span-3) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/5 flex flex-col overflow-hidden bg-[#0a0f1d]/80">
          <div className="p-3 border-b border-white/5">
            <div className="text-xs font-bold text-white flex items-center justify-between mb-2">
              <span>Conversations</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                {filteredConversations.length} Active
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter messages..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={cn(
                    "w-full p-3 rounded-xl text-left transition-all border block",
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-500/30 text-white shadow-md shadow-cyan-950/40"
                      : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs truncate flex items-center gap-1.5">
                      {getChannelIcon(conv.channel)}
                      {conv.contactName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {conv.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">{conv.company}</div>
                  <p className="text-[11px] text-slate-300 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pane 2: Communication / Chat Thread & Email Composer (lg:col-span-6) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-white/5 flex flex-col overflow-hidden bg-[#090d18]">
          {/* Active Contact Header with tab switcher */}
          <div className="p-3.5 border-b border-white/5 flex items-center justify-between bg-[#0b1020]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
                  {activeConv.contactName.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  {activeConv.contactName}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                    {activeConv.channel} Live
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">{activeConv.company}</p>
              </div>
            </div>

            {/* Sub-view toggle (Chat vs Email Composer) */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveSubTab("chat")}
                className={cn(
                  "px-2.5 py-1 rounded font-medium transition-colors",
                  activeSubTab === "chat" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400"
                )}
              >
                Chat Thread
              </button>
              <button
                onClick={() => setActiveSubTab("email_composer")}
                className={cn(
                  "px-2.5 py-1 rounded font-medium transition-colors",
                  activeSubTab === "email_composer" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400"
                )}
              >
                Email Composer
              </button>
            </div>
          </div>

          {/* Sub Tab: Chat Messages Thread */}
          {activeSubTab === "chat" ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConv.messages.map((msg) => {
                  const isRep = msg.sender === "rep";

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[80%]",
                        isRep ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-2xl text-xs leading-relaxed",
                          isRep
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-md shadow-blue-950/40"
                            : "bg-[#131c33] border border-white/10 text-slate-200 rounded-bl-none shadow-lg"
                        )}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>

                        {/* Attachments if any */}
                        {msg.attachments && (
                          <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                            {msg.attachments.map((att) => (
                              <div
                                key={att.name}
                                className="flex items-center gap-2 text-[10px] bg-black/20 p-1.5 rounded"
                              >
                                <Paperclip className="w-3 h-3" />
                                <span className="font-mono">{att.name} ({att.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                        <span>{msg.timestamp}</span>
                        {isRep && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-white/5 bg-[#0a0f1d] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={handleAIDraft}
                    disabled={isGeneratingDraft}
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>{isGeneratingDraft ? "Synthesizing AI draft..." : "✨ Draft with AI"}</span>
                  </button>
                  <span className="text-[10px] text-slate-400">Press Enter to Send</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder={`Reply via ${activeConv.channel.toUpperCase()}...`}
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/40"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Sub Tab: Email Composer (Prompt #18) */
            <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-3 bg-[#0a0f1d]">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white">Enterprise Email Composer</span>
                <button
                  onClick={handleAIDraft}
                  disabled={isGeneratingDraft}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingDraft ? "Generating..." : "✨ Draft with AI"}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">To</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">Message Body</label>
                  <textarea
                    rows={12}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Write email or click ✨ Draft with AI..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white leading-relaxed font-sans focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button className="flex items-center gap-1 text-slate-400 text-xs hover:text-white">
                  <Paperclip className="w-3.5 h-3.5" /> Attach Contract PDF
                </button>
                <button
                  onClick={() => {
                    alert("Email dispatched successfully with tracked analytics.");
                    setActiveSubTab("chat");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Send Tracked Email
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pane 3: Customer Context Panel (lg:col-span-3) (Prompt #17) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-y-auto bg-[#0a0f1d]/80 text-xs">
          <div className="space-y-4">
            {/* Customer Summary Header */}
            <div className="pb-3 border-b border-white/5 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] mx-auto mb-2">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-sm">
                  {activeCustomer.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <h4 className="font-bold text-white text-sm">{activeCustomer.name}</h4>
              <p className="text-slate-400 text-[11px]">{activeCustomer.company}</p>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <button
                  onClick={() =>
                    openSoftphoneWith({
                      name: activeCustomer.name,
                      company: activeCustomer.company,
                      phone: activeCustomer.phone,
                    })
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold"
                >
                  <Phone className="w-3 h-3" /> Call Softphone
                </button>
              </div>
            </div>

            {/* Key Telemetry */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Telemetry & ARR
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual ARR:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {formatINR(activeCustomer.arr, true)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Score:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {activeCustomer.healthScore} / 100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sentiment:</span>
                  <span className="font-bold text-white">{activeCustomer.sentiment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Churn Risk:</span>
                  <span className="font-bold text-emerald-300">{activeCustomer.churnRisk}</span>
                </div>
              </div>
            </div>

            {/* Active Deal */}
            {activeDeal && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Deal
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white">{activeDeal.title}</div>
                  <div className="font-mono font-bold text-emerald-400">
                    {formatINR(activeDeal.amount, true)} ({activeDeal.stage})
                  </div>
                  <span className="text-[10px] text-rose-400 font-semibold block">
                    {activeDeal.risk} Risk Profile
                  </span>
                </div>
              </div>
            )}

            {/* AI Next Best Action */}
            <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <span className="text-cyan-400 font-bold block mb-1 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Next Best Action
              </span>
              <p className="text-slate-300 text-[11px]">
                {activeCustomer.nextBestAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Omnichannel Inbox...</div>}>
      <InboxContent />
    </Suspense>
  );
}
