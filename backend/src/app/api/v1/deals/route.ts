import { NextResponse } from "next/server";
import { mockDeals } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockDeals);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const newDeal = {
    id: `deal_${Date.now()}`,
    title: body.title || "New Enterprise Contract",
    company: body.company || "Enterprise Partner",
    customerName: body.customerName || "Executive Sponsor",
    customerId: body.customerId || "cust_rahul",
    amount: body.amount || 5000000,
    stage: body.stage || "DISCOVERY",
    risk: body.risk || "LOW",
    closeDate: body.closeDate || "30 Nov 2026",
    probability: body.probability || 50,
    owner: body.owner || "Rahul Sharma",
    aiInsight: "✨ Deal profile created with baseline scoring telemetry.",
    recommendedAction: "Schedule initial technical alignment meeting.",
    createdAt: "Today",
    ...body,
  };
  return NextResponse.json(newDeal, { status: 201 });
}
