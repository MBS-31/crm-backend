import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({
    id: body.executionId || `agent_${Date.now()}`,
    prompt: "Executed plan",
    status: "completed",
    planSteps: [],
    auditLogs: [
      { timestamp: "Just now", message: "All 5 autonomous tasks executed successfully.", type: "success" },
    ],
  });
}
