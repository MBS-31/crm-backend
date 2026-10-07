import { apiFetch } from "./apiClient";
import {
  mockInfraServices,
  mockStorageMetrics,
  mockAuditLogs,
  mockRolePermissions,
  mockNotifications,
} from "@/data/mockData";
import {
  InfraService,
  StorageMetrics,
  AuditLogItem,
  RolePermissionMatrix,
  CRMNotification,
} from "@/types";

export const infrastructureService = {
  getHealth: async (): Promise<InfraService[]> => {
    return apiFetch<InfraService[]>("/infra/health", {}, mockInfraServices);
  },
  getStorageMetrics: async (): Promise<StorageMetrics> => {
    return apiFetch<StorageMetrics>("/storage/metrics", {}, mockStorageMetrics);
  },
  getAuditLogs: async (query?: string): Promise<AuditLogItem[]> => {
    const logs = query
      ? mockAuditLogs.filter(
          (l) =>
            l.user.toLowerCase().includes(query.toLowerCase()) ||
            l.action.toLowerCase().includes(query.toLowerCase()) ||
            l.entity.toLowerCase().includes(query.toLowerCase())
        )
      : mockAuditLogs;
    return apiFetch<AuditLogItem[]>("/admin/audit-logs", {}, logs);
  },
  getRolesPermissions: async (): Promise<RolePermissionMatrix[]> => {
    return apiFetch<RolePermissionMatrix[]>("/admin/roles", {}, mockRolePermissions);
  },
  saveRolePermissions: async (
    matrix: RolePermissionMatrix[]
  ): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>(
      "/admin/roles",
      { method: "PUT", body: JSON.stringify(matrix) },
      { success: true }
    );
  },
  getNotifications: async (): Promise<CRMNotification[]> => {
    return apiFetch<CRMNotification[]>("/notifications", {}, mockNotifications);
  },
  markNotificationRead: async (id: string): Promise<boolean> => {
    return apiFetch<{ success: boolean }>(
      `/notifications/${id}/read`,
      { method: "POST" },
      { success: true }
    ).then((res) => res.success);
  },
};
