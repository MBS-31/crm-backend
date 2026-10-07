"use client";

import React, { useState } from "react";
import { CheckSquare, Square, Plus, Calendar, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  customer: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "t1",
      title: "Send revised proposal with 12% 2-year discount",
      customer: "Rahul Sharma (ABC Technologies)",
      due: "Today, 4:00 PM",
      priority: "High",
      completed: false,
    },
    {
      id: "t2",
      title: "Schedule CFO alignment call for Thursday 3 PM",
      customer: "Rahul Sharma (ABC Technologies)",
      due: "Tomorrow, 10:00 AM",
      priority: "High",
      completed: false,
    },
    {
      id: "t3",
      title: "Executive alignment check-in regarding slow adoption",
      customer: "Rohit Kumar (West Corp)",
      due: "24 Oct 2026",
      priority: "High",
      completed: false,
    },
    {
      id: "t4",
      title: "Follow up Friday with legal NDA addendum",
      customer: "Priya Singh (Global Enterprise)",
      due: "Friday, 11:00 AM",
      priority: "Medium",
      completed: true,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Actionable Follow-up Tasks
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Prioritized SLA deadlines extracted autonomously from sales calls & CRM triggers.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              "p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all text-xs",
              task.completed
                ? "bg-white/[0.02] border-white/5 text-slate-500 line-through"
                : "bg-[#11192e] border-white/10 hover:border-cyan-500/30 text-white"
            )}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <div>
                <div className="font-bold text-sm">{task.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{task.customer}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {task.due}
              </span>
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                  task.priority === "High"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                )}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
