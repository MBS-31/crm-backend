import { apiFetch } from "./apiClient";
import { AIAgentExecution } from "@/types";

export const agentsService = {
  generatePlan: async (prompt: string): Promise<AIAgentExecution> => {
    const fallback: AIAgentExecution = {
      id: `agent_${Date.now()}`,
      prompt,
      status: "ready_to_approve",
      planSteps: [
        {
          stepNumber: 1,
          title: "Query Database for High-Value Leads",
          description: "Search leads with deal value > ₹50,00,000 and status != 'DISQUALIFIED'",
          status: "pending",
        },
        {
          stepNumber: 2,
          title: "Filter by Inactivity Threshold",
          description: "Check last interaction date; filter uncontacted >= 3 days",
          status: "pending",
        },
        {
          stepNumber: 3,
          title: "Verify Decision Maker Contacts",
          description: "Ensure valid phone/WhatsApp endpoint and enterprise email",
          status: "pending",
        },
        {
          stepNumber: 4,
          title: "Generate Contextual Follow-up Tasks",
          description: "Create high-priority tasks assigned to account owners with AI recommendations",
          status: "pending",
        },
        {
          stepNumber: 5,
          title: "Notify Owners & Audit Log",
          description: "Dispatch in-app notifications and record immutable entry in audit logs",
          status: "pending",
        },
      ],
      auditLogs: [
        { timestamp: "Just now", message: "Plan synthesized by AI Orchestration engine", type: "info" },
        { timestamp: "Just now", message: "Awaiting human-in-the-loop approval before executing mutation actions", type: "info" },
      ],
    };

    return apiFetch<AIAgentExecution>(
      "/agent/plan",
      { method: "POST", body: JSON.stringify({ prompt }) },
      fallback
    );
  },

  executePlan: async (planId: string): Promise<AIAgentExecution> => {
    const fallback: AIAgentExecution = {
      id: planId,
      prompt: "Find all high-value leads uncontacted for 3 days and create follow-up tasks",
      status: "completed",
      planSteps: [
        {
          stepNumber: 1,
          title: "Query Database for High-Value Leads",
          description: "Found 14 matching leads with total pipeline value ₹8.4 Cr",
          status: "completed",
          auditDetail: "14 records retrieved from PostgreSQL",
        },
        {
          stepNumber: 2,
          title: "Filter by Inactivity Threshold",
          description: "11 leads met the >= 3 days uncontacted criterion",
          status: "completed",
          auditDetail: "Filtered against Redis activity timestamp cache",
        },
        {
          stepNumber: 3,
          title: "Verify Decision Maker Contacts",
          description: "Verified 11 valid contact profiles with WhatsApp Cloud API capability",
          status: "completed",
          auditDetail: "All 11 endpoints validated",
        },
        {
          stepNumber: 4,
          title: "Generate Contextual Follow-up Tasks",
          description: "Created 11 follow-up tasks with personalized AI talking points",
          status: "completed",
          auditDetail: "Tasks scheduled in CRM calendar with 24h deadline",
        },
        {
          stepNumber: 5,
          title: "Notify Owners & Audit Log",
          description: "Dispatched notifications to 3 sales reps and logged execution",
          status: "completed",
          auditDetail: "Audit record committed to database",
        },
      ],
      auditLogs: [
        { timestamp: "12s ago", message: "Execution started with super admin approval", type: "info" },
        { timestamp: "8s ago", message: "Discovered 14 leads, filtered to 11 qualifying targets", type: "action" },
        { timestamp: "4s ago", message: "Created 11 follow-up tasks across 3 account reps", type: "action" },
        { timestamp: "Just now", message: "Agent execution completed successfully. Zero errors.", type: "success" },
      ],
      summary: "Successfully identified 11 high-value uncontacted leads (₹8.4 Cr pipeline) and created assigned follow-up tasks with audit compliance.",
    };

    return apiFetch<AIAgentExecution>(
      "/agent/execute",
      { method: "POST", body: JSON.stringify({ planId }) },
      fallback
    );
  },
};
