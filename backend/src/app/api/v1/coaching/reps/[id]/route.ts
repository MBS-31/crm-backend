import { NextResponse } from "next/server";
import { mockSalesCoaching } from "@/data/mockData";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rep = mockSalesCoaching.find((r) => r.id === id) || mockSalesCoaching[0];
  return NextResponse.json(rep);
}
