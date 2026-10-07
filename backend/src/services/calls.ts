import { apiFetch } from "./apiClient";
import { mockCallRecording } from "@/data/mockData";
import { CallRecording } from "@/types";

export const callsService = {
  getLatestRecording: async (): Promise<CallRecording> => {
    return apiFetch<CallRecording>("/calls/latest", {}, mockCallRecording);
  },
  getRecordingById: async (id: string): Promise<CallRecording> => {
    return apiFetch<CallRecording>(`/calls/${id}`, {}, mockCallRecording);
  },
  toggleActionItem: async (callId: string, actionId: string, completed: boolean): Promise<boolean> => {
    return apiFetch<{ success: boolean }>(
      `/calls/${callId}/actions/${actionId}`,
      { method: "PATCH", body: JSON.stringify({ completed }) },
      { success: true }
    ).then((res) => res.success);
  },
};
