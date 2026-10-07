import { NextResponse } from "next/server";
import { mockCustomers } from "@/data/mockData";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cust = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  return NextResponse.json(cust);
}
