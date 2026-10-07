import { apiFetch } from "./apiClient";
import { mockRadarMetrics } from "@/data/mockData";
import { RadarMetrics } from "@/types";

export const radarService = {
  getMetrics: async (): Promise<RadarMetrics> => {
    return apiFetch<RadarMetrics>("/radar/metrics", {}, mockRadarMetrics);
  },
  dismissItem: async (id: string): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>(
      `/radar/items/${id}/dismiss`,
      { method: "POST" },
      { success: true }
    );
  },
};
