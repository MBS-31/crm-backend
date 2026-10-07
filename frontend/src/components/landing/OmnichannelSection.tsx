"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  ExternalLink
} from "lucide-react";
import { useLandingStore, ChannelType } from "@/store/useLandingStore";

export default function OmnichannelSection() {
  const { activeChannel, setActiveChannel } = useLandingStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  const channels: { id: ChannelType; name: string; icon: any; color: string; desc: string; protocol: string }[] = [
    {
      id: "EMAIL",
      name: "Corporate Email",
      icon: Mail,
      color: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
      desc: "Bidirectional sync via native SMTP/IMAP with automatic thread association to contacts and deals.",
      protocol: "SMTP • IMAP • OAuth2",
    },
    {
      id: "VOICE",
      name: "Voice & WebRTC",
      icon: Phone,
      color: "from-violet-500/20 to-purple-600/10 text-violet-400 border-violet-500/30",
      desc: "Browser-based SIP softphone with automatic MinIO .wav audio recording and speech analytics.",
      protocol: "WebRTC • SIP • MinIO S3",
    },
    {
      id: "WHATSAPP",
      name: "WhatsApp Cloud API",
      icon: MessageSquare,
      color: "from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30",
      desc: "Direct integration with Meta Graph API for official business messaging and template delivery.",
      protocol: "Meta Graph v21.0 • Webhooks",
    },
    {
      id: "SMS",
      name: "SMS Gateway",
      icon: Smartphone,
      color: "from-amber-500/20 to-orange-600/10 text-amber-400 border-amber-500/30",
      desc: "Configurable SMS provider (Twilio, MessageBird, or custom SMPP) for alerts and 2FA authentication.",
      protocol: "Twilio API • Custom SMPP",
    },
  ];

  return (
    <section id="omnichannel" className="py-24 md:py-32 relative bg-[#060812] border-t border-white/[0.06] overflow-hidden">
      {/* Glow lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-emerald-600/10 to-violet-600/15 rounded-full glow-orb -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-3">
            Unified Comms
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            One customer. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-indigo-400">
              Every conversation.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Connect Email, Voice, WhatsApp and SMS directly to the customer timeline without switching browser tabs or managing separate third-party subscriptions.
          </p>

          {/* Interactive Channel Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(["ALL", "EMAIL", "VOICE", "WHATSAPP", "SMS"] as ChannelType[]).map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeChannel === ch
                    ? "bg-white text-slate-900 shadow-md scale-105"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                {ch === "ALL" ? "All Channels" : ch}
              </button>
            ))}
          </div>
        </div>

        {/* Central Customer Hub with Flowing Surrounding Nodes */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent border border-white/[0.08] p-6 sm:p-10 mb-16 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 2 Timeline Feed Items */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Email item */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 transition-all ${
                  activeChannel !== "ALL" && activeChannel !== "EMAIL" ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> EMAIL
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">10:45 AM</span>
                </div>
                <div className="text-sm font-semibold text-white">Quotation sent</div>
                <p className="text-xs text-slate-300 mt-1">Enterprise license & SLA proposal attached</p>
                <div className="mt-2 text-[10px] text-blue-300 flex items-center gap-1 font-mono">
                  <span>Delivered via SMTP Gateway</span>
                </div>
              </motion.div>

              {/* WhatsApp item */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 transition-all ${
                  activeChannel !== "ALL" && activeChannel !== "WHATSAPP" ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> WHATSAPP
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">11:12 AM</span>
                </div>
                <div className="text-sm font-semibold text-white">Customer replied</div>
                <p className="text-xs text-emerald-200/90 mt-1 italic">"We reviewed the pricing and ready for agreement!"</p>
                <div className="mt-2 text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                  <span>Verified Meta Cloud API</span>
                </div>
              </motion.div>
            </div>

            {/* Central Customer Profile Card (Rahul Sharma) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-black p-6 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-950/80 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"></div>

                {/* Avatar */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 mx-auto mb-4 shadow-xl">
                  <div className="w-full h-full rounded-[14px] bg-[#070913] flex items-center justify-center font-bold text-2xl text-white">
                    RS
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Enterprise Lead
                </div>

                <h4 className="text-xl font-bold text-white">Rahul Sharma</h4>
                <p className="text-xs font-medium text-indigo-300 flex items-center justify-center gap-1 mt-0.5">
                  <Building className="w-3 h-3" /> Acme Industries • VP Tech
                </p>

                <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10 text-left">
                  <div className="p-2 rounded-lg bg-white/[0.03]">
                    <div className="text-[10px] text-slate-400">Deal Value</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">$120,000</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.03]">
                    <div className="text-[10px] text-slate-400">Health Score</div>
                    <div className="text-sm font-bold text-blue-400 font-mono">94 / 100</div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-[11px] text-indigo-200 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Next Action: Send Final MSA Contract</span>
                </div>
              </div>
            </div>

            {/* Right 2 Timeline Feed Items */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Phone item with waveform */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 transition-all ${
                  activeChannel !== "ALL" && activeChannel !== "VOICE" ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> VOICE (SIP)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">01:30 PM</span>
                </div>
                <div className="text-sm font-semibold text-white">Outgoing call • 04:32</div>
                <p className="text-xs text-slate-300 mt-1">Discovery call recorded and transcribed</p>

                {/* Waveform preview */}
                <div className="mt-3 bg-black/50 p-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </button>
                  <span className="text-[9px] font-mono text-slate-400">02:14 / 04:32</span>
                  <div className="flex items-center gap-0.5 h-3">
                    {[30, 80, 50, 100, 70, 90, 40, 60, 85, 45, 95, 30].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full ${i < 6 ? "bg-violet-400" : "bg-white/20"}`}
                        style={{ height: `${h}%` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* SMS item */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 transition-all ${
                  activeChannel !== "ALL" && activeChannel !== "SMS" ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> SMS GATEWAY
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">03:15 PM</span>
                </div>
                <div className="text-sm font-semibold text-white">Follow-up reminder</div>
                <p className="text-xs text-slate-300 mt-1">Calendar link sent for technical architecture review</p>
                <div className="mt-2 text-[10px] text-amber-300 flex items-center gap-1 font-mono">
                  <span>Carrier Status: Delivered</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Integration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((ch) => (
            <div
              key={ch.id}
              className={`p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between ${
                activeChannel === ch.id ? "ring-1 ring-white/30 bg-white/[0.04]" : ""
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                  <ch.icon className={`w-5 h-5 ${ch.color.split(" ")[2]}`} />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{ch.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ch.desc}</p>
              </div>
              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{ch.protocol}</span>
                <span className="text-emerald-400 font-sans font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
