import { apiFetch } from "./apiClient";
import { mockDeals } from "@/data/mockData";
import { Deal, DealStage } from "@/types";

export const dealsService = {
  getAll: async (): Promise<Deal[]> => {
    return apiFetch<Deal[]>("/deals", {}, mockDeals);
  },
  getById: async (id: string): Promise<Deal | undefined> => {
    const fallback = mockDeals.find((d) => d.id === id) || mockDeals[0];
    return apiFetch<Deal>(`/deals/${id}`, {}, fallback);
  },
  updateStage: async (id: string, stage: DealStage): Promise<Deal> => {
    const deal = mockDeals.find((d) => d.id === id) || mockDeals[0];
    const updated = { ...deal, stage };
    return apiFetch<Deal>(
      `/deals/${id}/stage`,
      { method: "PATCH", body: JSON.stringify({ stage }) },
      updated
    );
  },
  create: async (data: Partial<Deal>): Promise<Deal> => {
    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      title: data.title || "New Enterprise Contract",
      company: data.company || "Enterprise Partner",
      customerName: data.customerName || "Executive Sponsor",
      customerId: data.customerId || "cust_rahul",
      amount: data.amount || 5000000,
      stage: data.stage || "DISCOVERY",
      risk: data.risk || "LOW",
      closeDate: data.closeDate || "30 Nov 2026",
      probability: data.probability || 50,
      owner: data.owner || "Rahul Sharma",
      aiInsight: "✨ Deal profile created with baseline scoring telemetry.",
      recommendedAction: "Schedule initial technical alignment meeting.",
      createdAt: "Today",
      ...data,
    };
    return apiFetch<Deal>("/deals", { method: "POST", body: JSON.stringify(data) }, newDeal);
  },
};
