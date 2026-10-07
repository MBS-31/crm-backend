import React, { useState } from 'react';
import { 
  Inbox, 
  Mail, 
  MessageSquare, 
  PhoneCall, 
  StickyNote, 
  Ticket, 
  Search, 
  Send, 
  Sparkles, 
  CheckCheck, 
  Paperclip, 
  Clock 
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useCrmStore } from '../store/useCrmStore';

export default function UnifiedInboxView() {
  const { setDialerOpen } = useCrmStore();
  const [activeChannelFilter, setActiveChannelFilter] = useState('all');
  const [activeThreadId, setActiveThreadId] = useState('th-1');
  const [replyText, setReplyText] = useState('');

  const threads = [
    {
      id: 'th-1',
      customer: 'Rahul Sharma (CTO)',
      company: 'FinTech Innovations',
      channel: 'whatsapp',
      lastMessage: 'Could you send over the final data migration schedule before our board meeting?',
      time: '10:20 AM',
      unread: true,
      sentiment: 'Positive (+84%)',
      priority: 'HIGH',
      assigned: 'Megan Norton',
    },
    {
      id: 'th-2',
      customer: 'Sarah Jenkins',
      company: 'Stark Logistics',
      channel: 'email',
      lastMessage: 'Awaiting escalation response on SMS latency issues.',
      time: 'Yesterday',
      unread: false,
      sentiment: 'Negative (-45%)',
      priority: 'URGENT',
      assigned: 'Guy Hawkins',
    },
    {
      id: 'th-3',
      customer: 'David Vance',
      company: 'Apex Financial',
      channel: 'voice',
      lastMessage: 'WebRTC call concluded. MinIO recording stored: 08m 42s.',
      time: 'Yesterday',
      unread: false,
      sentiment: 'Very Positive (+92%)',
      priority: 'MEDIUM',
      assigned: 'Megan Norton',
    },
  ];

  const chronologicalTimeline = [
    { time: '09:10 AM', channel: 'email', icon: Mail, label: 'Email Received', content: 'Sent RFP clarification requirements regarding persistent MinIO storage.', color: 'text-purple-600 bg-purple-50' },
    { time: '10:20 AM', channel: 'whatsapp', icon: WhatsAppIcon, isCustom: true, label: 'WhatsApp Cloud API', content: 'Rahul: "Could you send over the final data migration schedule before our board meeting?"', color: 'text-emerald-600 bg-emerald-50' },
    { time: '11:45 AM', channel: 'voice', icon: PhoneCall, label: 'WebRTC Call — 06:32', content: 'Discussed Enterprise 50-seat rollout. Audio recording saved to MinIO S3.', color: 'text-blue-600 bg-blue-50' },
    { time: '01:00 PM', channel: 'note', icon: StickyNote, label: 'Internal Agent Note', content: 'Megan: "Rahul is ready to sign. Needs 10% volume discount approved by Manager."', color: 'text-amber-600 bg-amber-50' },
    { time: '03:30 PM', channel: 'ticket', icon: Ticket, label: 'Support Ticket #T-4091', content: 'Resolved: Webhook callback configuration on WhatsApp Cloud API endpoint.', color: 'text-rose-600 bg-rose-50' },
  ];

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleUseAiReply = (suggestion) => {
    setReplyText(suggestion);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Unified Communication Center
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Omni-Channel Inbox & Synchronized Timeline
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Email, WhatsApp Cloud API, SMS, WebRTC Voice, and Internal Notes in one unified interface
          </p>
        </div>
      </div>

      {/* Two-Pane Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Pane (4 cols): Conversation Threads */}
        <div className="lg:col-span-4 border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            {/* Search within inbox */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-white border border-slate-200 text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Conversation List */}
            <div className="space-y-2">
              {threads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeThread.id === t.id
                      ? 'border-blue-500 bg-white shadow-xs'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{t.customer}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{t.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">{t.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                    <span className="text-blue-600 font-semibold">{t.company}</span>
                    <span className="text-emerald-600 font-bold">{t.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane (8 cols): Chronological Unified Timeline & Active Thread */}
        <div className="lg:col-span-8 border border-slate-200 rounded-2xl p-5 bg-white flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{activeThread.customer}</h4>
                <p className="text-xs text-slate-500">{activeThread.company} • Assigned: {activeThread.assigned}</p>
              </div>
              <button
                onClick={() => setDialerOpen(true)}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </button>
            </div>

            {/* Unified Chronological Timeline Flow (Requirement 6 Example) */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Synchronized Multi-Channel Timeline:
              </span>

              {chronologicalTimeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      {item.isCustom ? <Icon className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Suggested Response Box */}
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Suggested Response (Context-Aware):</span>
              </div>
              <p className="text-xs text-slate-700 italic">
                "Hi Rahul! We have finalized the data migration roadmap with zero downtime guarantee. I am attaching the board review summary. Shall we connect for 5 mins to confirm?"
              </p>
              <button
                onClick={() => handleUseAiReply("Hi Rahul! We have finalized the data migration roadmap with zero downtime guarantee. I am attaching the board review summary. Shall we connect for 5 mins to confirm?")}
                className="text-[11px] font-bold text-blue-700 bg-white hover:bg-blue-100/60 border border-blue-300 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Use this AI Reply
              </button>
            </div>
          </div>

          {/* Quick Dispatch Input */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type omni-channel reply (WhatsApp / Email / SMS)..."
              className="flex-1 bg-slate-50 border border-slate-200 text-xs p-2.5 px-3 rounded-xl focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => {
                alert(`Dispatched to ${activeThread.customer}`);
                setReplyText('');
              }}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
