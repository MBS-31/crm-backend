import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Disc, 
  User, 
  CheckCircle,
  Delete
} from 'lucide-react';
import { MinioIcon } from './Icons';

export default function WebRtcDialerModal({ isOpen, onClose, defaultNumber = '+1 555-0192', defaultName = 'Margaret Evans' }) {
  const [phoneNumber, setPhoneNumber] = useState(defaultNumber);
  const [callState, setCallState] = useState('idle'); // idle | ringing | connected | ended
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [savedRecordingUri, setSavedRecordingUri] = useState('');

  useEffect(() => {
    let timer;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const handleStartCall = () => {
    setCallState('ringing');
    setTimeout(() => {
      setCallState('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallState('ended');
    const uri = `minio://crm-recordings/2026/05/call_${Date.now()}.wav`;
    setSavedRecordingUri(uri);
    setTimeout(() => {
      setCallState('idle');
    }, 3000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100 overflow-hidden flex flex-col">
        {/* Dialer Top Header */}
        <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 font-mono">
              WebRTC SIP Gateway (SIP.js v0.21)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Call Display Screen */}
        <div className="p-6 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <User className="w-8 h-8" />
          </div>

          <h3 className="font-bold text-base text-slate-900">
            {defaultName}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {phoneNumber}
          </p>

          <div className="mt-3">
            {callState === 'idle' && (
              <span className="text-xs text-slate-400 font-medium">
                Ready to place outbound call
              </span>
            )}
            {callState === 'ringing' && (
              <span className="text-xs text-amber-600 font-semibold animate-pulse">
                Ringing... Connecting via WebRTC ICE Server
              </span>
            )}
            {callState === 'connected' && (
              <div className="space-y-1">
                <span className="text-sm font-bold text-emerald-600 font-mono">
                  {formatTime(callDuration)}
                </span>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-rose-600 font-semibold">
                  <Disc className="w-3 h-3 animate-spin" />
                  <span>Recording to MinIO (Encrypted AES-256)</span>
                </div>
              </div>
            )}
            {callState === 'ended' && (
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Call Ended & Auto-Persisted</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-mono truncate">
                  {savedRecordingUri}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Keypad & Input (when idle) */}
        {callState === 'idle' && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => setPhoneNumber((prev) => prev + digit)}
                  className="h-11 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-base transition-colors shadow-2xs active:scale-95 cursor-pointer"
                >
                  {digit}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setPhoneNumber('')}
                className="p-3 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Clear number"
              >
                <Delete className="w-5 h-5" />
              </button>

              <button
                onClick={handleStartCall}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Customer</span>
              </button>
            </div>
          </div>
        )}

        {/* In-Call Controls */}
        {callState === 'connected' && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isMuted ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Hang up"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                title="Speaker"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <div className="flex items-center gap-1.5">
                <MinioIcon className="w-3.5 h-3.5" />
                <span>Storage: MinIO S3 Active</span>
              </div>
              <span className="text-emerald-600 font-bold">128 kbps Opus</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
