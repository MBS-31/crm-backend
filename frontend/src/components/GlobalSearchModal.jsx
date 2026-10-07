import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  User, 
  Flame, 
  DollarSign, 
  PhoneCall, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Command 
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import { MinioIcon } from './Icons';

export default function GlobalSearchModal() {
  const { isSearchOpen, setSearchOpen, setActiveCustomer, setActiveLead, setDialerOpen } = useCrmStore();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const mockSearchResults = [
    {
      category: 'Customers & Contacts',
      items: [
        { id: 'c1', title: 'Rahul Sharma', subtitle: 'CTO, FinTech Innovations • Deal: ₹32.5L', icon: User, type: 'customer', targetId: 'cust-1' },
        { id: 'c2', title: 'Sarah Jenkins', subtitle: 'Stark Logistics • At-Risk Deal: $64k', icon: User, type: 'customer', targetId: 'cust-2' },
      ],
    },
    {
      category: 'AI Semantic Match: "customers who complained about pricing"',
      items: [
        { id: 's1', title: 'Elena Rostova (Baltic Pharma)', subtitle: 'Matched via Call Transcript: "Discussed MinIO encryption vs cloud pricing tier"', icon: Sparkles, type: 'lead', targetId: 'lead-2' },
        { id: 's2', title: 'Margaret Evans Negotiation Call', subtitle: 'Transcript snippet: "Requested 10% volume discount on annual renewal"', icon: PhoneCall, type: 'call' },
      ],
    },
    {
      category: 'MinIO Call Audio Recordings',
      items: [
        { id: 'm1', title: 'call_evans_1124.wav', subtitle: 'minio://crm-recordings/2026/05/ • 3.8 MB • Sentiment: Positive', icon: MinioIcon, isCustomIcon: true, type: 'audio' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers, deals, MinIO recordings, or semantic queries (e.g. 'complained about pricing')..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">
            <span>ESC</span>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 overflow-y-auto space-y-4">
          {mockSearchResults.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {group.category}
              </span>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchOpen(false);
                        if (item.type === 'customer') setActiveCustomer(item.targetId);
                        else if (item.type === 'lead') setActiveLead(item.targetId);
                        else if (item.type === 'call') setDialerOpen(true);
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                          {item.isCustomIcon ? <Icon className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                        </div>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-700 transition-colors flex-shrink-0 ml-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3 text-slate-400" />
            <span>Tip: Type natural language sentences to query voice transcripts and emails</span>
          </span>
          <span className="font-mono text-[10px]">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
