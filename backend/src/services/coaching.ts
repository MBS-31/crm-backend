import { apiFetch } from "./apiClient";
import { mockSalesCoaching } from "@/data/mockData";
import { SalesRepCoaching } from "@/types";

export const coachingService = {
  getAllReps: async (): Promise<SalesRepCoaching[]> => {
    return apiFetch<SalesRepCoaching[]>("/coaching/reps", {}, mockSalesCoaching);
  },
  getRepById: async (id: string): Promise<SalesRepCoaching | undefined> => {
    const rep = mockSalesCoaching.find((r) => r.id === id) || mockSalesCoaching[0];
    return apiFetch<SalesRepCoaching>(`/coaching/reps/${id}`, {}, rep);
  },
};
