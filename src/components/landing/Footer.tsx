"use client";

import React from "react";
import Link from "./CustomLink";
import {
  Cpu,
  FileText,
  Mail,
  Heart
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="bg-[#04060C] text-slate-400 border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 p-0.5">
                <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                Open<span className="text-blue-400">CRM</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              Self-hosted enterprise CRM platform with native omnichannel communications, granular 5-tier RBAC, and S3 audio recordings.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/[0.06]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/[0.06]"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/[0.06]"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">CRM Pipelines</a></li>
              <li><a href="#omnichannel" className="hover:text-white transition-colors">Communications</a></li>
              <li><a href="#rbac" className="hover:text-white transition-colors">5-Tier RBAC</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Developers column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Developers
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE#readme" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE/blob/main/BACKEND_README.md" className="hover:text-white transition-colors">API Specs</a></li>
              <li><a href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE" className="hover:text-white transition-colors">GitHub Repo</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Docker Stack</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
            </ul>
          </div>

          {/* Integrations column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Integrations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#omnichannel" className="hover:text-white transition-colors">SMTP / IMAP</a></li>
              <li><a href="#omnichannel" className="hover:text-white transition-colors">Voice WebRTC</a></li>
              <li><a href="#omnichannel" className="hover:text-white transition-colors">WhatsApp Cloud API</a></li>
              <li><a href="#omnichannel" className="hover:text-white transition-colors">Twilio / SMS</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">MinIO S3 Storage</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 OpenCRM. Open-source self-hosted CRM. Released under the MIT License.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security Disclosures</a>
            <a href="https://github.com/code-with-dipak-777/CRM-ROBLEM-SOLVE" className="hover:text-slate-400 transition-colors">GitHub Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
