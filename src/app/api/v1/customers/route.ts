import { NextResponse } from "next/server";
import { mockCustomers } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockCustomers);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const newCust = {
    id: `cust_${Date.now()}`,
    name: body.name || "New Customer",
    company: body.company || "Company Ltd",
    email: body.email || "contact@domain.com",
    phone: body.phone || "+91 99999 88888",
    arr: body.arr || 3000000,
    healthScore: 85,
    sentiment: "Positive",
    churnRisk: "Low",
    healthCategory: "Healthy",
    nextBestAction: "Schedule initial onboarding sync",
    stage: "Onboarding",
    assignedRep: "Rahul Sharma",
    joinedDate: "Today",
    lastContact: "Just now",
    tags: ["New"],
    relationships: {
      deals: 1,
      emails: 2,
      whatsapp: 5,
      calls: 1,
      tasks: 2,
      documents: 1,
    },
    ...body,
  };
  return NextResponse.json(newCust, { status: 201 });
}
