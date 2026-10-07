import { NextResponse } from "next/server";
import { mockLeads } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockLeads);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const newLead = {
    id: `lead_${Date.now()}`,
    name: body.name || "Inbound Lead",
    company: body.company || "Enterprise Corp",
    email: body.email || "lead@company.in",
    phone: body.phone || "+91 98000 11223",
    title: body.title || "Director of Technology",
    status: "NEW",
    score: body.score || 85,
    tier: (body.score || 85) >= 80 ? "HOT" : (body.score || 85) >= 60 ? "WARM" : "COLD",
    fitWeight: 80,
    engagementWeight: 85,
    intentWeight: 90,
    uncontactedDays: 0,
    value: body.value || 5000000,
    assignedTo: "Rahul Sharma",
    lastActivity: "Submitted enterprise inquiry",
    notes: body.notes || "",
    ...body,
  };
  return NextResponse.json(newLead, { status: 201 });
}
