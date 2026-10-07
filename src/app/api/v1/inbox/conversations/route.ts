import { NextResponse } from "next/server";
import { mockConversations } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockConversations);
}
