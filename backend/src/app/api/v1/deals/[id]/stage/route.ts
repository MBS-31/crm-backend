import { NextResponse } from "next/server";
import { mockDeals } from "@/data/mockData";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const deal = mockDeals.find((d) => d.id === id) || mockDeals[0];
  const updated = { ...deal, stage: body.stage || deal.stage };
  return NextResponse.json(updated);
}
