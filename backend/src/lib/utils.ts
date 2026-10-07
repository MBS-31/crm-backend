import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency (Crores, Lakhs, or standard ₹ commas)
 * @param amount - raw rupee amount
 * @param short  - use compact notation (₹12.8 Cr, ₹4.5L)
 */
export function formatINR(amount: number, short = false): string {
  if (short) {
    if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(1)} Cr`;
    if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(1)}L`;
    if (amount >= 1_000)      return `₹${(amount / 1_000).toFixed(0)}k`;
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format number with Indian commas */
export function formatNumberINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/** Format seconds to MM:SS */
export function formatTimeDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/** Relative time from Date or ISO string */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000; // seconds
  if (diff < 60)         return "just now";
  if (diff < 3600)       return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)      return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800)     return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Clamp a number between min and max */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/** Map a value from [inMin,inMax] → [outMin,outMax] */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/** Color for a health score 0-100 */
export function healthScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-cyan-400";
  if (score >= 40) return "text-amber-400";
  return "text-rose-400";
}

/** Color for churn risk label */
export function churnRiskColor(risk: "Low" | "Medium" | "High" | "Critical"): string {
  const map: Record<string, string> = {
    Low: "text-emerald-400",
    Medium: "text-amber-400",
    High: "text-rose-400",
    Critical: "text-red-400",
  };
  return map[risk] || "text-slate-400";
}

/** Truncate long strings */
export function truncate(str: string, maxLen = 60): string {
  return str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
}

/** Get initials from a name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Format a percentage with + sign for positive delta */
export function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}%`;
}

/** Generate a consistent avatar gradient color from a string */
export function stringToGradient(str: string): string {
  const gradients = [
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-red-600",
    "from-blue-500 to-indigo-600",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}
