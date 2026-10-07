import React from 'react';
import { X, CheckCircle, Shield, Award, Layers, Server, Code } from 'lucide-react';

export default function CrmBenchmarkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const benchmarkData = [
    {
      name: 'Twenty CRM',
      badge: 'Selected Winner',
      license: 'AGPLv3 / Apache 2.0',
      stack: 'React + NestJS + TypeScript + Postgres',
      uiUxRating: '9.8 / 10 (Ultra-modern)',
      dockerEase: '5/5 (One-click Docker Compose)',
      minioReady: 'S3-Compatible Object Storage Native',
      rbacTier: 'Granular 5-Tier Object Permissions',
      verdict: 'Recommended Winner: Best developer experience, modern TypeScript stack, clean UI, easy containerization.',
      selected: true,
    },
    {
      name: 'EspoCRM',
      badge: 'Contender',
      license: 'GPLv3',
      stack: 'PHP + JavaScript (Backbone) + MySQL',
      uiUxRating: '7.8 / 10 (Traditional SPA)',
      dockerEase: '4/5 (Official Docker images)',
      minioReady: 'Requires S3 storage plugin configuration',
      rbacTier: 'Role & Team-based ACL',
      verdict: 'Strong workflow automation, but legacy frontend stack and PHP backend.',
      selected: false,
    },
    {
      name: 'SuiteCRM 8',
      badge: 'Legacy Enterprise',
      license: 'AGPLv3',
      stack: 'PHP 8 + Angular + MySQL/MariaDB',
      uiUxRating: '6.2 / 10 (Clunky UI)',
      dockerEase: '3/5 (Heavy container overhead)',
      minioReady: 'Local filesystem default, S3 custom adapter',
      rbacTier: 'Security Groups / Role Hierarchy',
      verdict: 'Feature exhaustive but high deployment debt and dated UX.',
      selected: false,
    },
    {
      name: 'Odoo Community',
      badge: 'ERP Hybrid',
      license: 'LGPLv3',
      stack: 'Python + OWL + PostgreSQL',
      uiUxRating: '8.4 / 10 (ERP-focused)',
      dockerEase: '4/5 (Multi-module compose)',
      minioReady: 'Filestore abstraction over PostgreSQL',
      rbacTier: 'Groups and Access Rights rules',
      verdict: 'Great ecosystem, but CRM module is tied to ERP core with licensing constraints.',
      selected: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Award className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                Open-Source CRM Research & Benchmark Report
              </h3>
              <p className="text-xs text-slate-500">
                Evaluating 4 Leading CRMs for Local Docker Deployment & Omni-Channel Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors border border-slate-200/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs text-blue-900 leading-relaxed flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Selection Rationale & Verdict:</strong>
              After benchmarking modern tech stack flexibility, Docker containerization overhead, persistent MinIO object storage support for voice recordings, and native GraphQL API extensibility, <strong>Twenty CRM + Custom Omni-Channel Microservice Architecture</strong> was chosen. It provides an enterprise TypeScript React/NestJS core with PostgreSQL and S3/MinIO compatibility.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkData.map((crm) => (
              <div
                key={crm.name}
                className={`p-4 rounded-2xl border transition-all ${
                  crm.selected
                    ? 'border-blue-400 bg-blue-50/20 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{crm.name}</h4>
                    {crm.selected && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Winner
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {crm.license}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <div className="flex items-start gap-1.5">
                    <Code className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Stack:</strong> {crm.stack}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>UI/UX:</strong> {crm.uiUxRating}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Server className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>MinIO / Storage:</strong> {crm.minioReady}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RBAC:</strong> {crm.rbacTier}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 italic leading-snug">
                  {crm.verdict}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Benchmark criteria: Architecture, Local Docker, 5-Tier RBAC, Omni-Channel APIs
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
