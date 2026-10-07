import { NextResponse } from "next/server";
import { mockLeads } from "@/data/mockData";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = mockLeads.find((l) => l.id === id) || mockLeads[0];
  return NextResponse.json(lead);
}
