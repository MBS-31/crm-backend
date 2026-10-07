import { NextResponse } from "next/server";
import { mockDeals } from "@/data/mockData";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = mockDeals.find((d) => d.id === id) || mockDeals[0];
  return NextResponse.json(deal);
}
