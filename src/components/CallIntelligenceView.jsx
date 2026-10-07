import React, { useState } from 'react';
import { 
  PhoneCall, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  CheckSquare, 
  Volume2, 
  Mic, 
  BarChart2, 
  Clock, 
  CheckCircle2, 
  Tag 
} from 'lucide-react';
import { MinioIcon } from './Icons';
import { useCrmStore } from '../store/useCrmStore';

export default function CallIntelligenceView() {
  const { setDialerOpen } = useCrmStore();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            AI Voice & Call Intelligence Suite
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Automated Audio Transcription & NLP
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            WebRTC SIP recordings persisted to MinIO S3 object storage with automated conversation telemetry
          </p>
        </div>

        <button
          onClick={() => setDialerOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Launch WebRTC Dialer</span>
        </button>
      </div>

      {/* Featured Call Dossier */}
      <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Latest Enterprise Call
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">
              Outbound Negotiation Call with Rahul Sharma (FinTech Innovations)
            </h4>
            <p className="text-xs text-slate-500">
              Agent: <strong>Megan Norton</strong> • Oct 07, 2026 at 11:24 AM
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700">
              Duration: <strong>08m 42s</strong>
            </span>
            <span className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-700 font-bold">
              Quality: 96/100
            </span>
          </div>
        </div>

        {/* Audio Player & MinIO Persistence Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Full Call Audio Recording (.wav)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {isPlaying ? '02:18' : '00:00'} / 08:42 • 128 kbps Opus WebRTC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <MinioIcon className="w-4 h-4" />
            <span className="truncate max-w-[200px]">minio://crm-recordings/call_rahul_oct07.wav</span>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Vital Conversational NLP Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Talk / Listen Ratio</span>
            <strong className="text-xs text-slate-900 block mt-0.5">Rep 42% / Client 58%</strong>
            <span className="text-[10px] text-emerald-600 font-semibold">Optimal</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Silence Detection</span>
            <strong className="text-xs text-slate-900 block mt-0.5">0.8s Average</strong>
            <span className="text-[10px] text-emerald-600 font-semibold">Fast Pace</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Buying Intent</span>
            <strong className="text-xs text-emerald-600 block mt-0.5">HIGH (89%)</strong>
            <span className="text-[10px] text-slate-500 font-semibold">Pricing Questions</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sentiment Score</span>
            <strong className="text-xs text-emerald-600 block mt-0.5">+84% Positive</strong>
            <span className="text-[10px] text-slate-500 font-semibold">Enthusiastic</span>
          </div>
        </div>

        {/* AI Summary & Action Items Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Automated Conversation Summary
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customer confirmed internal budget signoff for Enterprise 50-seat rollout. Requested SOC2 compliance documentation and clarification on WhatsApp Cloud API webhook latency. No core objections to pricing structure.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              AI Extracted Action Items
            </span>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Send final quotation with 10% volume discount addendum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Attach MinIO Docker deployment architecture whitepaper</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Schedule follow-up confirmation call for tomorrow 11 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extracted Keywords */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200 text-xs">
          <span className="text-slate-500 font-semibold mr-1">NLP Extracted Keywords:</span>
          {['MinIO S3', 'PostgreSQL 16', 'WhatsApp Cloud API', '5-Tier RBAC', 'Docker Compose', 'Enterprise License'].map((kw, i) => (
            <span key={i} className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-mono">
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
