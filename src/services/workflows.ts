import { apiFetch } from "./apiClient";
import { mockWorkflows } from "@/data/mockData";
import { Workflow } from "@/types";

export interface WorkflowSimulationResult {
  workflowId: string;
  customerName: string;
  steps: {
    nodeId: string;
    nodeTitle: string;
    status: "success" | "skipped" | "failed";
    output: string;
  }[];
}

export const workflowsService = {
  getAll: async (): Promise<Workflow[]> => {
    return apiFetch<Workflow[]>("/workflows", {}, mockWorkflows);
  },
  getById: async (id: string): Promise<Workflow | undefined> => {
    return apiFetch<Workflow>(`/workflows/${id}`, {}, mockWorkflows[0]);
  },
  simulate: async (workflowId: string, customerId: string): Promise<WorkflowSimulationResult> => {
    const fallback: WorkflowSimulationResult = {
      workflowId,
      customerName: "Rahul Sharma (ABC Technologies)",
      steps: [
        { nodeId: "node_1", nodeTitle: "New Lead Inbound", status: "success", output: "Lead event payload ingested" },
        { nodeId: "node_2", nodeTitle: "Score Check > 80", status: "success", output: "Score 92 evaluated (> 80 Passed)" },
        { nodeId: "node_3", nodeTitle: "AI Intent & Dossier Analysis", status: "success", output: "High intent flagged, dossier built" },
        { nodeId: "node_4", nodeTitle: "Assign Senior Sales Rep", status: "success", output: "Assigned to Priya Singh" },
        { nodeId: "node_5", nodeTitle: "Send WhatsApp Greeting", status: "success", output: "Template dispatched via WhatsApp Cloud API" },
        { nodeId: "node_6", nodeTitle: "Create Follow-up Task", status: "success", output: "Task created for rep (Due in 24h)" },
      ],
    };
    return apiFetch<WorkflowSimulationResult>(
      `/workflows/${workflowId}/simulate`,
      { method: "POST", body: JSON.stringify({ customerId }) },
      fallback
    );
  },
};
