import { NextResponse } from "next/server";
import { mockCustomers } from "@/data/mockData";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const cust = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  const updated = { ...cust, healthScore: body.healthScore ?? 85 };
  return NextResponse.json(updated);
}
