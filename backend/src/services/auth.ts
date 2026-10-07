import { apiFetch } from "./apiClient";
import { currentUser, organizations } from "@/data/mockData";
import { User, Organization } from "@/types";

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    return apiFetch<User>("/auth/me", {}, currentUser);
  },
  getOrganizations: async (): Promise<Organization[]> => {
    return apiFetch<Organization[]>("/auth/organizations", {}, organizations);
  },
  switchOrganization: async (orgId: string): Promise<{ success: boolean; orgId: string }> => {
    return apiFetch<{ success: boolean; orgId: string }>(
      "/auth/switch-org",
      { method: "POST", body: JSON.stringify({ orgId }) },
      { success: true, orgId }
    );
  },
};
