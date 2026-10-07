"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Video,
  Phone,
  Users,
  Sparkles,
  Clock,
  Plus,
  MapPin,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopilotStore } from "@/stores";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type EventType = "video" | "call" | "review" | "risk";

interface CalEvent {
  id: string;
  title: string;
  time: string;
  with: string;
  type: EventType;
  day: number;
}

const EVENT_COLORS: Record<EventType, string> = {
  video: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  call: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  review: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  risk: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const EVENT_ICONS: Record<EventType, React.ElementType> = {
  video: Video,
  call: Phone,
  review: Users,
  risk: Bell,
};

const calendarEvents: CalEvent[] = [
  { id: "e1", title: "Discovery & Softphone Sync", time: "11:00 AM", with: "Rahul Sharma", type: "video", day: 7 },
  { id: "e2", title: "Enterprise Pricing Review", time: "02:00 PM", with: "Priya Singh", type: "review", day: 7 },
  { id: "e3", title: "Quarterly Health Alignment", time: "04:30 PM", with: "Rohit Kumar", type: "risk", day: 7 },
  { id: "e4", title: "CFO Alignment Call", time: "03:00 PM", with: "Rahul Sharma", type: "call", day: 9 },
  { id: "e5", title: "BFSI Sector Demo", time: "10:00 AM", with: "ICICI Fintech", type: "video", day: 11 },
  { id: "e6", title: "West Corp Renewal Review", time: "11:30 AM", with: "Rohit Kumar", type: "risk", day: 14 },
  { id: "e7", title: "Upsell Strategy Session", time: "02:30 PM", with: "Priya Singh", type: "review", day: 16 },
  { id: "e8", title: "Mumbai Leadership Review", time: "09:00 AM", with: "Enterprise Panel", type: "review", day: 21 },
  { id: "e9", title: "ABC Tech Close Call", time: "05:00 PM", with: "Rahul Sharma", type: "call", day: 24 },
];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const { setIsOpen: setCopilotOpen } = useCopilotStore();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const dayEvents = calendarEvents.filter((e) => e.day === selectedDay);
  const allEventDays = new Set(calendarEvents.map((e) => e.day));

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Enterprise Sales Calendar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI-synced calendar with WebRTC softphone integration and automated meeting notes.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Schedule Optimizer
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Full Monthly Calendar Grid */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/5">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-bold text-white text-base">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Blank days before month start */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="aspect-square" />
            ))}

            {/* Actual days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isSelected = day === selectedDay;
              const hasEvent = allEventDays.has(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all relative cursor-pointer",
                    isSelected
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                      : isToday
                      ? "bg-white/10 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {day}
                  {hasEvent && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Today</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Has Events</span>
          </div>
        </div>

        {/* Day Agenda Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Day Header */}
          <div className="glass-panel rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-white text-sm">
                {MONTHS[currentMonth]} {selectedDay}, {currentYear}
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                {dayEvents.length} Scheduled
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {dayEvents.length === 0
                ? "No events scheduled. Great day to prospect!"
                : `${dayEvents.length} enterprise engagement${dayEvents.length > 1 ? "s" : ""} — review before calling.`}
            </p>
          </div>

          {/* Events for Selected Day */}
          <div className="space-y-2">
            {dayEvents.length === 0 ? (
              <div className="glass-panel rounded-2xl p-6 border border-white/5 text-center">
                <CalendarIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No events on this day</p>
                <button className="mt-3 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold cursor-pointer hover:bg-cyan-500/30 transition-colors">
                  Schedule Meeting
                </button>
              </div>
            ) : (
              dayEvents.map((evt) => {
                const Icon = EVENT_ICONS[evt.type];
                return (
                  <div
                    key={evt.id}
                    className={cn(
                      "glass-panel glass-panel-hover rounded-xl p-4 border flex items-center gap-4",
                      EVENT_COLORS[evt.type]
                    )}
                  >
                    <div className={cn("p-2.5 rounded-xl border shrink-0", EVENT_COLORS[evt.type])}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">{evt.title}</div>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px]">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" /> {evt.time}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Users className="w-3 h-3" /> {evt.with}
                        </span>
                      </div>
                    </div>
                    <button className="shrink-0 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer">
                      Join
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* AI Scheduling Insight */}
          <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 bg-cyan-950/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">AI Schedule Intelligence</div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Best call window for Rahul Sharma is <strong className="text-cyan-300">10–11 AM IST</strong>. Response sentiment peaks on Tuesday mornings. Schedule CFO sync before the 15th for Q4 close probability boost.
                </p>
                <button
                  onClick={() => setCopilotOpen(true)}
                  className="mt-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer underline"
                >
                  Ask Copilot to optimize schedule →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming This Week */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Upcoming Enterprise Engagements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "CFO Alignment Call", day: "Thu, Oct 9", time: "3:00 PM", tag: "High Priority" },
            { title: "BFSI Sector Demo", day: "Sat, Oct 11", time: "10:00 AM", tag: "Live Demo" },
            { title: "West Corp Renewal", day: "Tue, Oct 14", time: "11:30 AM", tag: "Churn Risk" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="font-bold text-white text-xs">{item.title}</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <CalendarIcon className="w-3 h-3" /> {item.day}
                <Clock className="w-3 h-3 ml-1" /> {item.time}
              </div>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
