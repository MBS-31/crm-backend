import { NextResponse } from "next/server";
import { mockAuditLogs } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(mockAuditLogs);
}
