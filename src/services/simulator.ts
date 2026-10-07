import { apiFetch } from "./apiClient";
import { SimulatorInput, SimulatorProjection } from "@/types";

export const simulatorService = {
  calculate: async (input: SimulatorInput): Promise<SimulatorProjection> => {
    const { leadVolume, conversionRate, avgDealSize } = input;
    const expectedWins = Math.round(leadVolume * (conversionRate / 100));
    const projectedRevenue = expectedWins * avgDealSize;
    const previousRevenue = 48000000; // ₹4.8 Cr baseline
    const deltaPercent = Math.round(((projectedRevenue - previousRevenue) / previousRevenue) * 100);

    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
    const monthlyProjections = months.map((m, idx) => {
      const growthFactor = 1 + idx * 0.08;
      return {
        month: m,
        projected: Math.round((projectedRevenue / 6) * growthFactor),
        target: Math.round((previousRevenue / 6) * (1 + idx * 0.05)),
      };
    });

    const result: SimulatorProjection = {
      projectedRevenue,
      expectedWins,
      conversionPercent: conversionRate,
      previousRevenue,
      deltaPercent,
      monthlyProjections,
    };

    return apiFetch<SimulatorProjection>(
      "/simulator/calculate",
      { method: "POST", body: JSON.stringify(input) },
      result
    );
  },
};
