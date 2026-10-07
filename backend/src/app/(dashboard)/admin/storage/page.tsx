"use client";

import React, { useState } from "react";
import { mockStorageMetrics } from "@/data/mockData";
import {
  HardDrive,
  Mic,
  FileText,
  UploadCloud,
  Download,
  ShieldCheck,
  Folder,
} from "lucide-react";

export default function StoragePage() {
  const [metrics] = useState(mockStorageMetrics);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              MinIO Distributed Object Storage
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enterprise S3-compatible storage cluster storing audio call recordings, contract artifacts, and avatars.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Frontend Secrets Exposed · Presigned S3 Tokens</span>
        </div>
      </div>

      {/* Storage Breakdown Metric Cards (Prompt #32) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Allocated Storage
          </span>
          <div className="text-2xl font-mono font-black text-white">1.8 TB</div>
          <span className="text-[10px] text-cyan-400 font-mono">MinIO Distributed Cluster</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Current Used Storage
          </span>
          <div className="text-2xl font-mono font-black text-cyan-300">642 GB</div>
          <span className="text-[10px] text-slate-400">35.6% Utilization</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Call Recordings Bucket
          </span>
          <div className="text-2xl font-mono font-black text-emerald-400">482 GB</div>
          <span className="text-[10px] text-slate-400">14,820 Diarized WAV files</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Attachments Bucket
          </span>
          <div className="text-2xl font-mono font-black text-violet-400">160 GB</div>
          <span className="text-[10px] text-slate-400">4,210 PDF & Contract files</span>
        </div>
      </div>

      {/* Storage Progress Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white">Storage Allocation Distribution</span>
          <span className="font-mono text-slate-400">642 GB of 1.8 TB used</span>
        </div>

        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden flex">
          <div className="bg-emerald-400 h-full" style={{ width: "26.7%" }} title="Call Recordings (482 GB)" />
          <div className="bg-violet-400 h-full" style={{ width: "8.9%" }} title="Attachments (160 GB)" />
        </div>

        <div className="flex items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Call Recordings (482 GB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            <span className="text-slate-300">Attachments (160 GB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="text-slate-400">Free Space (1.15 TB)</span>
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Folder className="w-4 h-4 text-cyan-400" />
          Recent Object Uploads in MinIO
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Filename</th>
                <th className="py-3 px-3">Bucket</th>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Uploaded</th>
                <th className="py-3 px-3">S3 Key Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metrics.recentUploads.map((file) => (
                <tr key={file.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    {file.filename.endsWith(".wav") ? (
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-violet-400" />
                    )}
                    {file.filename}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 font-mono">
                      {file.bucket}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-cyan-300">{file.size}</td>
                  <td className="py-3 px-3 text-slate-400">{file.uploadedAt}</td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[10px]">
                    {file.key}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
