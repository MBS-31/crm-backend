import { apiFetch } from "./apiClient";
import { mockLeads } from "@/data/mockData";
import { Lead } from "@/types";

export const leadsService = {
  getAll: async (): Promise<Lead[]> => {
    return apiFetch<Lead[]>("/leads", {}, mockLeads);
  },
  getById: async (id: string): Promise<Lead | undefined> => {
    const fallback = mockLeads.find((l) => l.id === id) || mockLeads[0];
    return apiFetch<Lead>(`/leads/${id}`, {}, fallback);
  },
  create: async (data: Partial<Lead>): Promise<Lead> => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: data.name || "Inbound Lead",
      company: data.company || "Enterprise Corp",
      email: data.email || "lead@company.in",
      phone: data.phone || "+91 98000 11223",
      title: data.title || "Director of Technology",
      status: "NEW",
      score: data.score || 85,
      tier: (data.score || 85) >= 80 ? "HOT" : (data.score || 85) >= 60 ? "WARM" : "COLD",
      fitWeight: 80,
      engagementWeight: 85,
      intentWeight: 90,
      uncontactedDays: 0,
      value: data.value || 5000000,
      assignedTo: "Rahul Sharma",
      lastActivity: "Submitted enterprise inquiry",
      notes: data.notes || "",
      ...data,
    };
    return apiFetch<Lead>("/leads", { method: "POST", body: JSON.stringify(data) }, newLead);
  },
};
