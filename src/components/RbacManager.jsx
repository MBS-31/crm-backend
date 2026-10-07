import React, { useState } from 'react';
import { 
  Shield, 
  Check, 
  X, 
  Lock, 
  Users, 
  Key, 
  UserCheck, 
  PhoneCall, 
  HardDrive 
} from 'lucide-react';

export const TIERS = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    tier: 'Tier 1',
    description: 'Root access to Docker orchestration, PostgreSQL, MinIO storage buckets, and security audits.',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeColor: 'bg-rose-600 text-white',
  },
  {
    id: 'admin',
    name: 'Admin',
    tier: 'Tier 2',
    description: 'System administration, user provision, WhatsApp Cloud API & SMTP/IMAP credentials, pipeline stages.',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeColor: 'bg-purple-600 text-white',
  },
  {
    id: 'manager',
    name: 'Manager',
    tier: 'Tier 3',
    description: 'Team performance oversight, deal approvals, MinIO call recording audits, revenue forecasting.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeColor: 'bg-blue-600 text-white',
  },
  {
    id: 'sales_exec',
    name: 'Sales Executive',
    tier: 'Tier 4',
    description: 'Assigned deals & leads, WebRTC dialer, WhatsApp customer messaging, email communication.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'support_user',
    name: 'Support / User',
    tier: 'Tier 5',
    description: 'Customer timeline view, ticket resolution, incoming chat response, read-only contact details.',
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    badgeColor: 'bg-slate-600 text-white',
  },
];

export const PERMISSIONS_MATRIX = [
  { module: 'Docker Compose & Server Ops', super_admin: true, admin: false, manager: false, sales_exec: false, support_user: false },
  { module: 'MinIO Storage Bucket Configuration', super_admin: true, admin: true, manager: false, sales_exec: false, support_user: false },
  { module: 'PostgreSQL Database Migrations & Seed', super_admin: true, admin: false, manager: false, sales_exec: false, support_user: false },
  { module: 'WhatsApp Cloud API & Gateway Keys', super_admin: true, admin: true, manager: false, sales_exec: false, support_user: false },
  { module: '5-Tier User & Role Management', super_admin: true, admin: true, manager: false, sales_exec: false, support_user: false },
  { module: 'Deals & Revenue Pipeline Full Access', super_admin: true, admin: true, manager: true, sales_exec: 'Assigned Only', support_user: 'Read Only' },
  { module: 'WebRTC Live Calling & Softphone', super_admin: true, admin: true, manager: true, sales_exec: true, support_user: 'Inbound Only' },
  { module: 'MinIO Call Audio Recording Playback', super_admin: true, admin: true, manager: true, sales_exec: 'Own Calls Only', support_user: false },
  { module: 'MinIO Call Audio Download (.wav)', super_admin: true, admin: true, manager: true, sales_exec: false, support_user: false },
  { module: 'WhatsApp Business Messaging', super_admin: true, admin: true, manager: true, sales_exec: true, support_user: true },
  { module: 'Export Sensitive CRM Data (CSV/PDF)', super_admin: true, admin: true, manager: true, sales_exec: false, support_user: false },
];

export default function RbacManager({ currentRole, onRoleChange }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              5-Tier Role-Based Access Control (RBAC)
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active Role: {TIERS.find(t => t.id === currentRole)?.name}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Configurable tier hierarchy with strict enforcement across channels, storage, and customer data
            </p>
          </div>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onRoleChange(tier.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                currentRole === tier.id
                  ? `${tier.badgeColor} shadow-sm ring-2 ring-purple-400/30`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tier Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            onClick={() => onRoleChange(tier.id)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              currentRole === tier.id
                ? `${tier.color} ring-2 ring-purple-400/40 shadow-xs`
                : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {tier.tier}
              </span>
              {currentRole === tier.id && (
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              )}
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
              {tier.name}
            </h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              {tier.description}
            </p>
          </div>
        ))}
      </div>

      {/* Granular Permissions Matrix */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Granular Module Permissions Matrix</span>
          <span className="text-slate-400 font-normal normal-case">
            Enforced at API Gateway & Frontend Route Handlers
          </span>
        </h4>

        <div className="border border-slate-200/90 rounded-2xl overflow-hidden overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-4">System Module & Capability</th>
                <th className="py-2.5 px-3 text-center">Super Admin</th>
                <th className="py-2.5 px-3 text-center">Admin</th>
                <th className="py-2.5 px-3 text-center">Manager</th>
                <th className="py-2.5 px-3 text-center">Sales Exec</th>
                <th className="py-2.5 px-3 text-center">Support/User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {PERMISSIONS_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-4 font-medium text-slate-900">
                    {row.module}
                  </td>
                  {['super_admin', 'admin', 'manager', 'sales_exec', 'support_user'].map((roleKey) => {
                    const val = row[roleKey];
                    const isCurrent = currentRole === roleKey;
                    return (
                      <td
                        key={roleKey}
                        className={`py-2 px-3 text-center font-medium ${
                          isCurrent ? 'bg-purple-50/50 font-bold' : ''
                        }`}
                      >
                        {val === true ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        ) : val === false ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                            <X className="w-3 h-3 stroke-[2]" />
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
