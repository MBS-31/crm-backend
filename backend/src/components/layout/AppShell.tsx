"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CommandPalette from "./CommandPalette";
import CopilotDrawer from "../ai/CopilotDrawer";
import SoftphoneWidget from "../communications/SoftphoneWidget";
import NotificationDrawer from "../notifications/NotificationDrawer";
import { useSidebarStore } from "@/stores";
import { cn } from "@/lib/utils";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        {/* Sticky Top Header */}
        <Header />

        {/* Scrollable Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <CommandPalette />
      <CopilotDrawer />
      <SoftphoneWidget />
      <NotificationDrawer />
    </div>
  );
}
