import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const prompt = body.prompt || "High priority follow-ups";
  return NextResponse.json({
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
  });
}
