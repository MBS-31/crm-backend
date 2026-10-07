"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  Grid,
  Volume2,
  X,
  FileText,
  Activity,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SoftphoneWidget() {
  const { isSoftphoneOpen, setIsSoftphoneOpen, softphoneContact } = useUIStore();
  const [callState, setCallState] = useState<"idle" | "calling" | "connected" | "ended">("connected");
  const [seconds, setSeconds] = useState(272); // 04:32 initial demonstration
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadInput, setKeypadInput] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const router = useRouter();

  const contact = softphoneContact || {
    name: "Rahul Sharma",
    company: "ABC Technologies",
    phone: "+91 98201 44521",
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === "connected" && !isOnHold) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState, isOnHold]);

  if (!isSoftphoneOpen) return null;

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleHangup = () => {
    setCallState("ended");
  };

  const handleStartCall = () => {
    setSeconds(0);
    setCallState("connected");
  };

  const handleKeypadPress = (val: string) => {
    setKeypadInput((prev) => prev + val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-88 rounded-2xl bg-[#0e1628] border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 overflow-hidden text-slate-200 animate-in slide-in-from-bottom-5">
      {/* Top Header bar */}
      <div className="px-4 py-3 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
            WebRTC Telephony
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
              SIP / LIVE
            </span>
          </span>
        </div>
        <button
          onClick={() => setIsSoftphoneOpen(false)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Calling Card */}
      <div className="p-5 flex flex-col items-center text-center">
        {/* Contact Info */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] mb-3 shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-lg font-bold text-white">
            {contact.name.split(" ").map((n) => n[0]).join("")}
          </div>
        </div>

        <h3 className="font-bold text-base text-white">{contact.name}</h3>
        <p className="text-xs text-slate-400">{contact.company}</p>
        <p className="text-[11px] font-mono text-cyan-400 mt-0.5">{contact.phone}</p>

        {callState === "connected" && (
          <>
            {/* Live Timer */}
            <div className="my-4 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              <span className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
                {formatTimer(seconds)}
              </span>
            </div>

            {/* Live Sentiment Pill */}
            <div className="flex items-center gap-2 mb-4 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Activity className="w-3 h-3" /> Live Sentiment: Positive (88%)
              </span>
            </div>

            {/* In-Call Action Buttons */}
            <div className="flex items-center justify-center gap-3 w-full my-1">
              {/* Mute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={cn(
                  "p-3 rounded-full border transition-all",
                  isMuted
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                )}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Hold */}
              <button
                onClick={() => setIsOnHold(!isOnHold)}
                className={cn(
                  "p-3 rounded-full border transition-all",
                  isOnHold
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                )}
                title={isOnHold ? "Resume Call" : "Hold Call"}
              >
                <Pause className="w-4 h-4" />
              </button>

              {/* Keypad */}
              <button
                onClick={() => setShowKeypad(!showKeypad)}
                className={cn(
                  "p-3 rounded-full border transition-all",
                  showKeypad
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                )}
                title="Dial Keypad"
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* Hangup button */}
              <button
                onClick={handleHangup}
                className="p-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
                title="End Call"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>

            {/* Keypad Drawer if opened */}
            {showKeypad && (
              <div className="mt-3 w-full p-2 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="font-mono text-center text-xs text-white mb-2 h-4">
                  {keypadInput || "Touchtones"}
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleKeypadPress(btn)}
                      className="py-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Call Completed Summary Card */}
        {callState === "ended" && (
          <div className="w-full text-left bg-[#11192e] p-3.5 rounded-xl border border-white/10 mt-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Call Completed
              </span>
              <span className="text-xs font-mono text-slate-400">
                Duration: {formatTimer(seconds)}
              </span>
            </div>

            {/* Audio Recording Player */}
            <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="p-1.5 rounded-full bg-cyan-500 text-black hover:bg-cyan-400"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <div className="text-[11px]">
                  <div className="font-medium text-slate-200">Call Recording</div>
                  <div className="text-[9px] text-slate-400 font-mono">MinIO: call_rahul_abc_101.wav</div>
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-slate-400" />
            </div>

            {/* Intelligence metrics */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 block text-[10px]">Sentiment</span>
                <span className="font-bold text-emerald-400">Positive</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 block text-[10px]">Talk / Listen</span>
                <span className="font-bold text-cyan-300">42% / 58%</span>
              </div>
            </div>

            {/* Buttons: Call Analysis & Redial */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  router.push("/calls");
                  setIsSoftphoneOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                View Full Analysis
              </button>
              <button
                onClick={handleStartCall}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
                title="Redial"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
