import { NextResponse } from "next/server";
import { mockWorkflows } from "@/data/mockData";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wf = mockWorkflows.find((w) => w.id === id) || mockWorkflows[0];
  return NextResponse.json(wf);
}
